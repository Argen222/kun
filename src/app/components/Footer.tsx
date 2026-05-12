import { Sun, Instagram, MessageCircle, Send, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg"
                style={{
                  boxShadow: '0 0 30px rgba(212, 165, 116, 0.3)',
                }}
              >
                <Sun className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                KUN
              </span>
            </Link>
            <p className="text-muted-foreground">
              Creating unique light that turns photographs into art and brings warmth to every home.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <Send className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                All Products
              </Link>
              <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                Table Lamps
              </Link>
              <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                Wall Lamps
              </Link>
              <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                Lithophany
              </Link>
              <Link to="/constructor" className="text-muted-foreground hover:text-primary transition-colors">
                Custom Orders
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                Reviews
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping & Returns
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>123 Light Street, Sunshine City, SC 12345</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:hello@kun.com" className="hover:text-primary transition-colors">
                  hello@kun.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 KUN. All rights reserved.</p>
            <p>Handcrafted with ❤️ for bringing light to memories</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
