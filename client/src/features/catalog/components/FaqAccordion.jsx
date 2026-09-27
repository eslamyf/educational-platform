import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faq } from '@/lib/data';
export const FaqAccordion = ({ items = faq }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (<div className="faq-list">
      {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (<div className="faq-item" key={item.q}>
            <button type="button" className="faq-button" onClick={() => toggle(index)} aria-expanded={isOpen}>
              <span>{item.q}</span>
              {isOpen ? <Minus size={17}/> : <Plus size={17}/>}
            </button>
            {isOpen && <div className="faq-answer">{item.a}</div>}
          </div>);
        })}
    </div>);
};
export default FaqAccordion;
