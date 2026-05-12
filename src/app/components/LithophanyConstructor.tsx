import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Square, Circle, Heart, Star, Download, ShoppingCart } from 'lucide-react';

const shapes = [
  { id: 'square', name: 'Square', icon: Square },
  { id: 'circle', name: 'Circle', icon: Circle },
  { id: 'heart', name: 'Heart', icon: Heart },
  { id: 'star', name: 'Star', icon: Star },
];

const sizes = [
  { id: 'small', name: 'Small', dimensions: '4" x 4"', price: 99 },
  { id: 'medium', name: 'Medium', dimensions: '6" x 6"', price: 149 },
  { id: 'large', name: 'Large', dimensions: '8" x 8"', price: 199 },
  { id: 'xlarge', name: 'Extra Large', dimensions: '10" x 10"', price: 249 },
];

export function LithophanyConstructor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState('square');
  const [selectedSize, setSelectedSize] = useState('medium');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedSizeData = sizes.find((s) => s.id === selectedSize);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Lithophany Constructor
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your precious memories into illuminated art. Upload a photo and customize
              your personal lithophany
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">1. Upload Your Photo</h3>
                <label
                  htmlFor="photo-upload"
                  className="group relative block aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden bg-muted/30"
                >
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-6 rounded-full bg-primary/10"
                      >
                        <Upload className="w-12 h-12 text-primary" />
                      </motion.div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">Click to upload</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">2. Choose Shape</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {shapes.map((shape) => {
                    const Icon = shape.icon;
                    return (
                      <motion.button
                        key={shape.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedShape(shape.id)}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          selectedShape === shape.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">{shape.name}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">3. Select Size</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedSize === size.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <p className="font-semibold text-lg">{size.name}</p>
                      <p className="text-sm text-muted-foreground">{size.dimensions}</p>
                      <p className="text-lg font-bold text-primary mt-2">${size.price}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="sticky top-32 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Preview</h3>
                  <div
                    className="aspect-square rounded-2xl border border-border overflow-hidden relative"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)',
                      boxShadow: '0 8px 32px 0 rgba(212, 165, 116, 0.2)',
                    }}
                  >
                    {uploadedImage ? (
                      <div className="relative w-full h-full p-8">
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 40px rgba(255, 179, 71, 0.3)',
                              '0 0 60px rgba(255, 179, 71, 0.5)',
                              '0 0 40px rgba(255, 179, 71, 0.3)',
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className={`w-full h-full overflow-hidden ${
                            selectedShape === 'circle' ? 'rounded-full' :
                            selectedShape === 'square' ? 'rounded-xl' :
                            selectedShape === 'heart' ? 'rounded-3xl' :
                            'rounded-2xl'
                          }`}
                        >
                          <img
                            src={uploadedImage}
                            alt="Preview"
                            className="w-full h-full object-cover opacity-90"
                          />
                        </motion.div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Upload a photo to see preview</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shape</span>
                      <span className="font-medium capitalize">{selectedShape}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">{selectedSizeData?.dimensions}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total Price</span>
                      <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${selectedSizeData?.price}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!uploadedImage}
                    className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!uploadedImage}
                    className="w-full px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Download Preview
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
