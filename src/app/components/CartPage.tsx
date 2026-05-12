import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartPage({ cart, onUpdateQuantity, onRemoveItem }: CartPageProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15) : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
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
              <ShoppingBag className="w-20 h-20 text-muted-foreground" />
            </motion.div>
            <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Looks like you haven't added anything to your cart yet. Start exploring our
              collection!
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
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Shopping Cart
            </span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-card border border-border rounded-2xl p-6 flex gap-6"
                >
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-6 sticky top-32"
              >
                <h3 className="text-xl font-bold">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 200 && subtotal > 0 && (
                    <p className="text-sm text-primary">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center gap-2 shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <div className="pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                  <p>✓ Secure checkout</p>
                  <p>✓ Free shipping on orders over $200</p>
                  <p>✓ 30-day return policy</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
