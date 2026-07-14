"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { products as catalogue } from "@/data/products";

const categories = [
  ["All", 306], ["Light Risers", 9], ["Ground Dwelling Hides", 55],
  ["Arboreal Hides & Ledges", 60], ["Misc. Vivarium Decor", 74],
  ["Hats & Accessories", 29], ["Axolotl & Aquatic Decor", 24],
  ["Jumping Spider Items", 7], ["Halloween", 11], ["Christmas", 11],
  ["Equipment", 24], ["Other Pets", 2],
] as const;

type SortOption = "featured" | "price-low" | "price-high" | "name";

export function ProductCatalogue(){
  const [category,setCategory]=useState("All");
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState<SortOption>("featured");
  const [maxPrice,setMaxPrice]=useState(25);
  const [filtersOpen,setFiltersOpen]=useState(false);

  const products=useMemo(()=>{
    const filtered=catalogue.filter((product)=>(category==="All"||product.category===category)&&product.name.toLowerCase().includes(query.toLowerCase())&&product.price<=maxPrice);
    return [...filtered].sort((a,b)=>sort==="price-low"?a.price-b.price:sort==="price-high"?b.price-a.price:sort==="name"?a.name.localeCompare(b.name):0);
  },[category,query,sort,maxPrice]);

  return <main className="shop-page">
    <SiteHeader className="product-header"/>

    <section className="shop-intro">
      <p>THE COMPLETE COLLECTION / 306 PIECES</p>
      <h1>Made for their world.<br/><span>Designed with character.</span></h1>
      <p>Hides, climbing, feeding and habitat accessories created by experienced keepers and printed in the UK.</p>
    </section>

    <section className="catalogue-shell" id="catalogue">
      <button className="mobile-filter-button" type="button" onClick={()=>setFiltersOpen(true)}><SlidersHorizontal size={17}/> Filters</button>
      <aside className={`shop-filters ${filtersOpen?"open":""}`} aria-label="Product filters">
        <header><h2>Filter products</h2><button type="button" onClick={()=>setFiltersOpen(false)} aria-label="Close filters"><X/></button></header>
        <nav aria-label="Product categories">
          {categories.map(([name,count])=><button key={name} type="button" className={category===name?"active":""} onClick={()=>{setCategory(name);setFiltersOpen(false)}}><span>{name}</span><b>{count}</b></button>)}
        </nav>
        <fieldset><legend>Maximum price</legend><div><span>£0</span><output>£{maxPrice}</output></div><input type="range" min="5" max="30" step="1" value={maxPrice} onChange={event=>setMaxPrice(Number(event.target.value))}/></fieldset>
        <button className="clear-filters" type="button" onClick={()=>{setCategory("All");setMaxPrice(30);setQuery("")}}>Clear filters</button>
      </aside>

      <div className="catalogue-content">
        <div className="catalogue-toolbar">
          <label className="catalogue-search"><Search size={18}/><span>Search products</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search all products"/></label>
          <p><b>{products.length}</b> products shown</p>
          <label className="catalogue-sort"><span>Sort by</span><select value={sort} onChange={event=>setSort(event.target.value as SortOption)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label>
        </div>

        {products.length?<div className="product-grid">
          {products.map((product)=><article className="shop-product" id={product.slug} key={product.slug}>
            <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
              <figure><Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"/><span>{product.badge}</span></figure>
              <div><p>{product.category}</p><h2>{product.name}</h2><footer><span>Made to order</span><strong>£{product.price.toFixed(2)}</strong></footer></div>
            </Link>
          </article>)}
        </div>:<div className="catalogue-empty"><h2>No creatures found.</h2><p>Try another category or raise the maximum price.</p><button type="button" onClick={()=>{setCategory("All");setMaxPrice(30);setQuery("")}}>Reset filters</button></div>}
      </div>
    </section>
    <SiteFooter/>
  </main>;
}
