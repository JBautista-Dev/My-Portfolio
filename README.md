# My Portfolio

A personal portfolio website built with Next.js, showcasing my projects, background, and contact information.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **Icons:** Heroicons

## Features

- Parallax hero section
- About section
- Projects showcase
- Contact section
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/JoshuaBautista/My-Portfolio.git
cd My-Portfolio
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### Build

Create a production build:

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
└── app/
    ├── about/           # About page route
    ├── components/      # Reusable UI components
    │   ├── About.tsx
    │   ├── Contact.tsx
    │   ├── Header.tsx
    │   ├── ParallaxHero.tsx
    │   └── Projects.tsx
    ├── globals.css      # Global styles
    ├── layout.tsx       # Root layout
    └── page.tsx         # Home page
```

## Deployment

The easiest way to deploy is on [Vercel](https://vercel.com/new), the platform from the creators of Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more options.
