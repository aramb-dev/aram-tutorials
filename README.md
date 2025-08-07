# aram-tutorials

A personal website and blog featuring tech tutorials and articles.

## Project Purpose & Core Functionality

This project is a modern, full-stack web application built with Next.js. Its primary purpose is to serve as a personal portfolio and knowledge-sharing platform. The core functionality revolves around providing educational content through a blog and a dedicated tutorials section. It also includes pages for personal information (About) and user interaction (Contact).

## Key Features

- **Blog:** A feature-rich blog with components for individual posts, comments, categories, and related post suggestions.
- **Tutorials:** A dedicated section for tutorials, complete with filtering and listing capabilities.
- **Contact Page:** Includes a contact form for user inquiries and an FAQ section.
- **About Page:** A comprehensive "About Me" section detailing personal story, skills, and professional experience.
- **Home Page:** A well-structured landing page with a hero section, featured posts, and a newsletter subscription form.
- **Custom UI Library:** A set of reusable UI components, indicating a consistent design system.

## Installation & Dependencies

### Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/aram-tutorials.git
cd aram-tutorials
npm install
```

### Running the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build, run:

```bash
npm run build
```

### Starting the Production Server

To start the production server, run:

```bash
npm run start
```

### Key Dependencies

- **Core:** `next`, `react`, `react-dom`
- **Database:** `@neondatabase/serverless`
- **Authentication:** `next-auth`
- **UI:** `@radix-ui/*`, `tailwindcss`
- **Forms:** `zod`, `react-hook-form`

## Configuration

The `next.config.ts` file is configured to allow images from the following remote domains:

- `trae-api-us.mchost.guru`
- `images.unsplash.com`
- `via.placeholder.com`

## Contributing

We welcome contributions to improve the project. Please follow these guidelines:

- **Bug Reports:** If you find a bug, please open an issue with a detailed description, steps to reproduce, and expected behavior.
- **Feature Suggestions:** Have an idea for a new feature? Open an issue to discuss it.
- **Pull Requests:** We welcome pull requests. Please ensure your code follows the project's coding standards and includes tests where applicable.

## Roadmap

Here are some of the planned enhancements for the future:

- [ ] Implement user authentication for comments and interactions.
- [ ] Add a dark mode toggle.
- [ ] Expand the tutorials section with more advanced topics.
- [ ] Optimize performance and accessibility.

## License

This project is licensed under the **MIT License**.

## Contact

For any inquiries or support, please reach out via the contact form on the website or open an issue on GitHub.
