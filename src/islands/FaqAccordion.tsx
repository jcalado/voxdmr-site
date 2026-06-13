import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { getT, type Lang } from "@/src/i18n/t";

interface FaqAccordionProps {
  lang: Lang;
}

/**
 * FAQ accordion. Owns the open-set state, chevron rotation, and the
 * AnimatePresence height/opacity collapse. Respects prefers-reduced-motion.
 */
export default function FaqAccordion({ lang }: FaqAccordionProps) {
  const t = getT(lang);
  const prefersReducedMotion = useReducedMotion();

  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const toggleFaq = (n: number) =>
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });

  const faqOpenTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.34, ease: [0.16, 1, 0.3, 1] as const };
  const faqCloseTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.24, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="border-y border-border">
      {[1, 2, 3, 4, 5].map((n, i) => {
        const isOpen = openFaqs.has(n);
        return (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={i > 0 ? "border-t border-border" : ""}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggleFaq(n)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${n}`}
                id={`faq-question-${n}`}
                className="group w-full flex items-center justify-between gap-6 py-6 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-red focus-visible:rounded-md"
              >
                <span className={`font-headline font-semibold text-lg lg:text-xl tracking-tight transition-colors group-hover:text-vibrant-red ${isOpen ? "text-vibrant-red" : "text-white"}`}>
                  {t(`faq.q${n}.question`)}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={faqOpenTransition}
                  className={`shrink-0 inline-flex items-center justify-center transition-colors group-hover:text-vibrant-red ${isOpen ? "text-vibrant-red" : "text-on-surface-muted"}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  id={`faq-answer-${n}`}
                  role="region"
                  aria-labelledby={`faq-question-${n}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: faqOpenTransition,
                      opacity: { ...faqOpenTransition, delay: prefersReducedMotion ? 0 : 0.08 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: faqCloseTransition,
                      opacity: { ...faqCloseTransition, duration: prefersReducedMotion ? 0 : 0.16 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-on-surface-muted leading-relaxed pb-6 pr-8 max-w-2xl">{t(`faq.q${n}.answer`)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
