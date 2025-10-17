# Ultimate Adventure Guides Website

A React-based recreation of the Ultimate Adventure Guides website using React and Tailwind CSS.

## Project Structure

- **Layout Components**
  - `Header.tsx`: Navigation header with responsive mobile menu
  - `Footer.tsx`: Site footer with company info, links, and newsletter signup
  - `Layout.tsx`: Main layout wrapper component

- **Page Components**
  - `Home.tsx`: Main homepage component that assembles all sections
  - `Book.tsx`: Booking page where all available adventures are listed with information
  - `ActivityDetails.tsx`: Details page with more info on adventures
  - `Reviews.tsx`: Page listing reviews of past clients
  - `About.tsx`: About Ultimate Adventure Guides and contact info

- **Section Components**
  - `Hero.tsx`: Main hero section with background image and call-to-action buttons
  - `FeaturedActivities.tsx`: Grid display of featured travel destinations
  - `CompanyFeature.tsx`: Display of featured travel experiences and activities
  - `Testimonials.tsx`: Customer testimonials section
  - `ContactForm.tsx`: Email newsletter signup section
  - `CallToAction.tsx`: Final call-to-action section

## Features

- Fully responsive design
- Mobile-friendly navigation
- Component-based architecture
- Modern, clean UI that matches the original site
- Tailwind CSS for styling
- React Router for navigation
- Loading and error handling
- Dynamic content through database storage and display
- zod and schema typing usage for database consistency
- Hosted on Vercel

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## API used
- Supabase database and S3 photo bucket

## Additional Features (beyond requirements)
- Tailwind CSS
- Supabase database for persistent data