# Bibliotheca - Curated Literary Collection

An elegant and sophisticated online bookstore built with React, TypeScript, and Tailwind CSS. Bibliotheca offers a premium shopping experience for book enthusiasts, featuring a carefully curated collection of literary works.

## Features

- **Elegant Design**: Premium, sophisticated interface with attention to detail
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Advanced Filtering**: Search and filter books by category
- **Shopping Cart**: Full cart functionality with quantity management
- **Secure Checkout**: Multi-step checkout process with customer and payment information
- **Modern UI**: Beautiful animations, hover effects, and micro-interactions
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building
- **Local Storage** for cart persistence

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── BookCard.tsx    # Individual book display
│   ├── Cart.tsx        # Shopping cart sidebar
│   └── Checkout.tsx    # Checkout process
├── data/               # Static data
│   └── books.ts        # Book catalog
├── hooks/              # Custom React hooks
│   └── useCart.ts      # Cart management logic
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
└── App.tsx             # Main application component
```

## Features in Detail

### Book Catalog
- Curated collection of literary works
- High-quality book covers and descriptions
- Rating and review system
- Category-based organization
- Stock status tracking

### Shopping Experience
- Intuitive add-to-cart functionality
- Real-time cart updates
- Quantity management
- Price calculations with discounts
- Persistent cart across sessions

### Checkout Process
- Two-step checkout flow
- Customer information collection
- Secure payment form
- Order confirmation
- Responsive design

## Design Philosophy

Bibliotheca embodies elegance and sophistication in every detail:
- **Typography**: Serif fonts for headings to evoke literary tradition
- **Color Palette**: Warm amber and slate tones for a premium feel
- **Interactions**: Smooth animations and hover effects
- **Layout**: Clean, spacious design with thoughtful white space
- **Accessibility**: High contrast ratios and semantic HTML

## Contributing

This project showcases modern React development practices and can serve as a template for e-commerce applications. Feel free to use it as a starting point for your own projects.

## License

MIT License - feel free to use this project for personal or commercial purposes.