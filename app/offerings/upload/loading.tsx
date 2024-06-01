
// export default async function UploadArt() {

//     return (
//         <main>
//             <p>Loading the form...</p>
//         </main>
//     )
// }

// SkeletonUploadForm.tsx

const SkeletonUploadForm = () => {
    return (
        <main>
            <div className="animate-pulse">
                <h1 className=" rounded w-32 h-8 mb-4"></h1>
                <form className="flex flex-col gap-4">
                    <div className="form-control w-full">
                        <div className="label pb-1">
                            <span className=" rounded w-24 h-6"></span>
                            <span className="rounded w-16 h-4 ml-2"></span>
                        </div>
                        <div className="input input-bordered w-full h-10 rounded"></div>
                    </div>
                    <div className="form-control w-full">
                        <div className="label pb-1">
                            <span className=" rounded w-24 h-6"></span>
                        </div>
                        <div className="input input-bordered w-full h-10 rounded"></div>
                    </div>
                    <div className="rounded h-24 mb-4"></div>
                    <div className="rounded h-32 mb-4"></div>
                    <div className="form-control w-full">
                        <div className="label pb-1">
                            <span className=" rounded w-32 h-6"></span>
                        </div>
                        <div className="input input-bordered w-full h-10 rounded"></div>
                    </div>
                    <div className="form-control w-full">
                        <div className="label pb-1">
                            <span className=" rounded w-32 h-6"></span>
                        </div>
                        <div className="input input-bordered w-full h-10 rounded"></div>
                    </div>
                    <div className="rounded h-24 mb-4"></div>
                    <div className="form-control w-full">
                        <div className="label pb-1">
                            <span className=" rounded w-32 h-6"></span>
                        </div>
                        <div className="input input-bordered w-full h-10 rounded"></div>
                    </div>
                    <button className="btn btn-primary mt-4 w-full  h-12 rounded" disabled>
                        <span className="loading loading-dots loading-sm"></span>
                    </button>
                </form>
            </div>
        </main>
    );
}

export default SkeletonUploadForm;
