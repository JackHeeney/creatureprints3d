"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function SiteFooter(){
  const [message,setMessage]=useState("");
  return <footer className="site-footer">
    <Link className="brand" href="/"><b>CREATURE</b> PRINT 3D <i>cp</i></Link>
    <div className="footer-main">
      <div><h2>Give their world<br/>more character.</h2><Link className="solid-button" href="/products">Explore the collection <ArrowRight size={16}/></Link></div>
      <form className="newsletter" onSubmit={event=>{event.preventDefault();setMessage("Thanks — signup integration comes next.")}}>
        <p>KEEPERS&apos; NOTES</p><h3>New habitats, care ideas and workshop updates.</h3>
        <label htmlFor="global-newsletter-email">Email address</label>
        <div><input id="global-newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required/><button type="submit" aria-label="Join the newsletter"><ArrowRight/></button></div>
        <small aria-live="polite">{message||"Occasional emails. No clutter."}</small>
      </form>
    </div>
    <div className="footer-meta">
      <span>© 2026 CREATURE PRINT 3D</span>
      <nav aria-label="Social media and contact links">
        <a href="https://www.instagram.com/creatureprint3d/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.etsy.com/uk/shop/CreaturePrint3d" target="_blank" rel="noreferrer">Etsy</a>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  </footer>;
}
