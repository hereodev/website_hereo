import { NextRequest, NextResponse } from "next/server";

const cdnUrl = process.env.NEXT_PUBLIC_BUNNY_CDN_URL || '';
const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL || '';
const storageZone = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || '';
const apiKey = process.env.BUNNY_STORAGE_API_KEY || '';

type ExistResponseBody = {
    status: number,
    url: string,
    message: string,
    exists: boolean,
    fileSize?: string
}

async function folderExists(path: string) {
    const url = `${storageUrl}/hereotherwise/${path}/`.replace(/(?<!:)\/\//g, '/');
    console.log("checking if folder exists in Storage Zone...", path)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'AccessKey': apiKey,
            accept: 'application/json',
        }
    });
    if (response.ok) {
        return NextResponse.json({status: 200, url: url, message: `Folder ${path} exists` , exists: true});
    } else {
        return NextResponse.json({status: 404, url: url, message: `Folder ${path} not found` , exists: false});
    }
}

async function fileExists(path: string) {
    const url = `${cdnUrl}/${path}`.replace(/(?<!:)\/\//g, '/');
    console.log("checking if file exists on CDN...", path)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'AccessKey': apiKey,
            accept: 'application/json',
        }
    });
    if (response.ok) {
        console.log("file does exist")
        // Retrieve file size
        const getFileHeaders = await fetch(`https://hereotherwise.b-cdn.net/${path}`, { method: "HEAD" });
        const fileSize = getFileHeaders.headers.get("content-length");
        return NextResponse.json({status: 200, message: `File ${path} exists`, url:`https://hereotherwise.b-cdn.net/${path}`, exists: true, fileSize: fileSize});
    } else {
        return NextResponse.json({status: 404, url: url, message: `File ${path} not found` , exists: false});
    }
}


export async function PUT(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    // const path: string | null = data.get("path") as unknown as string;
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || "unknown"

    if (!file) {
        return NextResponse.json({ success: false, error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // from the docs:     path: `/${STORAGE_ZONE_NAME}/${FILENAME_TO_UPLOAD}`,
    const url = `${storageUrl}/${storageZone}/${userId}/${file.name}`.replace(/(?<!:)\/\//g, '/');
    // const url = `https://storage.bunnycdn.com/hereotherwise/${path}`.replace(/(?<!:)\/\//g, '/');
    if (apiKey === '') {
        return NextResponse.json({ message: 'API Key is required' }, { status: 400 })
    }

    const response = await fetch(url, {
        method: "PUT",
        body: buffer,
        headers: {
            "AccessKey": apiKey,
            "Content-Type": "application/octet-stream",
            // "Content-Length": file.size.toString(), // Not necessary, but does not hinder upload
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then(err => { throw err })
        }
    })
    .then(res =>{ console.log("upload ?", res); return NextResponse.json({ success: true, status: res.HttpCode, message: res.Message, url: `https://hereotherwise.b-cdn.net/${userId}/${file.name}`})})
    .catch(err => {console.error(err) ; return NextResponse.json({ success: false, error: err }, { status: 500 })})

    return response;

    // return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || "undefined"
    // const filename = searchParams.get('filename') || ""
    // if(filename === "") { return NextResponse.json({ success: false, error: "No filename" }, { status: 400 }); }
    const path = searchParams.get('path') || ''
    if(path === "") { return NextResponse.json({ success: false, error: "No path" }, { status: 400 }); }

    const url = `${storageUrl}/${storageZone}/${path}`.replace(/(?<!:)\/\//g, '/');
    // const url = `${storageUrl}/${storageZone}/${userId}/${filename}`.replace(/(?<!:)\/\//g, '/');

    const options = {
        method: 'DELETE',
        headers: {
            'AccessKey': apiKey
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(data.HttpCode === 404) {
            // If the file is not found, try to delete it from the undefined folder
            const urlUndefined = url.replace(userId, "undefined");
            // console.log("404 on first URL =====>  deleting...", urlUndefined)
            const response = await fetch(urlUndefined, options);
            const data = await response.json();
            console.log(data);
            if(data.HttpCode === 404) {
                return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
            }
            else {
                return NextResponse.json({ success: true, status: data.HttpCode, message: data.Message});
            }
        } else {
            console.log(data);
            return NextResponse.json({ success: true, status: data.HttpCode, message: data.Message});
         }            
    } catch (error) {
        console.error('error:', error);
        return NextResponse.json({ success: false, error: "Error deleting file" }, { status: 500 });
    }

}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '';
    if(path === "") { return NextResponse.json({ success: false, error: "No path" }, { status: 400 }); }
    if(!path.includes(".")) {
        return folderExists(path);
    } else {
        return fileExists(path);
    }
}