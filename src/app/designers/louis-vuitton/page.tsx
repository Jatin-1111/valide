"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Heart, List } from "lucide-react";
import Image from "next/image";

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
// }

const BrandPage = ({ params }: { params: { brandId: string } }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  // This would come from your API
  const brandData = {
    id: params.brandId,
    name: "Louis Vuitton",
    description:
      "Founded in 1854, Louis Vuitton is a French luxury fashion house and luxury goods company.",
    backgroundImage: "/api/placeholder/1200/400",
    logo: "/api/placeholder/200/200",
    categories: [
      "All",
      "Bags",
      "Shoes",
      "Ready-to-Wear",
      "Accessories",
      "Jewelry",
    ],
    products: [
      {
        id: "1",
        name: "Monogram Canvas Bag",
        category: "Bags",
        price: 2990,
        image: "/api/placeholder/300/400",
      },
      // Add more products...
    ],
  };

  const filteredProducts = brandData.products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <main className="min-h-screen font-playfair">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <Image
            src={brandData.backgroundImage}
            alt={brandData.name}
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Image
              src={brandData.logo}
              alt={`${brandData.name} logo`}
              fill
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm"
            />
            <h1 className="text-5xl font-playfair tracking-wider mb-4">
              {brandData.name}
            </h1>
            <p className="font-lato max-w-2xl mx-auto px-4">
              {brandData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {brandData.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors font-montserrat ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-surface-dark hover:bg-accent/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-dark px-4 py-2 rounded-md font-montserrat text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <div className="flex items-center gap-2 bg-surface-dark rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "text-accent" : ""}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "text-accent" : ""}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } gap-8`}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`group ${
                viewMode === "list" ? "flex items-center gap-6" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-lg bg-surface-dark ${
                  viewMode === "list" ? "w-48" : "w-full"
                }`}
              >
                <div className={viewMode === "list" ? "" : "aspect-[3/4]"}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Heart size={16} />
                </button>
              </div>

              <div className={`mt-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <h3 className="font-playfair text-lg tracking-wider">
                  {product.name}
                </h3>
                <p className="font-montserrat text-sm text-primary/70">
                  {product.category}
                </p>
                <p className="font-lato mt-2">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BrandPage;
