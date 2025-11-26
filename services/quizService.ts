import { WEBHOOK_URL, CATEGORIES } from '../constants';
import { User, Answer, QuizResult } from '../types';

export const calculateResults = (answers: Record<number, number>): QuizResult => {
  let totalScore = 0;
  const categoryScores: Record<string, number> = {};

  CATEGORIES.forEach(cat => {
    let catTotal = 0;
    cat.questions.forEach(q => {
      const score = answers[q.id] || 0;
      catTotal += score;
      totalScore += score;
    });
    categoryScores[cat.title] = catTotal;
  });

  let tier: QuizResult['tier'] = 'Not Yet Ready';
  if (totalScore >= 60) {
    tier = 'You’re Ready';
  } else if (totalScore >= 40) {
    tier = 'Almost There';
  }

  return {
    totalScore,
    tier,
    categoryScores
  };
};

export const submitToWebhook = async (user: User, result: QuizResult) => {
  try {
    const payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      totalScore: result.totalScore,
      resultTier: result.tier,
      categoryScores: JSON.stringify(result.categoryScores),
      timestamp: new Date().toISOString()
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Webhook submission failed:', response.statusText);
      // We do not throw here to allow the user to see results even if webhook fails
    }
  } catch (error) {
    console.error('Network error during webhook submission:', error);
  }
};
