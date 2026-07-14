"use client";

import { ArrowDown, ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProduct } from "@/data/products";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const chapters=[
  {k:"00",title:<>Tiny worlds.<br/>Made extraordinary.</>,body:"Characterful habitats and enrichment for reptiles, amphibians and invertebrates.",align:"left"},
  {k:"01",label:"A decade inside their world",title:<>Designed by keepers.<br/>Made for creatures.</>,body:"More than ten years of keeping and breeding reptiles, amphibians and invertebrates informs every opening, curve and surface.",align:"right"},
  {k:"02",label:"Two brothers · one shared craft",title:<>Animal care meets<br/>3D design.</>,body:"Care, photography, design and making come together in a small UK workshop with a very personal point of view.",align:"left"},
  {k:"03",label:"Tried in real habitats",title:<>Their own pets<br/>test it first.</>,body:"Products are used with the brothers’ own animals before reaching the shop—because safety and enrichment are never decorative details.",align:"right"},
  {k:"04",label:"Proven in real habitats",title:<>9,100+ orders.<br/>5.0 from 2,000+ reviews.</>,body:"Loved by keepers and their creatures across the world.",align:"left"},
  {k:"05",label:"Meet the collection",title:<>Find their next<br/>favourite place.</>,body:"Discover hides, climbing, feeding and habitat accessories made differently.",align:"center"},
];

const products = [
  { name: "Personalised Feeder Box", price: "£22.99", src: "/personalised-feeder-box.webp", category: "FEEDING", description: "A practical insect feeding station, personalised for the creature that calls the enclosure home.", step: 1, side: "left", position: "high" },
  { name: "Snake Jungle Gym", price: "£16.99", src: "/snake-jungle-gym.webp", category: "CLIMBING", description: "Open, curved geometry creates new routes for climbing, resting and exploring.", step: 2, side: "right", position: "low" },
  { name: "Mushroom Tortoise Hide", price: "£14.99", src: "/mushroom-tortoise-hide.webp", category: "HIDES", description: "A secure retreat for tortoises and small reptiles, with unmistakable character.", step: 3, side: "left", position: "low" },
  { name: "Frog & Gecko Tire Swing", price: "£8.99", src: "/frog-gecko-tire-swing.webp", category: "ENRICHMENT", description: "A playful hanging perch that brings movement and variety into vertical habitats.", step: 4, side: "right", position: "high" },
] as const;

const productHref=(name:string)=>{
  const product=getProductByName(name);
  return product?`/products/${product.slug}`:"/products";
};

const getProductByName=(name:string)=>getProduct(
  name.toLowerCase().replaceAll(" & ", "-and-").replaceAll(" ", "-")
);

const parallaxScenes = [
  { eyebrow: "Creature favourite / 01", title: <>A little shelter.<br/><span>A lot of character.</span></>, body: "Our mushroom hide gives tortoises and small reptiles a secure retreat without disappearing into the scenery.", product: "Mushroom Tortoise Hide", price: "£14.99", src: "/parallax-tortoise-shelter.png", productImage: "/mushroom-tortoise-hide.webp", stat: "POPULAR HIDE" },
  { eyebrow: "Enrichment in motion / 02", title: <>Made to climb.<br/><span>Built to explore.</span></>, body: "Curved, open geometry creates new routes through the habitat while keeping animals visible and easy to observe.", product: "Snake Jungle Gym", price: "£16.99", src: "/parallax-snake-exploration.png", productImage: "/snake-jungle-gym.webp", stat: "KEEPER FAVOURITE" },
  { eyebrow: "Made personal / 03", title: <>Every habitat<br/><span>has a name.</span></>, body: "A practical feeding station, printed to order and personalised for the creature that calls the enclosure home.", product: "Personalised Feeder Box", price: "£22.99", src: "/parallax-gecko-care.png", productImage: "/personalised-feeder-box.webp", stat: "PERSONALISED" },
] as const;

function ParallaxShowcase(){
  const section=useRef<HTMLElement>(null);
  const activeScene=useRef(0);
  const [scene,setScene]=useState(0);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      const element=section.current;
      if(element){
        const rect=element.getBoundingClientRect();
        const travel=Math.max(1,element.offsetHeight-window.innerHeight);
        const p=clamp(-rect.top/travel);
        element.style.setProperty("--parallax",String(p));
        const nextScene=Math.min(parallaxScenes.length-1,Math.floor(p*parallaxScenes.length));
        if(nextScene!==activeScene.current){activeScene.current=nextScene;setScene(nextScene)}
      }
      frame=requestAnimationFrame(update);
    };
    frame=requestAnimationFrame(update);
    return()=>cancelAnimationFrame(frame);
  },[]);
  return <section ref={section} className="parallax-showcase" id="craft">
    <div className="parallax-stage">
      <div className="parallax-kicker">PRINTED WITH PURPOSE / 02</div>
      {parallaxScenes.map((item,index)=><article key={item.product} className={`parallax-scene ${scene===index?"active":""}`} aria-hidden={scene!==index}>
        <div className="parallax-image" style={{"--scene-index":index} as React.CSSProperties}>
          <Image src={item.src} alt={item.product} fill sizes="100vw" />
          <div className="parallax-shade"/>
        </div>
        <div className="parallax-copy">
          <p>{item.eyebrow}</p><h2>{item.title}</h2><p className="parallax-body">{item.body}</p>
        </div>
        <Link className="parallax-product-preview" href={productHref(item.product)} aria-label={`View ${item.product}`}>
          <Image src={item.productImage} alt={item.product} fill sizes="(max-width: 800px) 48vw, 280px" />
        </Link>
        <Link className="parallax-product" href={productHref(item.product)}><small>{item.stat}</small><b>{item.product}</b><span>{item.price} <ArrowRight size={15}/></span></Link>
      </article>)}
      <div className="parallax-rail">{parallaxScenes.map((item,index)=><i key={item.product} className={scene===index?"active":""}/>)}</div>
    </div>
  </section>;
}

