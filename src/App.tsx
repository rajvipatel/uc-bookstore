import React, { useState } from 'react';
import { Search, ShoppingCart, BookOpen, Heart, User, Menu, X } from 'lucide-react';
import { BookCard } from './components/BookCard';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { useCart } from './hooks/useCart';
import { books } from './data/books';

type View = 'catalog' | 'checkout';

function App() {
  const [view, setView] = useState<View>('catalog');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  const categories = ['All', ...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleOrderComplete = () => {
    clearCart();
    setView('catalog');
  };

  if (view === 'checkout') {
    return (
      <Checkout
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onBack={() => setView('catalog')}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <BookOpen className="w-8 h-8 text-amber-700" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Bibliotheca
                </h1>
                <p className="text-xs text-slate-500 font-light tracking-wide">CURATED LITERARY COLLECTION</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search our collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 w-64 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <nav className="flex items-center gap-6">
                <button className="text-slate-600 hover:text-amber-700 flex items-center gap-2 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
                <button className="text-slate-600 hover:text-amber-700 flex items-center gap-2 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-slate-600 hover:text-amber-700 flex items-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Cart</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shadow-lg">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/50">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search our collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 w-full bg-white/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-left text-slate-600 hover:text-amber-700 flex items-center gap-2 py-2 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
                <button className="text-left text-slate-600 hover:text-amber-700 flex items-center gap-2 py-2 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-slate-600 hover:text-amber-700 flex items-center gap-2 py-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Cart ({getTotalItems()})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-bold text-slate-800 mb-4 leading-tight">
            Discover Literary
            <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
              Treasures
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our thoughtfully curated collection of exceptional books, from contemporary masterpieces to timeless classics
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-md border border-slate-200/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-slate-300 mx-auto mb-6" />
            <p className="text-slate-500 text-lg">No books found matching your criteria</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search or category filter</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <BookOpen className="w-7 h-7 text-amber-400" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-amber-100">Bibliotheca</h3>
                  <p className="text-xs text-slate-400 font-light tracking-wide">CURATED LITERARY COLLECTION</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Where exceptional literature meets discerning readers. Every book in our collection is carefully selected for its literary merit and enduring value.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-amber-100">Collections</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-amber-300 transition-colors">New Acquisitions</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Literary Classics</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Contemporary Fiction</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Rare Editions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-amber-100">Services</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-amber-300 transition-colors">Personal Curation</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Book Consultation</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Gift Collections</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Literary Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-amber-100">Connect</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-amber-300 transition-colors">Literary Newsletter</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Reading Circle</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Book Reviews</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Bibliotheca. Crafted with care for literary enthusiasts.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}

export default App;