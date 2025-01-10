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
    <section className="relative bg-background w-full overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10 w-full h-full">
        <Image
          src="/herobg.webp"
          alt="Luxury fashion background"
          fill
          className="object-cover w-full"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          className="mb-8 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium font-montserrat"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          New Collection Available
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6"
          {...fadeIn}
          transition={{ delay: 0.4 }}
        >
          <span className="block">Elevate Your Style</span>
          <span className="block font-montserrat text-3xl sm:text-4xl lg:text-5xl text-secondary/80 mt-4 font-semibold">
            With Timeless Elegance
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="font-lato text-lg sm:text-xl lg:text-2xl text-secondary font-light max-w-3xl mb-12"
          {...fadeIn}
          transition={{ delay: 0.6 }}
        >
          Discover curated luxury fashion, designer watches, and premium
          accessories. Indulge in sophistication with worldwide shipping.
        </motion.p>

        {/* Call-to-Actions */}
        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          {...fadeIn}
          transition={{ delay: 0.8 }}
        >
          <Link href="/shop">
            <span className="font-montserrat group flex items-center gap-2 px-8 py-4 bg-primary text-surface-light text-lg font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Collection
              <ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="/about">
            <span className="font-montserrat group flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary text-lg font-semibold rounded-lg hover:bg-primary hover:text-surface-light transition-all duration-300">
              Explore More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16 text-secondary/60"
          {...fadeIn}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-sm font-medium">
              ✨ Premium Quality
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-sm font-medium">
              🌍 Global Shipping
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-sm font-medium">
              ⭐ Exclusive Designs
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
