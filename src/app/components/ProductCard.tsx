import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  rating,
  reviews,
  image,
  category,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? '0 20px 60px rgba(212, 165, 116, 0.2)'
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleFavorite(id)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${
            isFavorite ? 'bg-accent text-primary-foreground' : 'bg-background/80 text-foreground'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(id)}
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{category}</span>
        </div>

        <h3 className="font-semibold text-lg text-foreground line-clamp-2">{name}</h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
