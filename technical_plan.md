# Technical Implementation Plan: New Blog Features

This document outlines the technical plan for implementing new features for the Next.js blog, including page views, user actions (likes and bookmarks), post statistics, and a comment system.

## 1. Data Model / Database Schema

We will use **PostgreSQL** with **Prisma** as the ORM. This provides a robust, type-safe database layer that integrates well with Next.js.

### Prisma Schema (`schema.prisma`)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  slug         String    @id @unique
  views        Int       @default(0)
  likes        Like[]
  bookmarks    Bookmark[]
  comments     Comment[]
}

model User {
  id        String     @id @default(uuid())
  name      String?
  email     String?    @unique
  image     String?
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  likes     Like[]
  bookmarks Bookmark[]
  comments  Comment[]
}

model Like {
  id        String   @id @default(uuid())
  postSlug  String
  userId    String
  createdAt DateTime @default(now())

  post Post @relation(fields: [postSlug], references: [slug], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([postSlug, userId])
}

model Bookmark {
  id        String   @id @default(uuid())
  postSlug  String
  userId    String
  createdAt DateTime @default(now())

  post Post @relation(fields: [postSlug], references: [slug], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([postSlug, userId])
}

model Comment {
  id        String   @id @default(uuid())
  content   String
  postSlug  String
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  post Post @relation(fields: [postSlug], references: [slug], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Data Models Explained:

- **`Post`**: This model will store metrics related to each blog post. The `slug` will be the unique identifier, corresponding to the MDX file name.
- **`User`**: A standard user model to handle authentication and user-specific actions. We will use NextAuth.js for authentication.
- **`Like`**: A join table to record a "like" action by a user on a specific post.
- **`Bookmark`**: A join table to record a "bookmark" action by a user on a specific post.
- **`Comment`**: Stores comments made by users on posts.

## 2. API Endpoints

The following API endpoints will be created under `src/app/api/`.

### Page Views

- **`GET /api/posts/[slug]/views`**
  - **Description:** Retrieves the current view count for a post.
  - **Response (200 OK):**
    ```json
    {
      "slug": "post-slug",
      "views": 1234
    }
    ```

- **`POST /api/posts/[slug]/views`**
  - **Description:** Increments the view count for a post. This should be called once per page load on the client-side.
  - **Response (200 OK):**
    ```json
    {
      "slug": "post-slug",
      "views": 1235
    }
    ```

### User Actions (Likes & Bookmarks)

- **`POST /api/posts/[slug]/like`**
  - **Description:** Allows a logged-in user to "like" a post.
  - **Authentication:** Required.
  - **Response (200 OK):**
    ```json
    {
      "message": "Post liked successfully."
    }
    ```

- **`DELETE /api/posts/[slug]/like`**
  - **Description:** Allows a logged-in user to remove their "like" from a post.
  - **Authentication:** Required.
  - **Response (200 OK):**
    ```json
    {
      "message": "Post unliked successfully."
    }
    ```

- **`POST /api/posts/[slug]/bookmark`**
  - **Description:** Allows a logged-in user to "bookmark" a post.
  - **Authentication:** Required.
  - **Response (200 OK):**
    ```json
    {
      "message": "Post bookmarked successfully."
    }
    ```

- **`DELETE /api/posts/[slug]/bookmark`**
  - **Description:** Allows a logged-in user to remove their "bookmark".
  - **Authentication:** Required.
  - **Response (200 OK):**
    ```json
    {
      "message": "Post unbookmarked successfully."
    }
    ```

### Post Statistics

- **`GET /api/posts/[slug]/stats`**
  - **Description:** Retrieves all statistics for a post (views, likes, bookmarks) and the current user's interaction status (liked, bookmarked).
  - **Authentication:** Optional. If a user is logged in, their status will be included.
  - **Response (200 OK):**
    ```json
    {
      "slug": "post-slug",
      "views": 1235,
      "likes": 42,
      "bookmarks": 18,
      "user": {
        "liked": true,
        "bookmarked": false
      }
    }
    ```

### Comments

- **`GET /api/posts/[slug]/comments`**
  - **Description:** Retrieves all comments for a post.
  - **Response (200 OK):**
    ```json
    {
      "comments": [
        {
          "id": "comment-id",
          "content": "This is a great post!",
          "createdAt": "2023-10-27T10:00:00Z",
          "user": {
            "name": "Jane Doe",
            "image": "https://example.com/avatar.png"
          }
        }
      ]
    }
    ```

- **`POST /api/posts/[slug]/comments`**
  - **Description:** Allows a logged-in user to add a comment to a post.
  - **Authentication:** Required.
  - **Request Body:**
    ```json
    {
      "content": "This is my new comment."
    }
    ```
  - **Response (201 Created):**
    ```json
    {
      "comment": {
        "id": "new-comment-id",
        "content": "This is my new comment.",
        "createdAt": "2023-10-27T11:00:00Z",
        "user": {
          "name": "John Doe",
          "image": "https://example.com/avatar2.png"
        }
      }
    }
    ```

## 3. Frontend Implementation

### Key Components to Modify:

- **`src/app/tutorials/[slug]/page.tsx`**: This is the main page for a blog post. It will be responsible for fetching the initial post statistics and comments.
- **`src/components/blog/BlogPostSidebar.tsx`**: This component will be updated to display the post statistics (views, likes, bookmarks).
- **`src/components/blog/BlogPostComments.tsx`**: A new component to be created for displaying and adding comments.

### Implementation Details:

#### Page Views

1.  In `src/app/tutorials/[slug]/page.tsx`, use a `useEffect` hook to call `POST /api/posts/[slug]/views` when the component mounts. This will increment the view count.
2.  Fetch the initial view count using `GET /api/posts/[slug]/stats` and pass it as a prop to `BlogPostSidebar.tsx`.

#### Post Statistics & User Actions

1.  Create a new component, `PostActions.tsx`, which will contain the buttons for "like" and "bookmark". This component will be placed within `BlogPostSidebar.tsx`.
2.  Use a data fetching library like **SWR** or **React Query** to fetch data from `GET /api/posts/[slug]/stats`. This will provide the initial stats and the user's interaction status.
3.  Implement `onClick` handlers for the like and bookmark buttons:
    - On click, optimistically update the UI to reflect the new state (e.g., show the like button as "active" and increment the count).
    - Send a `POST` or `DELETE` request to the appropriate endpoint (`/api/posts/[slug]/like` or `/api/posts/[slug]/bookmark`).
    - If the API call fails, revert the UI to its previous state and show an error message.
    - Re-fetch the stats from the server to ensure data consistency.

#### Comments Section

1.  Create a new component `BlogPostComments.tsx`.
2.  This component will fetch comments from `GET /api/posts/[slug]/comments`.
3.  It will include a form for submitting new comments. The form submission will trigger a `POST` request to `/api/posts/[slug]/comments`.
4.  Upon successful submission, the new comment should be added to the list of comments in the UI, either by re-fetching the comments or by adding it to the existing state.
5.  The `BlogPostComments.tsx` component will be added to the `src/app/tutorials/[slug]/page.tsx` file, below the main post content.

## 4. Authentication

User authentication is required for liking, bookmarking, and commenting. We will use **NextAuth.js**, a popular and flexible authentication library for Next.js.

### Authentication Strategy:

1.  **Setup NextAuth.js**:
    - Install the `next-auth` package.
    - Create a dynamic API route at `src/app/api/auth/[...nextauth]/route.ts`.
    - Configure one or more authentication providers (e.g., GitHub, Google, or email-based magic links).

2.  **Prisma Adapter**:
    - Use the `@next-auth/prisma-adapter` to connect NextAuth.js with the Prisma schema. This will automatically handle user creation, sessions, and account linking in the database.

3.  **Session Management**:
    - Wrap the root layout (`src/app/layout.tsx`) with the `SessionProvider` from `next-auth/react`. This will make the user's session available throughout the application via the `useSession` hook.

4.  **Protecting API Routes**:
    - In the API routes that require authentication (e.g., `POST /api/posts/[slug]/like`), we will check for a valid user session before processing the request. If no session is found, a `401 Unauthorized` error will be returned.

5.  **UI Changes**:
    - The UI will conditionally render elements based on the user's authentication state. For example, the "like" and "bookmark" buttons will be enabled only for logged-in users. A "Log in to comment" message will be displayed in the comments section for guests.
