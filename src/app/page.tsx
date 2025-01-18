import DesignerSpotlight from "@/components/HOME/DesignerSpotlight";
import FeaturedCategories from "@/components/HOME/Featured-Categories";
import HeroSection from "@/components/HOME/HeroSection";
import NewArrivals from "@/components/HOME/NewArrivals";
import TrendingProducts from "@/components/HOME/TrendingProducts";
// import Image from "next/image";

interface Product {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const exampleProducts: Product[] = [
    {
      id: "1",
      name: "Leather Shoulder Bag",
      designer: "Prada",
      price: 2500,
      image: "/products/prada-bag.png",
      category: "Bags",
    },
    {
      id: "2",
      name: "Polarized Hudson Sunglasses",
      designer: "Tom Ford",
      price: 495,
      image: "/products/tomford-sunglasses.png",
      category: "Accessories",
    },
    {
      id: "3",
      name: "Classic Chronograph Watch",
      designer: "Cartier",
      price: 12500,
      image: "/products/cartier-watch.png",
      category: "Watches",
    },
    {
      id: "4",
      name: "Leather Loafers",
      designer: "Louis Vuitton",
      price: 1200,
      image: "/products/lv-loafers.png",
      category: "Shoes",
    },
    {
      id: "5",
      name: "Diamond Pendant Necklace",
      designer: "Tiffany & Co.",
      price: 8900,
      image: "/products/tiffany-necklace.png",
      category: "Jewelry",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals products={exampleProducts} />
      <DesignerSpotlight />
      <TrendingProducts />
    </div>
  );
}
