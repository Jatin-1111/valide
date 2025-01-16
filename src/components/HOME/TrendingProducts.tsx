"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eye, X, ShoppingBag, Heart, Share2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  category: string;
  views?: number;
  stock?: number;
}

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-surface-light rounded-lg max-w-4xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-surface-dark rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="font-playfair text-2xl text-primary mb-2">
                    {product.name}
                  </h3>
                  <p className="font-montserrat text-accent">
                    {product.designer}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-montserrat text-xl text-primary">
                    ${product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-secondary">
                    {product.stock} in stock
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-surface-light rounded-lg hover:bg-primary-light transition-colors font-montserrat">
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="p-3 border-2 border-primary rounded-lg hover:bg-primary hover:text-surface-light transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TrendingProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: "1",
      name: "Leather Shoulder Bag",
      designer: "Prada",
      price: 2500,
      image: "/products/prada-bag.png",
      category: "Bags",
      views: 1240,
      stock: 3,
    },
    {
      id: "2",
      name: "Polarized Hudson Sunglasses",
      designer: "Tom Ford",
      price: 495,
      image: "/products/tomford-sunglasses.png",
      category: "Accessories",
      views: 890,
      stock: 8,
    },
    {
      id: "3",
      name: "Classic Chronograph Watch",
      designer: "Cartier",
      price: 12500,
      image: "/products/cartier-watch.png",
      category: "Watches",
      views: 1560,
      stock: 2,
    },
    {
      id: "4",
      name: "Leather Loafers",
      designer: "Louis Vuitton",
      price: 1200,
      image: "/products/lv-loafers.png",
      category: "Shoes",
      views: 750,
      stock: 5,
    },
    {
      id: "5",
      name: "Diamond Pendant Necklace",
      designer: "Tiffany & Co.",
      price: 8900,
      image: "/products/tiffany-necklace.png",
      category: "Jewelry",
      views: 980,
      stock: 4,
    },
  ];

  return (
    <section className="bg-background py-20 px-6 sm:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-montserrat text-sm uppercase tracking-wider mb-4"
          >
            Most Popular
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl text-primary"
          >
            Trending Now
          </motion.h2>
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg bg-surface-dark transition-transform duration-700 group-hover:scale-105"
                />

                {/* Enhanced Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    backdropFilter:
                      hoveredProduct === product.id ? "blur(2px)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/30 rounded-lg"
                >
                  {/* Action Buttons Container */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0 }}
                      onClick={() => setSelectedProduct(product)}
                      className="bg-surface-light p-3 rounded-full hover:bg-primary hover:text-surface-light transition-colors duration-300"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-surface-light p-3 rounded-full hover:bg-primary hover:text-surface-light transition-colors duration-300"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-surface-light p-3 rounded-full hover:bg-primary hover:text-surface-light transition-colors duration-300"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="bg-surface-light p-3 rounded-full hover:bg-primary hover:text-surface-light transition-colors duration-300"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Product Quick Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
                  >
                    <p className="text-surface-light font-montserrat text-sm">
                      {product.stock} items in stock
                    </p>
                  </motion.div>
                </motion.div>

                {/* Popularity Badge */}
                <div className="absolute top-4 left-4 bg-surface-light/90 px-3 py-1 rounded-full">
                  <p className="font-montserrat text-sm text-primary flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {product.views?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Product Info remains the same */}
              <div className="space-y-2">
                <h3 className="font-playfair text-lg text-primary">
                  {product.name}
                </h3>
                <p className="font-montserrat text-accent text-sm">
                  {product.designer}
                </p>
                <p className="font-montserrat text-primary">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* QuickView Modal remains the same */}
        <QuickViewModal
          product={selectedProduct!}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </section>
  );
};

export default TrendingProducts;
