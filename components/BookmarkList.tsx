'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { deleteBookmark } from '@/app/actions'

type Bookmark = {
    id: string
    title: string
    url: string
    user_id: string
    created_at: string
}

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [...prev, payload.new as Bookmark])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
                    } else if (payload.eventType === 'UPDATE') {
                        setBookmarks((prev) =>
                            prev.map((bookmark) =>
                                bookmark.id === payload.new.id ? (payload.new as Bookmark) : bookmark
                            )
                        )
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    const handleDelete = async (id: string) => {
        // Optimistic update could happen here, but we rely on Realtime or revalidation
        // For instant feel, let's wait for Realtime or revalidation.
        // But actually, revalidatePath in server action might not trigger a client refresh of this state if we don't reload the page.
        // However, we have the Realtime subscription! So when the server action deletes it, the DB change triggers Realtime, which updates the state.
        await deleteBookmark(id)
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Bookmarks</h3>
            {bookmarks.length === 0 ? (
                <p className="text-gray-500">No bookmarks yet.</p>
            ) : (
                <ul className="space-y-3">
                    {bookmarks.map((bookmark) => (
                        <li
                            key={bookmark.id}
                            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                        >
                            <div className="flex flex-col overflow-hidden">
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-indigo-600 hover:underline font-medium"
                                >
                                    {bookmark.title}
                                </a>
                                <span className="truncate text-xs text-gray-500">{bookmark.url}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(bookmark.id)}
                                className="ml-4 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
