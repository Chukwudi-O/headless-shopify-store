# Headless Shopify Store

A modern e-commerce storefront built with Next.js and Shopify's Storefront API.

## Overview

This project demonstrates a headless commerce implementation using:
- **Next.js** - React framework for production
- **Shopify Storefront API** - Headless commerce backend
- **TypeScript** - Type-safe development

## Features

- Product catalog browsing
- Shopping cart management
- Checkout integration
- User profile management
- Server-side rendering (SSR)
- Static site generation (SSG)
- Responsive design

## Getting Started

### Prerequisites

- Node.js 14+
- Shopify store with Storefront API access
- Shopify access token

### Installation

```bash
git clone https://github.com/Chukwudi-O/headless-shopify-store.git
cd headless-shopify-store
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── components/     # React components
├── pages/          # Next.js pages
├── lib/            # Utility functions and API calls

```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/api/storefront)

## License

MIT