import type { Metadata } from "next";
import { CraftStory } from "@/components/CraftStory";

export const metadata: Metadata = {
  title: "Our Craft — Creature Print 3D",
  description: "Meet the keepers behind Creature Print 3D and discover how their habitat accessories are designed, tested, printed and packed.",
};

export default function CraftPage(){
  return <CraftStory/>;
}
