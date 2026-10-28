import { useState } from 'react';
import businessData from '../../data/business.json';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Where is Super Fusion Cuisine II located?',
    answer: `Super Fusion Cuisine II is located at ${businessData.contact.address} in the heart of Watertown Square. We are situated right on Mt. Auburn Street, approximately two minutes on foot from the Watertown Square bus transit hub.`
  },
  {
    question: 'What are your daily lunch and dinner hours?',
    answer: `Monday through Friday, we open for Lunch from 11:30 AM to 2:45 PM, pause between 2:45 PM and 5:00 PM for fresh kitchen preparation, and reopen for Dinner from 5:00 PM to 9:30 PM. On Saturday and Sunday, we are open continuously from 12:00 PM to 9:30 PM.`
  },
  {
    question: 'How do I place an order for quick pickup or takeout?',
    answer: `You can call our dedicated restaurant line directly at ${businessData.business.phone} to order with our sushi staff, use the Order via Voice Assistant action on mobile, or visit our online ordering portal.`
  },
  {
    question: 'Where should I park when visiting Watertown Square?',
    answer: `${businessData.contact.parkingAndTransit.parkingNote} If taking public transportation, ${businessData.contact.parkingAndTransit.transitNote}`
  },
  {
    question: 'What nearby towns and neighborhoods do you serve?',
    answer: `We frequently serve customers and take catering/takeout orders across ${businessData.business.areaServed.join(', ')}.`
  },
  {
    question: 'Can you accommodate dietary restrictions and allergies?',
    answer: `Yes. Our sushi chefs can prepare rolls with gluten-free tamari, accommodate shellfish or sesame allergies, and provide dedicated vegetarian/vegan rolls. Please mention your preferences when calling in your order.`
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
            <span>Operational FAQ</span>
            <span aria-hidden="true">·</span>
            <span>Customer Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal">
            Everything you need to know about dining in, takeout pickups, hours, and parking.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-neutral-900 hover:text-black transition-colors min-h-[44px] cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <span className="font-mono text-base font-normal text-neutral-400 shrink-0 w-6 text-right">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 font-normal"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
