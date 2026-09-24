import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faq } from '@/lib/data';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items?: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items = faq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="faq-item" key={item.q}>
            <button
              type="button"
              className="faq-button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              {isOpen ? <Minus size={17} /> : <Plus size={17} />}
            </button>
            {isOpen && <div className="faq-answer">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
