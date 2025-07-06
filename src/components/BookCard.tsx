import React from 'react';
import { Star, ShoppingCart, Badge, Clock } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.isBestseller && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Badge className="w-3 h-3" />
              Bestseller
            </span>
          )}
          {book.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" />
              New
            </span>
          )}
        </div>
        {book.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {book.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        
        <p className="text-gray-600 mb-2 font-medium">
          by {book.author}
        </p>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{book.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">{book.reviews} reviews</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${book.price}
            </span>
            {book.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${book.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(book)}
            disabled={!book.inStock}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              book.inStock
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {book.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};