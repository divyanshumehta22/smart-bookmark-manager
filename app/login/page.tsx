import { signInWithGoogle } from './actions'

export default function LoginPage() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Use your Google account to access your bookmarks
                    </p>
                </div>
                <form action={signInWithGoogle} className="mt-8 space-y-6">
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {/* Google Icon */}
                            <svg
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.539-6.033-5.696  c0-3.159,2.702-5.696,6.033-5.696c1.482,0,2.846,0.553,3.92,1.526l2.842-2.844c-1.976-1.705-4.499-2.614-6.762-2.614  C6.602,2.707,1.526,7.579,1.526,13.639c0,5.85,4.862,10.617,10.957,10.617c6.196,0,10.697-4.322,10.697-10.457  c0-0.741-0.081-1.393-0.21-2.031H12.545z" />
                            </svg>
                        </span>
                        <span className="ml-2">Sign in with Google</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
