import type { Metadata } from "next";
import { ReviewsStory } from "@/components/ReviewsStory";

export const metadata: Metadata = {
  title: "Reviews — Creature Print 3D",
  description: "Read what keepers say about Creature Print 3D habitat accessories.",
};

export default function ReviewsPage(){
  return <ReviewsStory/>;
}
