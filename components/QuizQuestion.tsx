import React from 'react';
import { Question, Category } from '../types';
import { SCORING_OPTIONS } from '../constants';

interface Props {
  question: Question;
  category: Category;
  totalQuestions: number;
  currentIndex: number;
  onAnswer: (score: number) => void;
}

const QuizQuestion: React.FC<Props> = ({ question, category, totalQuestions, currentIndex, onAnswer }) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-0">
      {/* Progress Bar */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden grid md:grid-cols-5 min-h-[500px]">
        {/* Image Side */}
        <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden bg-slate-800">
           <img 
            src={category.imageUrl} 
            alt={category.title}
            className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6 md:p-8">
             <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-50 text-xs font-bold rounded-full uppercase tracking-wider mb-2 w-fit">
              {category.title}
            </span>
            <h3 className="text-white font-medium text-sm opacity-90 hidden md:block">
              Assessing your readiness in {category.title.toLowerCase()}
            </h3>
           </div>
        </div>

        {/* Content Side */}
        <div className="md:col-span-3 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-8">
            {question.text}
          </h2>

          <div className="grid gap-3">
            {SCORING_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className="group relative flex items-center p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-blue-500 mr-4 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:text-blue-600 bg-white">
                  {String.fromCharCode(65 + option.value)}
                </div>
                <span className="text-lg font-medium text-slate-700 group-hover:text-slate-900">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;