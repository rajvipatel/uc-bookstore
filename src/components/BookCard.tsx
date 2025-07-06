import React from 'react';
import { Star, ShoppingCart, Badge, Clock } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-slate-200/50">
      <div className="relative overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {book.isBestseller && (
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <Badge className="w-3 h-3" />
              Bestseller
            </span>
          )}
          {book.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <Clock className="w-3 h-3" />
              New Arrival
            </span>
          )}
        </div>
        {book.originalPrice && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <span className="text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {book.category}
          </span>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
          {book.title}
        </h3>
        
        <p className="text-slate-600 mb-3 font-medium">
          by {book.author}
        </p>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">
          {book.description}
        </p>
        
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-700">{book.rating}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-sm text-slate-500">{book.reviews} reviews</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-800">
              ${book.price}
            </span>
            {book.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                ${book.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(book)}
            disabled={!book.inStock}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
              book.inStock
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {book.inStock ? 'Add to Collection' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};