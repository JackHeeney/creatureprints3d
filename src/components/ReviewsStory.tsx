import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const reviews=[
  {quote:"The attention to detail is perfect. I cannot recommend this shop enough.",author:"Hope",detail:"Verified Etsy customer",product:"Personalised Feeder Box"},
  {quote:"Beautifully made, thoughtfully packed and designed with the animal in mind.",author:"Sample review",detail:"Replace with verified Etsy export",product:"Creature habitat accessory"},
  {quote:"A characterful addition to the habitat—and an instant favourite.",author:"Sample review",detail:"Replace with verified Etsy export",product:"3D-printed hide"},
  {quote:"The finish feels considered, the size works beautifully and it arrived carefully packed.",author:"Sample review",detail:"Replace with verified Etsy export",product:"Keeper favourite"},
  {quote:"It gives the enclosure more personality without compromising how the animal uses the space.",author:"Sample review",detail:"Replace with verified Etsy export",product:"Habitat enrichment"},
] as const;

export function ReviewsStory(){
  return <main className="reviews-page">
    <SiteHeader className="product-header reviews-header"/>

    <section className="reviews-hero" id="testimonials">
      <div className="reviews-sticky">
        <p>REAL HABITATS · REAL KEEPERS</p>
        <div className="reviews-stars" aria-label="Five out of five stars">{[0,1,2,3,4].map(star=><Star key={star} fill="currentColor"/>)}</div>
        <h1>What<br/><span>they say.</span></h1>
        <p className="reviews-intro">Thousands of pieces have found their way into habitats around the world. Here is what their keepers noticed.</p>
        <dl><div><dt>5.0</dt><dd>Average rating</dd></div><div><dt>2,055+</dt><dd>Etsy reviews</dd></div><div><dt>9,100+</dt><dd>Orders</dd></div></dl>
      </div>

      <div className="testimonial-stream">
        {reviews.map((review,index)=><article key={`${review.author}-${index}`} className="testimonial-card">
          <header><span>{String(index+1).padStart(2,"0")}</span><span>5.0 <Star size={13} fill="currentColor"/></span></header>
          <blockquote>“{review.quote}”</blockquote>
          <div className="testimonial-meta"><div><b>{review.author}</b><span>{review.detail}</span></div><p>{review.product}</p></div>
        </article>)}
        <div className="review-stream-end"><p>THEIR WORLD, MADE MORE PERSONAL.</p><Link href="/products"><span>Find their next favourite place</span><i aria-hidden="true"><ArrowRight/></i></Link></div>
      </div>
    </section>
    <SiteFooter/>
  </main>;
}
