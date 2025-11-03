export function Dashboard() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    return (
        <main className="min-h-screen bg-green-500">
            <div className="container mx-auto p-8">
                <h1 className="text-5xl text-white text-center pt-20">Dashboard</h1>
                {userName && (
                    <p className="text-white text-center mt-4 text-xl">
                        Bem-vindo(a), {userName}!
                    </p>
                )}
                {userId && (
                    <p className="text-white text-center mt-2">
                        ID do usuário: {userId}
                    </p>
                )}
            </div>
        </main>
    );
}
