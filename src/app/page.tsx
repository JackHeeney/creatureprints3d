import { ScrollWorld } from "@/components/ScrollWorld";

const catalogueSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CreaturePrint3D featured products",
  itemListElement: [
    ["Personalised Feeder Box", "22.99", "/personalised-feeder-box.webp"],
    ["Snake Jungle Gym", "16.99", "/snake-jungle-gym.webp"],
    ["Mushroom Tortoise Hide", "14.99", "/mushroom-tortoise-hide.webp"],
    ["Frog & Gecko Tire Swing", "8.99", "/frog-gecko-tire-swing.webp"],
  ].map(([name, price, image], index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name,
      image,
      brand: { "@type": "Brand", name: "CreaturePrint3D" },
      offers: { "@type": "Offer", price, priceCurrency: "GBP", availability: "https://schema.org/MadeToOrder" },
    },
  })),
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueSchema) }} />
    <ScrollWorld />
  </>;
}
