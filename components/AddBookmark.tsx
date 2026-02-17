'use client'

import { addBookmark } from '@/app/actions'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
        >
            {pending ? 'Adding...' : 'Add Bookmark'}
        </button>
    )
}

export default function AddBookmark() {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New Bookmark</h3>
            <form
                action={async (formData) => {
                    await addBookmark(formData)
                    formRef.current?.reset()
                }}
                ref={formRef}
                className="space-y-4"
            >
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border text-gray-900"
                        placeholder="My Bookmark"
                    />
                </div>
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border text-gray-900"
                        placeholder="https://example.com"
                    />
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}