const reviews = [
  { quote: "The attention to detail is perfect. I cannot recommend this shop enough.", author: "Hope", label: "Verified Etsy customer" },
  { quote: "Beautifully made, thoughtfully packed and designed with the animal in mind.", author: "MVP sample", label: "Replace with exported Etsy review" },
  { quote: "A characterful addition to the habitat—and an instant favourite.", author: "MVP sample", label: "Replace with exported Etsy review" },
] as const;

function ReviewCarousel(){
  const [current,setCurrent]=useState(0);
  const move=(direction:number)=>{
    setCurrent(value=>(value+direction+reviews.length)%reviews.length);
  };
  const review=reviews[current];
  return <section className="review-band" id="reviews" aria-label="Customer reviews">
    <header className="review-top"><div className="rating"><Star fill="currentColor"/> 5.0 / 2,055 reviews</div><span>{String(current+1).padStart(2,"0")} / {String(reviews.length).padStart(2,"0")}</span></header>
    <div className="review-slide" aria-live="polite"><blockquote>“{review.quote}”</blockquote><p>{review.author} — {review.label}</p></div>
    <nav className="review-controls" aria-label="Review carousel controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous review"><ArrowLeft/></button><button type="button" onClick={()=>move(1)} aria-label="Next review"><ArrowRight/></button></nav>
  </section>;
}

export function ScrollWorld(){
  const story=useRef<HTMLDivElement>(null);
  const progressBar=useRef<HTMLElement>(null);
  const activeChapter=useRef(0);
  const [active,setActive]=useState(0);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      if(!story.current)return;
      const rect=story.current.getBoundingClientRect();
      const max=story.current.offsetHeight-window.innerHeight;
      const p=clamp(-rect.top/max);
      story.current.style.setProperty("--story-progress",String(p));
      if(progressBar.current)progressBar.current.style.transform=`scaleX(${p})`;
      const nextActive=Math.min(chapters.length-1,Math.floor(p*chapters.length+.18));
      if(nextActive!==activeChapter.current){activeChapter.current=nextActive;setActive(nextActive)}
      frame=requestAnimationFrame(update);
    }; frame=requestAnimationFrame(update);return()=>cancelAnimationFrame(frame);
  },[]);
  return <main id="top" className="experience">
    <a className="skip-link" href="#collection">Skip to products</a>
    <div ref={story} className="scroll-story">
      <div className="stage">
        <figure className="living-habitat" aria-hidden="true">
          <Image src="/living-habitat-hero.png" alt="" fill priority sizes="100vw" />
        </figure>
        <div className="grain"/>
        <SiteHeader className="story-nav"/>
        <div className="chapter-count">{String(active+1).padStart(2,"0")} / 06</div>
        <div className="progress" aria-hidden="true"><i ref={progressBar}/></div>
        {chapters.map((chapter,i)=><section key={chapter.k} className={`chapter ${chapter.align} ${active===i?"active":""}`} aria-hidden={active!==i}>
          <div><p className="chapter-label">{chapter.label||"3D printed habitats · Made in the UK"}</p>{i===0?<h1>{chapter.title}</h1>:<h2>{chapter.title}</h2>}<p className="chapter-body">{chapter.body}</p>{i===0&&<a className="outline-button" href="#collection">Explore habitats <ArrowRight size={16}/></a>}{i===5&&<Link className="solid-button" href="/products">Shop creature favourites <ArrowRight size={16}/></Link>}</div>
        </section>)}
        <div className="hero-products" aria-live="polite">
          {products.map((product, index) => <Link
            key={product.name}
            href={productHref(product.name)}
            className={`hero-product ${product.side} ${product.position} ${active === product.step ? "visible" : ""}`}
            aria-hidden={active !== product.step}
            tabIndex={active === product.step ? 0 : -1}
            style={{ "--float-delay": `${index * -.7}s` } as React.CSSProperties}
          >
            <span className="hero-product-image"><Image src={product.src} alt={product.name} fill sizes="(max-width: 800px) 120px, 180px" /></span>
            <span className="hero-product-meta"><b>{product.name}</b><i>{product.price}</i></span>
          </Link>)}
        </div>
        <a className="scroll-cue down-arrow-trigger" href="#collection"><span className="down-arrow-loop" aria-hidden="true"><ArrowDown size={14}/><ArrowDown size={14}/></span><span>Scroll to explore</span></a>
      </div>
    </div>

    <section className="after-story" id="collection"><header className="section-top"><p>CREATURE FAVOURITES / 01</p><h2>Unexpected homes<br/>for extraordinary creatures.</h2></header>
      <div className="cards">
        {products.map(product=><article key={product.name} className="collection-card">
          <Link href={productHref(product.name)} aria-label={`View ${product.name}`}>
            <div className="card-image"><Image src={product.src} alt={product.name} fill sizes="(max-width: 800px) 100vw, 25vw" /><span>{product.category}</span></div>
            <div className="card-content"><p>MADE TO ORDER</p><h3>{product.name}</h3><p className="card-description">{product.description}</p><div className="card-action"><b>VIEW PRODUCT <ArrowRight size={14}/></b><strong>{product.price}</strong></div></div>
          </Link>
        </article>)}
      </div><Link className="collection-all" href="/products">View all products <ArrowRight size={16}/></Link>
    </section>
    <ParallaxShowcase/>
    <ReviewCarousel/>
    <SiteFooter/>
  </main>;
}
