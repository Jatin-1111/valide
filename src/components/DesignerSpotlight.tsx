"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ArrowRightCircle } from "lucide-react";

const DesignerSpotlight = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const designers = [
    {
      id: 1,
      name: "Prada",
      category: "Luxury Bags & Fashion",
      description: "A symbol of Italian luxury, Prada combines traditional craftsmanship with innovative design, creating timeless pieces that define modern elegance.",
      image: "/prada-logo.png",
      collections: ["Bags", "Ready-to-Wear", "Accessories"],
      featuredProduct: "Leather Shoulder Bag"
    },
    {
      id: 2,
      name: "Tom Ford",
      category: "Fashion & Accessories",
      description: "Tom Ford exemplifies modern luxury with sophisticated designs and meticulous attention to detail, particularly in their iconic eyewear collection.",
      image: "/tomford-logo.png",
      collections: ["Sunglasses", "Fashion", "Beauty"],
      featuredProduct: "Polarized Hudson Sunglasses"
    },
    {
      id: 3,
      name: "Cartier",
      category: "Fine Watches & Jewelry",
      description: "Cartier's legacy of exceptional watchmaking and jewelry design continues to set the standard for luxury timepieces and accessories.",
      image: "/cartier-logo.png",
      collections: ["Watches", "Jewelry", "Accessories"],
      featuredProduct: "Classic Chronograph Watch"
    },
    {
      id: 4,
      name: "Louis Vuitton",
      category: "Fashion & Leather Goods",
      description: "Louis Vuitton's commitment to excellence in craftsmanship and design creates enduring pieces that blend heritage with contemporary style.",
      image: "/lv-logo.png",
      collections: ["Shoes", "Bags", "Accessories"],
      featuredProduct: "Leather Loafers"
    },
    {
      id: 5,
      name: "Tiffany & Co.",
      category: "Fine Jewelry",
      description: "Tiffany & Co. creates legendary jewelry pieces that capture both timeless elegance and modern sophistication in precious metals and stones.",
      image: "/tiffany-logo.png",
      collections: ["Jewelry", "Engagement", "Accessories"],
      featuredProduct: "Diamond Pendant Necklace"
    }
  ];

  const nextDesigner = () => {
    setActiveIndex((prev) => (prev + 1) % designers.length);
  };

  const prevDesigner = () => {
    setActiveIndex((prev) => (prev - 1 + designers.length) % designers.length);
  };

  return (
    <section className="bg-surface-DEFAULT py-20 px-6 sm:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-montserrat text-sm uppercase tracking-wider mb-4"
            >
              Featured Designers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl md:text-5xl text-primary"
            >
              Designer Spotlight
            </motion.h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevDesigner}
              className="p-2 border-2 border-primary rounded-full hover:bg-primary hover:text-surface-light transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextDesigner}
              className="p-2 border-2 border-primary rounded-full hover:bg-primary hover:text-surface-light transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Designer Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Featured Image */}
          <motion.div
            key={designers[activeIndex].id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="relative h-[600px] rounded-lg overflow-hidden"
          >
            <Image
              src={designers[activeIndex].image}
              alt={designers[activeIndex].name}
              fill
              className="object-contain"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
            {/* <div className="absolute bottom-6 left-6 text-white">
              <p className="font-montserrat text-sm mb-2">Featured Product</p>
              <p className="font-playfair text-xl">{designers[activeIndex].featuredProduct}</p>
            </div> */}
          </motion.div>

          {/* Designer Info */}
          <motion.div
            key={`info-${designers[activeIndex].id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-playfair text-3xl text-primary mb-2">
              {designers[activeIndex].name}
            </h3>
            <p className="text-accent font-montserrat text-sm uppercase tracking-wider mb-6">
              {designers[activeIndex].category}
            </p>
            <p className="font-lato text-lg text-secondary mb-8">
              {designers[activeIndex].description}
            </p>

            {/* Collections */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {designers[activeIndex].collections.map((collection) => (
                <div
                  key={collection}
                  className="text-center p-4 bg-surface-light rounded-lg hover:bg-accent hover:text-surface-light transition-colors duration-300"
                >
                  <p className="font-montserrat text-sm">
                    {collection}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href={`/designers/${designers[activeIndex].name.toLowerCase().replace(" ", "-")}`}>
              <span className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-surface-light rounded-lg hover:bg-primary-light transition-colors">
                <span className="font-montserrat">View Collection</span>
                <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Designer Quick Select */}
        <div className="flex justify-center gap-2 mt-12">
          {designers.map((designer, index) => (
            <button
              key={designer.id}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-accent"
                  : "bg-accent/30 hover:bg-accent/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignerSpotlight;