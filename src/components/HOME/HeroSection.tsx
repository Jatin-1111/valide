"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative bg-background w-full overflow-hidden min-h-[calc(100vh-5rem)] mt-20 flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <Image
          src="/herobg.webp"
          alt="Luxury fashion background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center py-16">
        <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Badge */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm text-surface-light px-4 py-2 rounded-full text-sm font-medium font-montserrat"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              New Collection Available
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-light leading-tight"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              <span className="block">Elevate Your Style</span>
              <span className="block font-montserrat text-2xl sm:text-3xl lg:text-4xl text-surface-light/90 mt-4 font-semibold">
                With Timeless Elegance
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="font-lato text-base sm:text-lg lg:text-xl text-surface-light/80 font-light max-w-2xl"
              {...fadeIn}
              transition={{ delay: 0.6 }}
            >
              Discover curated luxury fashion, designer watches, and premium
              accessories. Indulge in sophistication with worldwide shipping.
            </motion.p>

            {/* Call-to-Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md"
              {...fadeIn}
              transition={{ delay: 0.8 }}
            >
              <Link href="/shop" className="w-full">
                <span className="font-montserrat group flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary text-base sm:text-lg font-semibold rounded-lg hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl w-full">
                  Shop Collection
                  <ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/about" className="w-full">
                <span className="font-montserrat group flex items-center justify-center gap-2 px-8 py-4 border-2 border-surface-light text-surface-light text-base sm:text-lg font-semibold rounded-lg hover:bg-surface-light hover:text-primary transition-all duration-300 w-full">
                  Explore More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 text-surface-light/80 w-full max-w-2xl"
              {...fadeIn}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-montserrat text-sm font-medium">
                  ✨ Premium Quality
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-montserrat text-sm font-medium">
                  🌍 Global Shipping
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-montserrat text-sm font-medium">
                  ⭐ Exclusive Designs
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
