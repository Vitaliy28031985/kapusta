const NotFoundPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fb] text-center">
            <div className="max-w-md rounded-2xl bg-white shadow-md p-10 flex flex-col items-center">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    Oops! The page you’re looking for doesn’t exist or was moved.
                </p>
                <a
                    href="/"
                    className="rounded-full bg-bt_col text-white px-8 py-3 font-semibold shadow hover:bg-orange-600 transition-colors duration-200"
                >
                    Go Home
                </a>
            </div>

            
        </main>
  
    );
}
export default NotFoundPage;