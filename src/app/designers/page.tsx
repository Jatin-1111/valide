"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Designer {
  id: string;
  name: string;
  category: string;
  image: string;
  featured: boolean;
}

const DesignersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const designers: Designer[] = [
    {
      id: "louis-vuitton",
      name: "Louis Vuitton",
      category: "Luxury",
      image: "/lv-logo.png",
      featured: true,
    },
    {
      id: "tiffany",
      name: "Tiffany & Co.",
      category: "Jewelry",
      image: "/tiffany-logo.png",
      featured: true,
    },
    {
      id: "cartier",
      name: "Cartier",
      category: "Jewelry",
      image: "/cartier-logo.png",
      featured: true,
    },
    {
      id: "prada",
      name: "Prada",
      category: "Luxury",
      image: "/prada-logo.png",
      featured: true,
    },
    {
      id: "tom-ford",
      name: "Tom Ford",
      category: "Luxury",
      image: "/tomford-logo.png",
      featured: true,
    },
  ];

  const categories = ["All", "Luxury", "Jewelry", "Fashion", "Accessories"];

  const filteredDesigners = designers.filter((designer) => {
    const matchesSearch = designer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || designer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-playfair">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="space-y-1 mb-6">
          <div className="h-px bg-accent w-32 mx-auto" />
          <h1 className="text-4xl font-playfair tracking-wider">
            Designer Brands
          </h1>
          <div className="h-px bg-accent w-32 mx-auto" />
        </div>
        <p className="font-lato text-primary/70 max-w-2xl mx-auto font-light">
          Discover our curated selection of the world&apos;s most prestigious luxury brands,
          featuring exclusive collections and timeless pieces.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50" />
          <input
            type="text"
            placeholder="Search designers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary rounded-md bg-surface-dark focus:outline-none focus:ring-1 focus:ring-accent font-lato"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors font-montserrat ${
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "bg-surface-dark hover:bg-accent/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Designers Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredDesigners.map((designer) => (
          <motion.div
            key={designer.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link href={`/designers/${designer.id}`}>
              <div className="relative overflow-hidden rounded-lg bg-surface-dark">
                <div className="aspect-[3/2]">
                  <Image
                    src={designer.image}
                    alt={designer.name}
                    fill
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-playfair text-lg tracking-wider">
                    {designer.name}
                  </h3>
                  <p className="font-montserrat text-sm opacity-80">
                    {designer.category}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredDesigners.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-primary/50 font-lato"
        >
          No designers found matching your search criteria.
        </motion.div>
      )}
    </main>
  );
};

export default DesignersPage;