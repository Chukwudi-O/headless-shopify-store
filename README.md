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
Clone
```bash
git clone https://github.com/Chukwudi-O/headless-shopify-store.git
```
Enter
```bash
cd headless-shopify-store
```
Install dependencies
```bash
pnpm install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_ACCESS_TOKEN=your_access_token
```

### Running Locally

```bash
pnpm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
headless-shopify-store/
├── app/                # Website pages
|   ├── actions         # Server actions to call API
|   └── auth            # Auth group
├── components/         # React components
|       └── ui          # Shadcn Components
├── lib/                # Utility functions and API calls
|   └── shopify/        # package for Shopify API calls
|       ├── auth        # queries and mutations of user profiles
|       ├── cart        # queries and mutations of user cart
|       ├── products    # queries of products
|       ├── fetch.ts    # API setup for fetching
|       └── index.ts    # server only exports

```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/api/storefront)

## License

MIT