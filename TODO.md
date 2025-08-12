# A-ram Tutorials: Development Tasks

This document outlines the development tasks for the A-ram Tutorials project, synthesized from the Product Requirements Document (PRD) and the Technical Architecture document.

## Phase 1: Project Setup and Foundation

- [ ] **1.1. Initialize Next.js 14 project with TypeScript and Tailwind CSS:** Set up the basic project structure using the `create-next-app` CLI tool.
- [ ] **1.2. Configure ESLint, Prettier, and Husky:** Enforce code quality and consistency with automated linting, formatting, and pre-commit hooks.
- [ ] **1.3. Set up project structure:** Create directories for `components`, `lib`, `styles`, `types`, and other necessary folders.
- [ ] **1.4. Install core dependencies:** Add `next`, `react`, `react-dom`, and `tailwindcss` to the project.
- [ ] **1.5. Set up Neon PostgreSQL database:** Create a new Neon project, obtain the connection string, and connect it to the Next.js application.
- [ ] **1.6. Configure Vercel for deployment:** Set up a new Vercel project, link the GitHub repository, and configure environment variables.

## Phase 2: Database and Content

- [ ] **2.1. Implement database schema:** Write and execute the SQL scripts to create the tables defined in the Technical Architecture document.
- [ ] **2.2. Create tables:**
  - [ ] `blog_posts`
  - [ ] `categories`
  - [ ] `tags`
  - [ ] `post_tags`
  - [ ] `newsletter_subscriptions`
  - [ ] `contact_submissions`
- [ ] **2.3. Populate initial data:** Insert the initial `categories` and `tags` into the database.
- [ ] **2.4. Set up Markdown-based content management:** Configure the project to read blog posts from `.md` files with frontmatter.

## Phase 3: UI Components and Design System

- [ ] **3.1. Implement the design system:** Define the color palette, typography, and button styles in Tailwind CSS configuration.
- [ ] **3.2. Create a `components/ui` directory:** Organize shared, reusable UI components.
- [ ] **3.3. Build core UI components:**
  - [ ] `Button`
  - [ ] `Card`
  - [ ] `Input`
  - [ ] `Badge`
  - [ ] `Header`
  - [ ] `Footer`
- [ ] **3.4. Implement a dark mode toggle:** Allow users to switch between light and dark themes.

## Phase 4: Page and Feature Implementation

- [ ] **4.1. Homepage (`/`)**
  - [ ] Create `HeroSection` with the brand tagline and a call-to-action button.
  - [ ] Implement the `FeaturedTutorial` section to highlight a key post.
  - [ ] Build the `RecentPostsGrid` to display the 6-8 latest tutorials.
  - [ ] Create the `CategoriesSection` with visually distinct tiles for each category.
  - [ ] Implement the `NewsletterOptIn` form.
- [ ] **4.2. About Page (`/about`)**
  - [ ] Create the `CreatorBio` section with a personal introduction.
  - [ ] Add the `MissionStatement` explaining the platform's purpose.
  - [ ] Integrate a link to the YouTube channel and display the subscriber count.
- [ ] **4.3. Blog/Tutorials Page (`/blog`)**
  - [ ] Implement a `TutorialGrid` with pagination or infinite scroll.
  - [ ] Build a `FilterSystem` to allow users to filter posts by category and tag.
  - [ ] Design `PostPreviewCards` that display post metadata.
- [ ] **4.4. Single Blog Post Page (`/blog/[slug]`)**
  - [ ] Create the `ArticleHeader` with title, author, date, and reading time.
  - [ ] Implement the `ContentArea` to render rich text, code snippets, and images.
  - [ ] Auto-generate a `TableOfContents` for long-form articles.
  - [ ] Build a `RelatedPosts` section to suggest similar content.
  - [ ] Add `SocialSharing` buttons for major platforms.
  - [ ] Integrate a commenting system like Disqus or a native solution.
- [ ] **4.5. Contact Page (`/contact`)**
  - [ ] Build a `ContactForm` with proper validation and spam protection.
  - [ ] Display the direct contact email address.
  - [ ] Embed a Google Form for users to suggest new tutorial topics.
- [ ] **4.6. Legal Pages**
  - [ ] Create the `PrivacyPolicy` page at `/privacy`.
  - [ ] Create the `TermsOfService` page at `/terms`.

## Phase 5: API and Backend Logic

- [ ] **5.1. Create API route for `ContactForm` submission (`/api/contact`):** Handle form data and save it to the database.
- [ ] **5.2. Create API route for `Newsletter` subscription (`/api/newsletter`):** Add new subscribers to the database.
- [ ] **5.3. Implement API route for blog post search (`/api/search`):** Allow users to search for posts by keyword and category.
- [ ] **5.4. Set up NextAuth.js:** Configure basic authentication for potential future admin features.

## Phase 6: Finalization and Deployment

- [ ] **6.1. Implement SEO metadata:** Add titles, descriptions, and meta tags to all pages for better search engine visibility.
- [ ] **6.2. Set up Plausible Analytics:** Integrate analytics to track website traffic.
- [ ] **6.3. Configure Vercel Blob Storage:** Set up file storage for images and other assets.
- [ ] **6.4. Perform final testing and QA:** Conduct a thorough review of the site to fix bugs and ensure all features work as expected.
- [ ] **6.5. Deploy the application to Vercel:** Push the final code to production.
