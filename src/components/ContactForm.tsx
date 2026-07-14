"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactForm(){
  const [message,setMessage]=useState("");

  function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setMessage("Thanks — your message is ready to send once the contact integration is connected.");
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-name-row">
      <label><span>First name</span><input name="firstName" type="text" autoComplete="given-name" required/></label>
      <label><span>Last name</span><input name="lastName" type="text" autoComplete="family-name" required/></label>
    </div>
    <label><span>Email address</span><input name="email" type="email" autoComplete="email" required/></label>
    <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel"/></label>
    <label><span>Message</span><textarea name="message" rows={7} required/></label>
    <div className="contact-submit-row">
      <button type="submit">Send message <ArrowRight size={17}/></button>
      <p aria-live="polite">{message}</p>
    </div>
  </form>;
}
