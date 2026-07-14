"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, PackageCheck, Recycle, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const steps=[
  {number:"01",label:"Keeper knowledge comes first",body:"More than a decade of keeping and breeding reptiles, amphibians and invertebrates shapes every opening, curve and surface.",image:"/craft-process-keeper.png",alt:"A keeper observes a crested gecko while sketching a habitat accessory"},
  {number:"02",label:"Designed around real behaviour",body:"Each idea begins with how an animal rests, hides, climbs, feeds or explores—not simply how the object will look on a shelf.",image:"/craft-process-design.png",alt:"A maker compares 3D-printed climbing prototypes beside a working printer"},
  {number:"03",label:"Tested in their own habitats",body:"The brothers use their own products with their own animals, refining the details before a design joins the collection.",image:"/craft-process-testing.png",alt:"A gecko naturally tests a 3D-printed hide inside a planted habitat"},
] as const;

export function CraftStory(){
  const story=useRef<HTMLElement>(null);
  const activeRef=useRef(0);
  const [active,setActive]=useState(0);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      const element=story.current;
      if(element){
        const rect=element.getBoundingClientRect();
        const distance=Math.max(1,element.offsetHeight-window.innerHeight);
        const progress=Math.min(1,Math.max(0,-rect.top/distance));
        const next=Math.min(steps.length-1,Math.floor(progress*steps.length));
        element.style.setProperty("--craft-progress",String(progress));
        if(next!==activeRef.current){activeRef.current=next;setActive(next)}
      }
      frame=requestAnimationFrame(update);
    };
    frame=requestAnimationFrame(update);
    return()=>cancelAnimationFrame(frame);
  },[]);

  return <main className="craft-page">
    <SiteHeader className="product-header craft-header"/>

    <section className="craft-hero">
      <div className="craft-hero-image"><Image src="/craft-workshop-hero.png" alt="A keeper finishing a 3D-printed hide beside a planted crested gecko habitat" fill priority sizes="100vw"/><div/></div>
      <p>OUR CRAFT / TWO BROTHERS · ONE SHARED OBSESSION</p>
      <h1>Made by keepers.<br/><span>For creatures.</span></h1>
      <div className="craft-hero-bottom"><p>Animal care, photography and 3D design come together in a small UK workshop—with every product tested in a real habitat.</p><a className="craft-scroll-cue down-arrow-trigger" href="#about"><span className="down-arrow-loop" aria-hidden="true"><ArrowDown/><ArrowDown/></span><span>Scroll to explore</span></a></div>
    </section>

    <section className="craft-about" id="about">
      <p>WHY CREATURE PRINT 3D?</p><h2>Understanding their world changes what you make for it.</h2>
      <div className="craft-about-copy"><p>Creature Print 3D was built by two brothers who combined their experience in animal care, marketing, photography and 3D design.</p><p>They create functional, characterful accessories for reptiles, amphibians, invertebrates and other small animals—pieces intended to enrich a habitat, not merely decorate it.</p></div>
      <div className="craft-pillars">{[
        ["Keeper led","Designed from more than ten years of hands-on animal care"],
        ["Habitat tested","Used with their own animals before reaching the shop"],
        ["Made with care","Printed and finished in their small UK workshop"],
      ].map(([title,text])=><article key={title}><Check/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>

    <section ref={story} className="craft-scroll" id="process">
      <div className="craft-scroll-stage">
        <div className="craft-step-copy" aria-live="polite"><span>{steps[active].number}</span><p>OUR PROCESS</p><h2>{steps[active].label}</h2><p>{steps[active].body}</p><div>{steps.map((step,index)=><i key={step.number} className={index===active?"active":""}/>)}</div></div>
        <div className="craft-step-images">{steps.map((step,index)=><figure key={step.number} className={index===active?"active":""} aria-hidden={index!==active}><Image src={step.image} alt={step.alt} fill sizes="(max-width: 800px) 100vw, 54vw"/></figure>)}</div>
      </div>
    </section>

    <section className="craft-banner">
      <p>WHAT GUIDES US</p><h2>Care is not<br/>a finishing touch.</h2><p>It is the brief.</p>
      <div>{[
        {Icon:ShieldCheck,title:"Safe forms",text:"Openings, surfaces and proportions considered for real inhabitants"},
        {Icon:PackageCheck,title:"Useful by design",text:"Every detail exists to support hiding, climbing, feeding or enrichment"},
        {Icon:Check,title:"Made personally",text:"Small-batch production with room for names, colours and character"},
      ].map(({Icon,title,text})=><article key={title}><Icon/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>

    <section className="craft-packaging" id="packaging">
      <header><p>FROM OUR WORKSHOP TO YOUR HABITAT / 04</p><h2>Thoughtfully made.<br/><span>Carefully sent.</span></h2></header>
      <div className="packaging-visual"><div className="package-box"><span>CREATURE<br/>PRINT 3D</span><i>CP</i></div><aside><Recycle/><h3>Right-sized packaging</h3><p>Orders are packed securely and efficiently, with protective materials chosen around the product and its journey.</p></aside></div>
      <dl><div><dt>Production</dt><dd>Made to order and stocked pieces</dd></div><div><dt>Dispatch</dt><dd>Within 10 working days</dd></div><div><dt>Destination</dt><dd>International delivery, with EU orders temporarily paused</dd></div></dl>
    </section>

    <section className="craft-cta"><p>READY FOR THEIR NEXT FAVOURITE PLACE?</p><h2>Give their world<br/>more character.</h2><Link href="/products">Explore the collection <ArrowRight/></Link></section>
    <SiteFooter/>
  </main>
}
