"use client";
import { AboutSection } from "./(section-page)/about-section";
import BookingSection from "./(section-page)/booking-section";
import { HeroSection } from "./(section-page)/hero-section";
import ServicesSection from "./(section-page)/services-section";
import ContactSection from "./(section-page)/contact-section";
import WhereSection from "./(section-page)/where-section";
import AvisSection from "./(section-page)/avis-section";
export default function Home() {


  return (
    <>
      <HeroSection className=""/>
      <ServicesSection className=" mt-44" />
      <AboutSection className="max-w-6xl mx-auto lg:my-44 my-12 px-4" />
      <BookingSection className="px-4" />
      <WhereSection className="px-4" />
      <AvisSection className="px-4 bg-black/10 dark:bg-white/10" />
      <ContactSection className="px-4 " />
    </>
  );
}



