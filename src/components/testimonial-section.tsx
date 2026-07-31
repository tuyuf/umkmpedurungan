"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { Button } from "./ui/button";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  avatar: string | null;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const INITIAL_COUNT = 6;

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const hasMany = testimonials.length > INITIAL_COUNT;
  const visibleTestimonials =
    hasMany && !showAll
      ? testimonials.slice(0, INITIAL_COUNT)
      : testimonials;

  if (testimonials.length === 0) return null;

  return (
    <section id="testimoni" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal y={25} className="mb-16 md:mb-20 text-center">
          <h2
            className="font-display font-normal tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.5rem)" }}
          >
            Apa Kata Mereka
          </h2>
        </ScrollReveal>

        {/* Testimonial Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-8 border border-border/50 rounded-[12px] bg-card flex flex-col"
              >
                {/* Quote */}
                <blockquote className="font-sans text-base text-foreground leading-relaxed mb-8 tracking-[-0.01em]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  {testimonial.avatar ? (
                    <Image
                      src={transformCloudinaryUrl(testimonial.avatar, "w_80,q_auto,f_auto")}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                      {testimonial.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-medium text-foreground truncate">
                      {testimonial.author}
                    </p>
                    {testimonial.role && (
                      <p className="font-sans text-xs text-muted-foreground tracking-[0.05em] truncate">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Accordion Toggle */}
        {hasMany && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Tutup"
                : `Lihat ${testimonials.length - INITIAL_COUNT} Testimoni Lainnya`}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
