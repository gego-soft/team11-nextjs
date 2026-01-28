"use client";
import BallLoader from "@/components/Common/BallLoader";
import { faq } from "@/services/Auth/faqService";
import { Faq } from "@/types/Auth/faq";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const toggle = (q: string) =>
    setOpenQuestion((current) => (current === q ? null : q));
  useEffect(() => {
    const fetchFaq = async () => {
      setLoading(true);
      try {
        const res = await faq();
        if (!res.success) {
          console.error(res.message);
        }
        setFaqs(res.data);
      } catch (err) {
        console.error("Failed to fetch Faqs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);
  if (loading) {
    return (
      <div className="h-125 flex justify-center items-center">
        <BallLoader />
      </div>
    );
  }
  return (
    <div className="static-page">
      <div className="static-page-container">
        <h1>Frequently Asked Questions</h1>
        <div className="static-page-content space-y-6">
          {faqs.map(({ id, question, answer }) => (
            <div
              key={id}
              className="group rounded-xl border border-slate-800 px-5"
            >
              <button
                type="button"
                onClick={() => toggle(question)}
                className="flex justify-between items-center cursor-pointer w-full text-left"
                aria-expanded={openQuestion === question}
              >
                <span className="text-lg md:text-[1.5rem] font-bold text-gray-800 p-2">
                  {question}
                </span>
                <span
                  className={`transition-transform ml-4 ${
                    openQuestion === question ? "rotate-180" : ""
                  }`}
                >
                  <FaChevronDown />
                </span>
              </button>
              <div
                className={`
                    overflow-hidden transition-all duration-900 ease-in-out
                    ${
                      openQuestion === question
                        ? "max-h-40 mt-3 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
              >
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                  {answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
