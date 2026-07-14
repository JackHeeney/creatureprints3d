import type { Metadata } from "next";
import { ProductCatalogue } from "@/components/ProductCatalogue";

export const metadata: Metadata = {
  title: "All Products — Creature Print 3D",
  description: "Browse 3D printed hides, climbing, feeding and habitat accessories for reptiles, amphibians and invertebrates.",
};

export default function ProductsPage(){
  return <ProductCatalogue/>;
}
