"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { homepageFaqs, FaqItem } from "@/content/faqs";

interface FaqSectionProps {
  faqs?: FaqItem[];
  badgeText?: string;
  title?: string;
  subtitle?: string;
}

export function FaqSection({
  faqs = homepageFaqs,
  badgeText = "Frequently Asked Questions",
  title = "Clear Answers to Common Questions",
  subtitle = "Everything you need to understand the methodology, calculation accuracy, and philosophy.",
}: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-24 border-t border-border-subtle">
      <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-brand-primary" />
            <span>{badgeText}</span>
          </div>
          <h2
            id="faq-title"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-3"
          >
            {title}
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
            {subtitle}
          </p>
        </div>

        {/* Accordion List (one open at a time) */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card
                key={index}
                elevation="low"
                className="transition-all duration-200 overflow-hidden border border-border-subtle bg-surface"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 select-none group"
                >
                  <span className="font-display text-lg sm:text-xl font-medium text-ink-primary group-hover:text-brand-primary transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-brand-primary/10 border-brand-primary/30" : "bg-surface-raised"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-colors ${
                        isOpen ? "text-brand-primary" : "text-ink-muted"
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-ink-secondary leading-relaxed border-t border-border-subtle/50 font-sans animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
