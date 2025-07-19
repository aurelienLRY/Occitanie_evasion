"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQCategory, FAQItem, faqData } from "@/data/faq";

interface FAQProps {
  className?: string;
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItemComponent = ({ item, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-4 px-0 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
          {item.question}
        </h3>
        <svg
          className={cn(
            "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pb-4 px-0">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQCategoryComponent = ({ category }: { category: FAQCategory }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {category.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {category.description}
        </p>
      </div>
      <div className="p-6">
        {category.items.map((item) => (
          <FAQItemComponent
            key={item.id}
            item={item}
            isOpen={openItems.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const FAQ = ({ className }: FAQProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-8 md:gap-12">
        {faqData.map((category: FAQCategory) => (
          <FAQCategoryComponent key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}; 