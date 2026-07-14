import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact — Creature Print 3D",
  description: "Get in touch with Creature Print 3D about products, custom ideas and habitat accessories.",
};

const featuredProducts = [
  {name:"Personalised Feeder Box",category:"Jumping spider items",price:"£22.99",image:"/personalised-feeder-box.webp",badge:"Personalised",description:"A neat feeding station made personal for your smallest creatures.",href:"/products/personalised-feeder-box"},
  {name:"Snake Jungle Gym",category:"Vivarium decor",price:"£16.99",image:"/snake-jungle-gym.webp",badge:"Keeper favourite",description:"A characterful climber designed to encourage natural exploration.",href:"/products/snake-jungle-gym"},
  {name:"Mushroom Tortoise Hide",category:"Ground dwelling hides",price:"£14.99",image:"/mushroom-tortoise-hide.webp",badge:"Bestseller",description:"A cosy statement hide that brings a little woodland magic indoors.",href:"/products/mushroom-tortoise-hide"},
];

export default function ContactPage(){
  return <main className="contact-page">
    <SiteHeader className="product-header"/>
    <section className="contact-hero">
      <div className="contact-heading">
        <p>CONTACT / SAY HELLO</p>
        <h1>Let&apos;s make their world <span>more interesting.</span></h1>
        <p>Questions about an order, a product or an idea for something custom? Send us a note and we&apos;ll get back to you.</p>
      </div>
      <ContactForm/>
    </section>
    <section className="contact-featured">
      <header className="section-top"><p>FEATURED CREATURE FAVOURITES</p><h2>A few good places<br/>to start exploring.</h2></header>
      <div className="cards">
        {featuredProducts.map(product=><article key={product.name} className="collection-card"><Link href={product.href}>
          <div className="card-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 100vw, 33vw"/><span>{product.badge}</span></div>
          <div className="card-content"><p>{product.category}</p><h3>{product.name}</h3><p className="card-description">{product.description}</p><div className="card-action"><b>View product <ArrowRight size={14}/></b><strong>{product.price}</strong></div></div>
        </Link></article>)}
      </div>
      <Link className="collection-all" href="/products">Explore the full collection <ArrowRight size={15}/></Link>
    </section>
    <SiteFooter/>
  </main>;
}
