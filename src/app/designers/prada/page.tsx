"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Grid, Heart, List, Search } from "lucide-react";
import Image from "next/image";

// Types
interface Product {
  _id: string;
  brandName: string;
  productName: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  specification?: string;
  image?: string;
}

const PradaPage = () => {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter for Prada products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://validebackend.onrender.com/api/products/brand/Prada"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => {
      return (
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-playfair text-primary mb-4">
            Error Loading Products
          </h2>
          <p className="text-text-secondary font-lato">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 px-6 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/prada-bg.webp" // Add your Prada background image
            alt="Prada"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="relative w-36 h-36 mx-auto mb-6">
              <Image
                src="/prada-logo.png" // Add your Prada logo
                alt="Prada logo"
                fill
                className="rounded-md bg-white/10 backdrop-blur-sm object-contain"
              />
            </div>
            <h1 className="text-5xl font-playfair tracking-wider mb-4">
              Prada
            </h1>
            <p className="font-lato max-w-2xl mx-auto px-4">
              Founded in 1913, Prada is an Italian luxury fashion house known
              for its innovative design, contemporary style, and timeless
              elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair text-primary text-center mb-8">
            Prada Collection
          </h1>

          {/* Search and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-surface-dark focus:border-accent focus:ring-1 focus:ring-accent bg-white font-lato"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                size={20}
              />
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-surface-dark focus:border-accent focus:ring-1 focus:ring-accent bg-white font-montserrat"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              <div className="flex items-center gap-2 bg-white rounded-full border border-surface-dark">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "grid" ? "bg-accent text-white" : ""
                  }`}
                  aria-label="Grid view"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "list" ? "bg-accent text-white" : ""
                  }`}
                  aria-label="List view"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          } gap-8`}
        >
          {filteredAndSortedProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`group ${
                viewMode === "list" ? "flex items-center gap-6" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-lg bg-surface-dark ${
                  viewMode === "list" ? "w-48 h-48" : "w-full aspect-[3/4]"
                }`}
              >
                <Image
                  src={product.image || "/api/placeholder/300/400"}
                  alt={product.productName}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  aria-label="Add to favorites"
                >
                  <Heart size={16} />
                </button>
              </div>

              <div className={`mt-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <p className="font-montserrat text-sm text-text-secondary mb-1">
                  {product.brandName}
                </p>
                <h3 className="font-playfair text-lg tracking-wider text-primary">
                  {product.productName}
                </h3>
                <p className="font-lato text-sm text-text-secondary mt-1">
                  {product.category}
                </p>
                <p className="font-montserrat font-medium text-lg mt-2">
                  ${product.price.toLocaleString()}
                </p>
                {viewMode === "list" && (
                  <p className="font-lato text-text-secondary mt-2 line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="font-playfair text-xl text-primary mb-2">
              No Products Found
            </h3>
            <p className="font-lato text-text-secondary">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PradaPage;
