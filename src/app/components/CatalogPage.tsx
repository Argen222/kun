import { useState } from 'react';
import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Table Lamps', 'Wall Lamps', 'Lithophany', 'Custom Work'];

const products = [
  {
    id: '1',
    name: 'Golden Sunset Table Lamp',
    price: 149,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    category: 'Table Lamps',
  },
  {
    id: '2',
    name: 'Warm Glow Wall Sconce',
    price: 189,
    rating: 4.9,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    category: 'Wall Lamps',
  },
  {
    id: '3',
    name: 'Memory Lithophany Portrait',
    price: 299,
    rating: 5.0,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    category: 'Lithophany',
  },
  {
    id: '4',
    name: 'Amber Elegance Desk Lamp',
    price: 169,
    rating: 4.7,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
    category: 'Table Lamps',
  },
  {
    id: '5',
    name: 'Moonlight Wall Fixture',
    price: 219,
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1543198126-a8c82d6d9b99?w=800',
    category: 'Wall Lamps',
  },
  {
    id: '6',
    name: 'Custom Family Lithophany',
    price: 349,
    rating: 5.0,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800',
    category: 'Custom Work',
  },
  {
    id: '7',
    name: 'Sunset Glow Reading Lamp',
    price: 129,
    rating: 4.6,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1567225591450-74a715f3d0de?w=800',
    category: 'Table Lamps',
  },
  {
    id: '8',
    name: 'Radiant Memory Cube',
    price: 279,
    rating: 4.9,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    category: 'Lithophany',
  },
];

interface CatalogPageProps {
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export function CatalogPage({ onAddToCart, onToggleFavorite, favorites }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Catalog
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover our collection of handcrafted lighting and personalized lithophany pieces
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  {...product}
                  onAddToCart={onAddToCart}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
