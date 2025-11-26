import React from 'react';
import { QuizResult, User } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, CheckCircle, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  result: QuizResult;
  user: User;
}

const Results: React.FC<Props> = ({ result }) => {
  const chartData = Object.entries(result.categoryScores).map(([name, score]) => ({
    name: name.split(' ')[0], // Short name for x-axis
    fullName: name,
    score: score as number,
    fullMark: 15
  }));

  const getResultVisuals = () => {
    switch (result.tier) {
      case 'You’re Ready':
        return {
          colorClass: 'text-green-600 bg-green-50 border-green-200',
          barColor: '#16a34a',
          icon: <CheckCircle className="w-12 h-12 text-green-600" />,
          imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000",
          title: "You’re Ready to Offer IV Sedation",
          text: "You’ve got the demand, the mindset, and likely the setup — now it’s about getting your permit and training locked in. Let’s talk dates, states, and your best path forward. This is the next stage of your practice growth."
        };
      case 'Almost There':
        return {
          colorClass: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          barColor: '#ca8a04',
          icon: <Sparkles className="w-12 h-12 text-yellow-600" />,
          imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2000",
          title: "You're Almost There",
          text: "You’re closer than you think. Your answers suggest you have a strong foundation — maybe your team needs a little more support, or you’re unsure about licensing. We’ve helped hundreds of dentists just like you take the final steps toward sedation training."
        };
      default:
        return {
          colorClass: 'text-red-600 bg-red-50 border-red-200',
          barColor: '#dc2626',
          icon: <AlertCircle className="w-12 h-12 text-red-600" />,
          imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2000",
          title: "Not Yet Ready",
          text: "Your score shows you’re not ready to offer IV sedation yet — but that’s exactly where we come in. Most dentists simply don’t know what’s needed or where to begin. Sedation Ready can help you understand your state’s requirements and build a clear path to certification."
        };
    }
  };

  const visuals = getResultVisuals();

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 animate-fade-in pb-12 px-4 md:px-0">
      
      {/* Header Result Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="h-48 md:h-64 relative overflow-hidden">
          <img 
            src={visuals.imageUrl} 
            alt="Result background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center">
             <div className="p-4 bg-white rounded-full shadow-lg">
                {visuals.icon}
             </div>
          </div>
        </div>
        
        <div className="px-8 pb-10 pt-2 text-center">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${visuals.colorClass.split(' ')[0]}`}>
            {visuals.title}
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-6xl font-black mb-6 text-slate-800">
            {result.totalScore}<span className="text-2xl font-medium text-slate-400 self-end mb-2">/75</span>
          </div>
          
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-slate-600">
            {visuals.text}
          </p>
        </div>
      </div>

      {/* Breakdown Chart */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Score Breakdown by Category</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" domain={[0, 15]} hide />
              <YAxis 
                type="category" 
                dataKey="fullName" 
                width={150} 
                tick={{fontSize: 12, fill: '#475569', fontWeight: 500}} 
              />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={visuals.barColor} 
                    opacity={0.3 + (entry.score / 15) * 0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-slate-400 mt-4">Scores based on 0-15 scale per category</p>
      </div>

      {/* CTA Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button className="flex items-center justify-center space-x-2 w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-slate-50 transition-colors">
          <Download className="w-5 h-5" />
          <span>Download PDF Report</span>
        </button>
        <a 
          href="https://westernsurgicalandsedation.com/enrollment-team"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.01]"
        >
          <span>Schedule Consultation</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
      
    </div>
  );
};

export default Results;