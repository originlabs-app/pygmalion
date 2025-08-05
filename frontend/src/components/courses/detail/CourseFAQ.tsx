import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Course } from '@/types';

interface CourseFAQProps {
  course: Course;
}

const CourseFAQ: React.FC<CourseFAQProps> = ({ course }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!course.faq || course.faq.length === 0) {
    return null;
  }

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Questions fréquentes</h3>
      </div>
      
      <div className="space-y-3">
        {course.faq.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleQuestion(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {openIndex === idx && (
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseFAQ;