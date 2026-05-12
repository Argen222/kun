import { motion } from 'motion/react';
import { Sparkles, Heart, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Handcrafted Quality',
    description: 'Each piece is meticulously crafted by skilled artisans with attention to every detail',
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    description: 'Transform your cherished memories into illuminated art that tells your story',
  },
  {
    icon: Award,
    title: 'Premium Materials',
    description: 'We use only the finest materials to ensure longevity and beauty',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Dedicated support and personalized service for every order',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-20"
        >
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                About KUN
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              KUN creates a unique light and turns photographs into art. We believe that every memory
              deserves to be illuminated, and every space deserves the warmth of thoughtfully crafted
              lighting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a passion for light and memory, KUN was born from the idea that
                  lighting should do more than just illuminate—it should inspire, comfort, and
                  preserve our most precious moments.
                </p>
                <p>
                  Our name, KUN, is associated with the sun, warmth, light, and comfort. Just as
                  the sun brings life and energy, our creations bring warmth and personality to
                  every space they inhabit.
                </p>
                <p>
                  Each piece in our collection is handcrafted with meticulous attention to detail,
                  using premium materials and innovative techniques. Our lithophany technology
                  transforms your photographs into three-dimensional art that comes alive when
                  illuminated.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)',
                boxShadow: '0 8px 32px 0 rgba(212, 165, 116, 0.2)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(255, 179, 71, 0.4)',
                      '0 0 100px rgba(255, 179, 71, 0.6)',
                      '0 0 60px rgba(255, 179, 71, 0.4)',
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-accent via-primary to-accent"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center space-y-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To bring warmth, beauty, and personalization to every home through expertly crafted
              lighting and lithophany. We're committed to preserving your most treasured memories
              in a form that can be enjoyed every day, creating an atmosphere of comfort and
              nostalgia that lasts a lifetime.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
