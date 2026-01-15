import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Oops! 💔</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-red-400 font-mono bg-white/10 p-4 rounded-lg">
                {error.statusText || error.message}
            </p>
        </div>
    );
}
