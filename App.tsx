import React, { useState, useEffect } from 'react';
import { User, QuizState, QuizResult } from './types';
import { CATEGORIES } from './constants';
import LeadCapture from './components/LeadCapture';
import QuizQuestion from './components/QuizQuestion';
import Results from './components/Results';
import { calculateResults, submitToWebhook } from './services/quizService';
import { Loader2, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<QuizState>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Flatten questions for easy indexing
  const allQuestions = React.useMemo(() => 
    CATEGORIES.flatMap(cat => cat.questions), 
  []);

  const handleStartQuiz = () => {
    setStep('quiz');
    window.scrollTo(0, 0);
  };

  const handleLeadSubmit = (userData: User) => {
    setUser(userData);
    setStep('calculating');
    window.scrollTo(0, 0);
  };

  const handleAnswer = (score: number) => {
    const question = allQuestions[currentQuestionIndex];
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (currentQuestionIndex < allQuestions.length - 1) {
      // Small delay for UX feel
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        // Scroll slightly up to keep question in view if mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 250);
    } else {
      // Quiz finished, go to lead capture
      setStep('lead-capture');
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (step === 'calculating' && user) {
      const performCalculation = async () => {
        const result = calculateResults(answers);
        setQuizResult(result);
        
        // Submit to webhook
        await submitToWebhook(user, result);
        
        // Artificial delay for "processing" feel + ensuring webhook fires
        setTimeout(() => {
          setStep('results');
          window.scrollTo(0, 0);
        }, 1500);
      };
      
      performCalculation();
    }
  }, [step, user, answers]);

  const getCurrentCategory = () => {
    const q = allQuestions[currentQuestionIndex];
    return CATEGORIES.find(c => c.id === q.categoryId) || CATEGORIES[0];
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-slate-800 tracking-tight">Sedation Ready</span>
          </div>
          {step === 'quiz' && (
             <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500 hidden sm:block">Assessment in progress</span>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        
        {step === 'welcome' && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 w-full animate-fade-in">
            <div className="bg-blue-600 p-8 text-white text-center">
              <h1 className="text-3xl font-bold mb-4">Are You Ready to Offer IV Sedation?</h1>
              <p className="text-blue-100 text-lg">Take our professional assessment to discover if your practice is ready for the next level of growth.</p>
            </div>
            
            <div className="p-8 text-center space-y-6">
              <p className="text-slate-600">
                This 25-question assessment evaluates your clinical, operational, and business readiness.
              </p>
              
              <button
                onClick={handleStartQuiz}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
              >
                <span>Start Quiz</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <QuizQuestion
            question={allQuestions[currentQuestionIndex]}
            category={getCurrentCategory()}
            totalQuestions={allQuestions.length}
            currentIndex={currentQuestionIndex}
            onAnswer={handleAnswer}
          />
        )}

        {step === 'lead-capture' && (
          <LeadCapture onComplete={handleLeadSubmit} />
        )}

        {step === 'calculating' && (
          <div className="text-center animate-pulse">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing your responses...</h2>
            <p className="text-slate-500">We are generating your personalized sedation readiness report.</p>
          </div>
        )}

        {step === 'results' && quizResult && user && (
          <Results result={quizResult} user={user} />
        )}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-auto">
         <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Sedation Ready. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

export default App;