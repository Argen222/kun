import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: 'May 8, 2026',
    review:
      'The lithophany of my family is absolutely stunning! When the light shines through, every detail comes alive. This is more than just a lamp—it\'s a piece of art that holds our memories.',
    product: 'Custom Family Lithophany',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: 'May 5, 2026',
    review:
      'I bought the Golden Sunset Table Lamp and it has completely transformed my workspace. The warm glow is perfect for evening work sessions. Quality is exceptional!',
    product: 'Golden Sunset Table Lamp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 5,
    date: 'May 3, 2026',
    review:
      'The customer service was outstanding, and the final product exceeded all my expectations. My wedding photo lithophany is the centerpiece of our living room.',
    product: 'Memory Lithophany Portrait',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
  },
  {
    id: 4,
    name: 'David Thompson',
    rating: 5,
    date: 'April 28, 2026',
    review:
      'Perfect gift for my parents\' anniversary. They were moved to tears when they saw their old photo illuminated. The craftsmanship is impeccable.',
    product: 'Custom Family Lithophany',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    id: 5,
    name: 'Jessica Lee',
    rating: 5,
    date: 'April 25, 2026',
    review:
      'The Amber Elegance Desk Lamp is gorgeous! It adds such a sophisticated touch to my home office. Love the warm, golden light it casts.',
    product: 'Amber Elegance Desk Lamp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
  },
  {
    id: 6,
    name: 'Robert Martinez',
    rating: 5,
    date: 'April 22, 2026',
    review:
      'Ordered three wall sconces for our hallway. The installation was easy and they look absolutely premium. The quality matches high-end boutique stores.',
    product: 'Warm Glow Wall Sconce',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
  },
];

export function ReviewsPage() {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Customer Reviews
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about their KUN experience
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>

              <div className="space-y-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {totalReviews}+
                </div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>

              <div className="space-y-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  98%
                </div>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-4 relative overflow-hidden"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10" />

                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full bg-muted"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">{review.review}</p>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-primary font-medium">{review.product}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center space-y-6"
          >
            <h2 className="text-3xl font-bold">Share Your Experience</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you! Leave a review and help others discover the magic of KUN.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
            >
              Write a Review
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
