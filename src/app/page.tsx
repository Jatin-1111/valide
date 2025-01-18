import DesignerSpotlight from "@/components/HOME/DesignerSpotlight";
import FeaturedCategories from "@/components/HOME/Featured-Categories";
import HeroSection from "@/components/HOME/HeroSection";
import NewArrivals from "@/components/HOME/NewArrivals";
import TrendingProducts from "@/components/HOME/TrendingProducts";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals />
      <DesignerSpotlight />
      <TrendingProducts />
    </div>
  );
}
