import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive.',
    category: 'Fiction',
    rating: 4.5,
    reviews: 1842,
    inStock: true,
    isBestseller: true
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Transform your life with tiny changes in behavior.',
    category: 'Self-Help',
    rating: 4.8,
    reviews: 3254,
    inStock: true,
    isBestseller: true
  },
  {
    id: '3',
    title: 'The Seven Moons of Maali Almeida',
    author: 'Shehan Karunatilaka',
    price: 22.50,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A darkly comic and savage satire about a photographer who wakes up dead and has seven moons to solve his own murder.',
    category: 'Literary Fiction',
    rating: 4.3,
    reviews: 892,
    inStock: true,
    isNew: true
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    price: 16.99,
    originalPrice: 21.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge.',
    category: 'Biography',
    rating: 4.6,
    reviews: 2156,
    inStock: true
  },
  {
    id: '5',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Four unlikely friends meet weekly to investigate cold cases, but soon find themselves pursuing a killer.',
    category: 'Mystery',
    rating: 4.4,
    reviews: 1567,
    inStock: true
  },
  {
    id: '6',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 19.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities?',
    category: 'History',
    rating: 4.7,
    reviews: 4321,
    inStock: true,
    isBestseller: true
  },
  {
    id: '7',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 17.50,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A psychotherapist becomes obsessed with treating a young woman who refuses to speak after allegedly murdering her husband.',
    category: 'Thriller',
    rating: 4.2,
    reviews: 2891,
    inStock: false
  },
  {
    id: '8',
    title: 'Becoming',
    author: 'Michelle Obama',
    price: 23.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An intimate, powerful, and inspiring memoir by the former First Lady of the United States.',
    category: 'Biography',
    rating: 4.8,
    reviews: 5234,
    inStock: true,
    isNew: true
  }
];