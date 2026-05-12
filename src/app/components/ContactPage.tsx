import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Clock, Instagram, MessageCircle, Send } from 'lucide-react';

export function ContactPage() {
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
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to create something special? We're here to help bring your
              vision to light.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Contact Information</h2>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-muted-foreground">
                        123 Light Street, Sunshine City, SC 12345
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a
                        href="mailto:hello@kun.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        hello@kun.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <a
                        href="tel:+1234567890"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Follow Us</h3>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-muted hover:bg-primary/20 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-muted hover:bg-primary/20 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-muted hover:bg-primary/20 transition-colors"
                  >
                    <Send className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>

              <div
                className="rounded-2xl overflow-hidden h-64 bg-muted"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(212, 165, 116, 0.2) 0%, rgba(255, 179, 71, 0.2) 100%)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-8 space-y-6"
              style={{
                boxShadow: '0 8px 32px 0 rgba(212, 165, 116, 0.1)',
              }}
            >
              <h2 className="text-2xl font-bold">Send us a Message</h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us about your project or question..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
