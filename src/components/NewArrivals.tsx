"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    designer: string;
    price: number;
    image: string;
    category: string;
  }

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (productId: string) => {
    // Implement your add to cart logic here
    console.log(`Added product ${productId} to cart`);
  };

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
              key={product.id}
              className="flex-shrink-0 w-72 snap-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="group relative">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.designer}</p>
                <p className="text-sm font-semibold">€{product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
