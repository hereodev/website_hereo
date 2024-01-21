
export default async function Page({ params: { lang } } : { params: { lang: string } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Admin Page</h1>
            <p>Lang: {lang}</p>
        </main>
    )
}