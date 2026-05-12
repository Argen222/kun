import { motion } from 'motion/react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

const allProducts = [
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

interface FavoritesPageProps {
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function FavoritesPage({ favorites, onAddToCart, onToggleFavorite }: FavoritesPageProps) {
  const favoriteProducts = allProducts.filter((product) => favorites.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="p-8 rounded-full bg-muted/50"
            >
              <Heart className="w-20 h-20 text-muted-foreground" />
            </motion.div>
            <h2 className="text-3xl font-bold">No Favorites Yet</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Start adding products to your favorites to keep track of items you love!
            </p>
            <motion.a
              href="/catalog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-2 shadow-lg"
            >
              Browse Catalog
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  My Favorites
                </span>
              </h1>
              <p className="text-muted-foreground">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product, index) => (
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
                  isFavorite={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
