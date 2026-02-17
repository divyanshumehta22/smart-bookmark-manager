'use client'

import { signOut } from '@/app/actions'

export default function AuthButton() {
    return (
        <form action={signOut}>
            <button
                type="submit"
                className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Sign Out
            </button>
        </form>
    )
}
