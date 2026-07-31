"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import Link from "next/link";
import { Button } from "./ui/button";

const faqs = [
  {
    question: "Bagaimana cara agar UMKM saya muncul di website?",
    answer: (
      <div className="space-y-3">
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          Dengan mengisi form pendaftaran melalui tombol di bawah ini:
        </p>
        <Link href="/formulir">
          <Button variant="outline" size="sm">
            Isi Formulir Pendaftaran
          </Button>
        </Link>
      </div>
    ),
  },
  {
    question: "Apakah ada biaya untuk mendaftarkan UMKM?",
    answer:
      "Tidak, pendaftaran UMKM sepenuhnya gratis tanpa biaya apapun.",
  },
  {
    question: "Berapa lama proses verifikasi setelah mendaftar?",
    answer:
      "Proses verifikasi biasanya memakan waktu 1\u20133 hari kerja setelah data lengkap dikirimkan.",
  },
  {
    question: "Apa saja persyaratan yang dibutuhkan?",
    answer:
      "Usaha yang berlokasi di Pedurungan Tengah.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal y={25} className="mb-12 md:mb-16 text-center">
          <h2
            className="font-display font-normal tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.5rem)" }}
          >
            Pertanyaan Umum
          </h2>
        </ScrollReveal>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-border/50 rounded-[12px] bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                >
                  <span className="font-sans text-sm font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-muted-foreground"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        {typeof faq.answer === "string" ? (
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
