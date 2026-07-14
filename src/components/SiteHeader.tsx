"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SiteHeaderProps={
  className?:string;
};

export function SiteHeader({className="product-header"}:SiteHeaderProps){
  const [hidden,setHidden]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const lastScrollY=useRef(0);

  useEffect(()=>{
    lastScrollY.current=window.scrollY;
    let frame=0;

    const updateHeader=()=>{
      const currentScrollY=Math.max(window.scrollY,0);
      const movement=currentScrollY-lastScrollY.current;

      setScrolled(currentScrollY>20);

      if(currentScrollY<=20){
        setHidden(false);
      }else if(Math.abs(movement)>5){
        setHidden(movement>0 && currentScrollY>90);
        lastScrollY.current=currentScrollY;
      }

      frame=0;
    };

    const onScroll=()=>{
      if(!frame) frame=window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>{
      window.removeEventListener("scroll",onScroll);
      if(frame) window.cancelAnimationFrame(frame);
    };
  },[]);

  const headerClassName=[className,"site-header",hidden&&"nav-hidden",scrolled&&"nav-scrolled"].filter(Boolean).join(" ");

  return <header className={headerClassName}>
    <Link className="brand shop-brand" href="/"><b>CREATURE</b> PRINT 3D <i>cp</i></Link>
    <nav aria-label="Main navigation"><Link href="/products">Collection</Link><Link href="/craft">Our craft</Link><Link href="/reviews">Reviews</Link><Link href="/contact">Contact</Link></nav>
    <div className="site-header-actions"><Link className="shop-link" href="/products">Shop now <ArrowRight size={15}/></Link><Link className="mobile-shop" href="/products" aria-label="Browse the product collection"><ShoppingBag size={18}/></Link></div>
  </header>;
}
