"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Men's Collection",
      description: "Refined elegance for the modern gentleman",
      image: "/mens-category.webp", // You'll need to add these images
      link: "/men",
    },
    {
      id: 2,
      title: "Women's Collection",
      description: "Timeless sophistication meets contemporary style",
      image: "/womens-category.webp",
      link: "/women",
    },
    {
      id: 3,
      title: "Luxury Accessories",
      description: "Complete your look with premium accessories",
      image: "/accessories-category.webp",
      link: "/accessories",
    },
    {
      id: 4,
      title: "Designer Shoes",
      description: "Step into luxury with our curated footwear",
      image: "/shoes-category.webp",
      link: "/shoes",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="bg-background py-20 px-6 sm:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Featured Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-lato text-lg text-secondary/80 max-w-2xl mx-auto"
          >
            Explore our curated collections of luxury fashion and accessories
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg aspect-[16/9]"
            >
              {/* Category Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>

              {/* Category Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
                  {category.title}
                </h3>
                <p className="font-lato text-white/80 mb-4">
                  {category.description}
                </p>
                <Link href={category.link}>
                  <span className="inline-flex items-center text-white font-montserrat font-medium">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;