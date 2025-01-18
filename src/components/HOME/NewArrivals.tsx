"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
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

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://validebackend.onrender.com/api/products/new-arrivals"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      // Add success notification here
    } catch (err) {
      console.error("Error adding to cart:", err);
      // Add error notification here
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-72 snap-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="group relative">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface-dark">
                  <Image
                    src={product.images[0] || "/api/placeholder/300/400"}
                    alt={product.productName}
                    width={300}
                    height={400}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                {product.stock > 0 ? (
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-500">{product.brandName}</p>
                <p className="text-sm text-gray-500">
                  {product.category} • {product.gender}
                </p>
                <p className="text-sm font-semibold">
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/new-arrivals" className="mt-8 flex justify-center">
          <div className="font-montserrat group flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary text-base sm:text-lg font-semibold rounded-lg hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  );
}
