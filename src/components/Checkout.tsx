import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Check, BookOpen } from 'lucide-react';
import { CartItem, Customer, PaymentInfo } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cartItems,
  totalPrice,
  onBack,
  onOrderComplete
}) => {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);

  const handleSubmitCustomerInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onOrderComplete();
    }, 3000);
  };

  const shippingCost = 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-slate-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Order Confirmed!</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Thank you for choosing Bibliotheca. Your literary collection has been curated and will arrive soon. A confirmation email has been sent to you.
          </p>
          <div className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            Returning to collection...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Collection
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50">
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Your Literary Collection
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-slate-50/50 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500 mb-1">by {item.author}</p>
                    <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2 border-t border-slate-200 text-slate-800">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50">
            {step === 1 && (
              <form onSubmit={handleSubmitCustomerInfo}>
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-6 h-6 text-amber-600" />
                  <h2 className="text-xl font-serif font-bold text-slate-800">Delivery Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.firstName}
                      onChange={(e) => setCustomer({...customer, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.lastName}
                      onChange={(e) => setCustomer({...customer, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({...customer, email: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({...customer, address: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({...customer, city: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.state}
                      onChange={(e) => setCustomer({...customer, state: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.zipCode}
                      onChange={(e) => setCustomer({...customer, zipCode: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitPayment}>
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                  <h2 className="text-xl font-serif font-bold text-slate-800">Payment Details</h2>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={payment.cardholderName}
                    onChange={(e) => setPayment({...payment, cardholderName: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({...payment, cardNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={payment.expiryDate}
                      onChange={(e) => setPayment({...payment, expiryDate: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Security Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={payment.cvv}
                      onChange={(e) => setPayment({...payment, cvv: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25"
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};