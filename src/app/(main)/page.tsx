import { getProducts } from "@/services/productApi";
import { getCategories } from "@/services/categoryApi";
import type { productType } from "@/types/productType";
import type { CategoryType } from "@/types/categoryType";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth";
import { LandingSection } from "../_components/features/home/landingSection/landing";
import ProductSection from "../_components/features/home/productsSection/productSection";
import Testmonial from '../_components/features/home/testmonial/testmonial';
import CategoriesSection from "../_components/features/home/categoriesSection/CategoriesSection";
import WorkCycleSection from "../_components/features/home/workCycleSection/WorkCycleSection";
import BlogSection from "../_components/features/home/blogSection/BlogSection";
import OrderForm from "../_components/ui/OrderForm/OrderForm";
import VisualsSection from "../_components/features/home/visualsSection/VisualsSection";
import StoreSection from "../_components/features/home/storeSection/storeSection";


export default async function Home() {
  const categories: CategoryType[] = await getCategories();
  const products: productType[] = await getProducts();
  const sessionData = await getServerSession(authOptions);
  return (
    <main>
      <LandingSection categories={categories} />
      <VisualsSection/>
      <StoreSection/>
      <CategoriesSection categories={categories} />
      <ProductSection categories={categories} products={products} />
      <WorkCycleSection/>
      <Testmonial/>
      <BlogSection/>
      <OrderForm/>
    </main>
  );
}




