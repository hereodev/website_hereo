

export default function Page() {
    return (
      <main>
        <h1>Protected</h1>
        <a className="link-hover badge mr-4" href="/api/auth/signout">sign out</a>
        <a className="link-hover badge" href="/">public route</a>
      </main>
    );
  }