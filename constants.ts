import { Category } from './types';

// Webhook URL for lead submission
export const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/5lW9H78EAU69NXo9PRBu/webhook-trigger/481ac351-2ebb-4287-8777-476e311de54f";

export const SCORING_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Somewhat" },
  { value: 2, label: "Mostly" },
  { value: 3, label: "Absolutely" },
];

export const CATEGORIES: Category[] = [
  {
    id: "demand",
    title: "Patient Demand",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    questions: [
      { id: 1, text: "Do you regularly treat patients with dental anxiety or fear?", categoryId: "demand" },
      { id: 2, text: "Have you lost cases due to patients not wanting treatment while awake?", categoryId: "demand" },
      { id: 3, text: "Do patients ask if you offer sedation?", categoryId: "demand" },
      { id: 4, text: "Would offering IV sedation increase your case acceptance?", categoryId: "demand" },
      { id: 5, text: "Are you turning away complex procedures because of patient anxiety?", categoryId: "demand" },
    ]
  },
  {
    id: "clinical",
    title: "Clinical Readiness",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2068",
    questions: [
      { id: 6, text: "Are you comfortable with moderate sedation concepts?", categoryId: "clinical" },
      { id: 7, text: "Have you completed any sedation or anesthesia CE?", categoryId: "clinical" },
      { id: 8, text: "Would you feel confident managing a sedated patient with proper training?", categoryId: "clinical" },
      { id: 9, text: "Do you understand the difference between oral, nitrous, and IV sedation?", categoryId: "clinical" },
      { id: 10, text: "Are you personally motivated to perform sedation vs referring out?", categoryId: "clinical" },
    ]
  },
  {
    id: "infrastructure",
    title: "Team & Office Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053",
    questions: [
      { id: 11, text: "Do you have 2+ team members open to ACLS training?", categoryId: "infrastructure" },
      { id: 12, text: "Is your office equipped for continuous patient monitoring?", categoryId: "infrastructure" },
      { id: 13, text: "Do you have a space suitable for post-op recovery?", categoryId: "infrastructure" },
      { id: 14, text: "Are your staff confident with emergency protocols?", categoryId: "infrastructure" },
      { id: 15, text: "Have you implemented any sedation protocols before?", categoryId: "infrastructure" },
    ]
  },
  {
    id: "compliance",
    title: "Licensing & Compliance",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2072",
    questions: [
      { id: 16, text: "Have you researched IV sedation permit requirements for your state?", categoryId: "compliance" },
      { id: 17, text: "Do you currently hold any sedation-related licenses?", categoryId: "compliance" },
      { id: 18, text: "Does your state allow general dentists to administer IV sedation?", categoryId: "compliance" },
      { id: 19, text: "Do you feel confident navigating the licensing and permit process?", categoryId: "compliance" },
      { id: 20, text: "Do you know what documentation and training hours are required?", categoryId: "compliance" },
    ]
  },
  {
    id: "business",
    title: "Business & Financial Readiness",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1932",
    questions: [
      { id: 21, text: "Are you looking to grow monthly production without adding more patients?", categoryId: "business" },
      { id: 22, text: "Would sedation help you fill downtime or open up new procedures?", categoryId: "business" },
      { id: 23, text: "Do you have $12K–$17K allocated for business-enhancing CE?", categoryId: "business" },
      { id: 24, text: "Are you interested in long-term ROI, not just CE credits?", categoryId: "business" },
      { id: 25, text: "Would you value support around billing/coding for sedation procedures?", categoryId: "business" },
    ]
  },
];