"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

export function ProductDetail({ product }: { product: Product }){
  const gallery = [
    { src: product.image, alt: product.name },
    { src: product.image, alt: `Close view of ${product.name}` },
    { src: "/products-grid-3.png", alt: "Creature Print 3D accessories collection" },
  ];
  const related = products.filter((item)=>item.slug!==product.slug).slice(0,3);
  const [activeImage,setActiveImage]=useState(0);
  const [quantity,setQuantity]=useState(1);
  const [name,setName]=useState("");
  const [colour,setColour]=useState("Forest black");
  const [added,setAdded]=useState(false);
  const [galleryCycle,setGalleryCycle]=useState(0);

  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      setActiveImage(current=>(current+1)%gallery.length);
      setGalleryCycle(current=>current+1);
    },8000);
    return()=>window.clearTimeout(timer);
  },[activeImage,galleryCycle,gallery.length]);

  const selectImage=(index:number)=>{
    setActiveImage(index);
    setGalleryCycle(current=>current+1);
  };

  return <main className="product-page">
    <SiteHeader/>

    <nav className="product-breadcrumb" aria-label="Breadcrumb">
      <Link href="/products"><ArrowLeft size={15}/> All products</Link><span>/</span><span>{product.category}</span>
    </nav>

    <section className="product-hero" aria-labelledby="product-title">
      <div className="product-gallery">
        <figure className="product-main-image">
          <Image key={`${activeImage}-${galleryCycle}`} className="gallery-main-media" src={gallery[activeImage].src} alt={gallery[activeImage].alt} fill priority sizes="(max-width: 900px) 100vw, 58vw"/>
          <figcaption className="product-gallery-controls">
            <div className="product-thumbnails" aria-label="Choose product image">
              {gallery.map((image,index)=><button key={`${image.src}-${index}`} type="button" className={activeImage===index?"active":""} onClick={()=>selectImage(index)} aria-label={`Show product image ${index+1}`} aria-pressed={activeImage===index}>
                <Image src={image.src} alt="" fill sizes="90px"/>
                {activeImage===index&&<svg key={`timer-${activeImage}-${galleryCycle}`} className="thumbnail-timer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className="thumbnail-timer-track" d="M2 16 Q2 2 16 2 H84 Q98 2 98 16 V84 Q98 98 84 98 H16 Q2 98 2 84 Z"/>
                  <path className="thumbnail-timer-progress" d="M2 16 Q2 2 16 2 H84 Q98 2 98 16 V84 Q98 98 84 98 H16 Q2 98 2 84 Z"/>
                </svg>}
              </button>)}
            </div>
            <span>{String(activeImage+1).padStart(2,"0")} / {String(gallery.length).padStart(2,"0")}</span>
          </figcaption>
        </figure>
      </div>

      <div className="product-purchase">
        <p className="product-eyebrow">{product.badge.toUpperCase()} / MADE TO ORDER</p>
        <h1 id="product-title">{product.name}</h1>
        <div className="product-rating"><span aria-label="5 out of 5 stars">{[0,1,2,3,4].map(star=><Star key={star} size={15} fill="currentColor"/>)}</span><a href="#product-reviews">5.0 · 286 reviews</a></div>
        <p className="product-price">£{product.price.toFixed(2)}</p>
        <p className="product-lead">{product.description}</p>

        <form onSubmit={event=>{event.preventDefault();setAdded(true)}}>
          {product.personalised&&<label className="product-field"><span>Creature&apos;s name <small>Up to 12 characters</small></span><input required maxLength={12} value={name} onChange={event=>setName(event.target.value)} placeholder="e.g. Boo"/></label>}
          <fieldset className="colour-options"><legend>Colour <b>{colour}</b></legend><div>{["Forest black","Stone white","Moss green"].map((option,index)=><button key={option} type="button" className={colour===option?"active":""} onClick={()=>setColour(option)} aria-label={`Choose ${option}`} aria-pressed={colour===option}><i data-colour={index}/></button>)}</div></fieldset>
          <div className="buy-row"><div className="quantity"><button type="button" onClick={()=>setQuantity(Math.max(1,quantity-1))} aria-label="Decrease quantity"><Minus size={16}/></button><output aria-label="Quantity">{quantity}</output><button type="button" onClick={()=>setQuantity(quantity+1)} aria-label="Increase quantity"><Plus size={16}/></button></div><button className="add-button" type="submit"><span>{added?"Added to bag":"Add to bag"}</span>{added?<Check size={18}/>:<ArrowRight size={18}/>}</button></div>
        </form>

        <ul className="product-assurances">
          <li><Truck/><span><b>Made and dispatched in the UK</b>Allow up to 10 working days</span></li>
          <li><ShieldCheck/><span><b>Keeper tested</b>Designed around real habitat use</span></li>
          <li><RotateCcw/><span><b>International delivery</b>EU ordering currently paused</span></li>
        </ul>
      </div>
    </section>

    <section className="product-story">
      <p>DESIGNED AROUND THE CREATURE / 01</p><h2>Small detail.<br/><span>Proper personality.</span></h2>
      <div><p>{product.description}</p><dl><div><dt>Best for</dt><dd>{product.bestFor}</dd></div><div><dt>Made from</dt><dd>Durable 3D-printed material</dd></div><div><dt>{product.personalised?"Personalisation":"Production"}</dt><dd>{product.personalised?"One name, up to 12 characters":"Made to order in the UK"}</dd></div></dl></div>
    </section>

    <section className="product-review" id="product-reviews"><p>VERIFIED ETSY CUSTOMER</p><blockquote>“The attention to detail is perfect. I cannot recommend this shop enough.”</blockquote><span>HOPE · 5/5</span></section>

    <section className="related-products"><header><p>YOU MAY ALSO LIKE</p><h2>More ways to enrich their world.</h2></header><div>{related.map((item)=><article key={item.slug}><Link href={`/products/${item.slug}`}><figure><Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 100vw, 33vw"/></figure><div><h3>{item.name}</h3><b>£{item.price.toFixed(2)}</b><ArrowRight/></div></Link></article>)}</div></section>

    <SiteFooter/>
  </main>
}
