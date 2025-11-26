import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { User as UserIcon, Mail, Phone, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: (user: User) => void;
}

const LeadCapture: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState<User>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Partial<User>>({});

  useEffect(() => {
    // Check for query params to pre-fill
    const params = new URLSearchParams(window.location.search);
    setFormData({
      name: params.get('name') || '',
      email: params.get('email') || '',
      phone: params.get('phone') || '',
    });
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<User> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onComplete(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 w-full animate-fade-in">
      <div className="bg-blue-600 p-8 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Your Results Are Ready</h1>
        <p className="text-blue-100 text-lg">Enter your details below to unlock your personalized sedation readiness report.</p>
      </div>
      
      <div className="p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">Where should we send your results?</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="Dr. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="doctor@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="tel"
                className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
          >
            <span>View Results</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadCapture;