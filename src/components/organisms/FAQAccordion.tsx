import React, { useState } from 'react';
import { FAQItem } from '../molecules/FAQItem';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQ[];
  allowMultiple?: boolean;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);

      if (!allowMultiple) {
        newOpenItems.clear();
      }

      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }

      return newOpenItems;
    });
  };

  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item) => (
        <FAQItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
