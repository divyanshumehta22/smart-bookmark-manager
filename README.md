Smart Bookmark Manager - A simple full-stack bookmark manager built with Next.js (App Router) and Supabase that allows users to securely save and manage personal bookmarks using Google Authentication.

Core Features

1. Google Authentication (OAuth Only)

. Users can sign up and log in using Google OAuth
. No email/password authentication
. Secure authentication powered by Supabase Auth

2. Add Bookmarks

. Logged-in users can add:
    a. Bookmark Title
    b. Bookmark URL
. Data is stored in Supabase PostgreSQL database


3. Private Bookmarks (Row-Level Security)(RLS)

. Each user's bookmarks are completely private
. User A cannot view User B's bookmarks
. Implemented using Supabase Row Level Security (RLS) policies
. With the help of Row - Level Security, it is a database security feature that controls which records a user is allowed to access in a table.

4. Real-Time Updates

. Bookmark list updates instantly without refreshing the page
. If two tabs are open:
    a. Adding a bookmark in one tab updates the other immediately
. Powered by Supabase Realtime subscriptions
. Supabase Realtime Subscriptions allow your application to get connected to database. If the user adds data, the database got updated. 

5. Delete Bookmarks

. Users can delete only their own bookmarks
. Securely enforced via RLS policies
. With the one click, the delete button deletes the particular bookmark.




Tech Stack

. Next.js (App Router)
. Supabase
    a. Authentication (Google OAuth)
    b. PostgreSQL Database
    c. Realtime Updates
. Tailwind CSS
. TypeScript and JavaScript




Database Structure

Table: bookmarks

| Column      | Type        | Description |
|------------|------------|------------|
| id         | uuid       | Primary key |
| user_id    | uuid       | References authenticated user |
| title      | text       | Bookmark title |
| url        | text       | Bookmark URL |
| created_at | timestamp  | Auto-generated |



Security Implementation

Row Level Security (RLS)

Enabled RLS on bookmarks table with policies:

. Users can insert only their own bookmarks
. Users can view only their own bookmarks
. Users can delete only their own bookmarks

Example Policy Logic:

sql
auth.uid() = user_id
