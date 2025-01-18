"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  brandName: string;
  productName: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  stock: number;
  specification?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState("all");

  const categories = [
    "All",
    "Clothing",
    "Shoes",
    "Bags",
    "Accessories",
    "Watches",
    "Jewelry",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFilterLoading(true);
      try {
        const response = await fetch(
          `https://validebackend.onrender.com/api/products/new-arrivals${
            currentFilter !== "all" ? `?category=${currentFilter}` : ""
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsFilterLoading(false);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentFilter]);

  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return "/api/placeholder/300/400";
    return imageUrl.startsWith("http") ? imageUrl : `/${imageUrl}`;
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await fetch(
        "https://validebackend.onrender.com/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const getFilteredProducts = () => {
    if (currentFilter === "all") {
      return products;
    }
    return products.filter(
      (product) =>
        product.category.toLowerCase() === currentFilter.toLowerCase()
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-state-error">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <div className="bg-surface-dark py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-primary mb-6">
              New Arrivals
            </h1>
            <p className="font-lato text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Discover our latest collection of luxury pieces, curated for the
              discerning individual
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-surface py-8 border-b border-surface-dark">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCurrentFilter(category.toLowerCase())}
                className={`font-montserrat text-sm uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-300
                  ${
                    currentFilter === category.toLowerCase()
                      ? "bg-accent text-white"
                      : "text-text-secondary hover:text-primary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 md:py-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isFilterLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getFilteredProducts().length > 0 ? (
                getFilteredProducts().map((product) => (
                  <div key={product._id} className="group">
                    <Link href={`/products/${product._id}`}>
                      <div className="relative">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface-dark">
                          <Image
                            src={getImageUrl(product.images[0])}
                            alt={product.productName}
                            width={400}
                            height={533}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            unoptimized={!product.images[0]}
                          />
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          {product.stock > 0 && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product._id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 rounded-full bg-white shadow-lg hover:bg-surface hover:shadow-xl"
                              aria-label="Add to cart"
                            >
                              <ShoppingCart className="w-5 h-5 text-primary" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // Add wishlist functionality
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 rounded-full bg-white shadow-lg hover:bg-surface hover:shadow-xl"
                            aria-label="Add to wishlist"
                          >
                            <Heart className="w-5 h-5 text-primary" />
                          </button>
                        </div>
                        {product.stock === 0 && (
                          <div className="absolute top-4 left-4 bg-state-error text-white px-3 py-1.5 rounded-full text-sm font-montserrat">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      <div className="mt-6 space-y-2">
                        <p className="font-montserrat text-xs text-text-secondary uppercase tracking-wider">
                          {product.brandName}
                        </p>
                        <h2 className="font-playfair text-lg text-primary">
                          {product.productName}
                        </h2>
                        <div className="flex justify-between items-center">
                          <p className="font-montserrat text-lg font-medium text-primary">
                            €{product.price.toFixed(2)}
                          </p>
                          <p className="font-lato text-sm text-text-secondary">
                            {product.category} • {product.gender}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-text-secondary text-lg">
                    No products found in the {currentFilter} category.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
