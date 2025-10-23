// Simulated ML-based spam detection service
// Mimics the behavior of a trained Naive Bayes / Logistic Regression model

interface PredictionResult {
  label: 'spam' | 'ham';
  confidence: number;
  keywords: string[];
}

// Common spam keywords with weights
const spamKeywords = [
  'free', 'win', 'winner', 'cash', 'prize', 'urgent', 'claim', 'congratulations',
  'offer', 'limited', 'act now', 'call now', 'click here', 'discount', 'guarantee',
  'bonus', 'reward', 'money', 'credit', 'loan', 'debt', 'viagra', 'pharmacy',
  'weight loss', 'earn', 'income', 'million', 'thousand', '100%', 'account',
  'blocked', 'suspended', 'verify', 'confirm', 'password', 'bank', 'paypal',
  'text stop', 'unsubscribe', 'txt', 'reply', 'send', 'mobile', 'ringtone'
];

// Common ham indicators
const hamKeywords = [
  'meeting', 'tomorrow', 'today', 'lunch', 'dinner', 'home', 'work',
  'thanks', 'thank you', 'please', 'how are', 'love', 'miss', 'family',
  'friend', 'mom', 'dad', 'okay', 'sure', 'yes', 'no', 'maybe'
];

export function classifyMessage(message: string): PredictionResult {
  if (!message || message.trim().length === 0) {
    return {
      label: 'ham',
      confidence: 0.5,
      keywords: []
    };
  }

  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);
  
  // Calculate spam score based on keywords
  let spamScore = 0;
  let hamScore = 0;
  const foundKeywords: string[] = [];

  // Check for spam keywords
  spamKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) {
      spamScore += 2;
      foundKeywords.push(keyword);
    }
  });

  // Check for ham keywords
  hamKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) {
      hamScore += 1.5;
    }
  });

  // Heuristics that indicate spam
  const hasExclamation = (message.match(/!/g) || []).length >= 2;
  const hasAllCaps = /[A-Z]{4,}/.test(message);
  const hasNumbers = /\d{4,}/.test(message);
  const hasCurrency = /[$£€₹]/.test(message);
  const hasURL = /http|www\.|\.com|\.org|\.net/.test(lowerMessage);

  if (hasExclamation) spamScore += 1.5;
  if (hasAllCaps) spamScore += 2;
  if (hasNumbers) spamScore += 1;
  if (hasCurrency) spamScore += 1;
  if (hasURL) spamScore += 1.5;

  // Very short messages are usually ham (unless they have strong spam indicators)
  if (words.length < 5 && spamScore < 3) {
    hamScore += 2;
  }

  // Calculate confidence based on scores
  const totalScore = spamScore + hamScore;
  const spamProbability = totalScore > 0 ? spamScore / totalScore : 0.5;

  // Determine label
  const isSpam = spamScore > hamScore;
  const confidence = isSpam 
    ? Math.min(0.99, 0.5 + spamProbability * 0.5)
    : Math.min(0.99, 0.5 + (1 - spamProbability) * 0.5);

  return {
    label: isSpam ? 'spam' : 'ham',
    confidence: Number(confidence.toFixed(2)),
    keywords: foundKeywords.slice(0, 5) // Return top 5 keywords
  };
}

export function classifyBatch(messages: string[]): PredictionResult[] {
  return messages.map(msg => classifyMessage(msg));
}

// Sample dataset
export const sampleDataset = [
  { message: "Congratulations! You've won a free ticket. Reply YES to claim.", label: 'spam' as const },
  { message: "Hey, are you coming to the meeting tomorrow?", label: 'ham' as const },
  { message: "URGENT!! Your account has been blocked. Call 12345 now.", label: 'spam' as const },
  { message: "Please pick up groceries on way home.", label: 'ham' as const },
  { message: "You have won a £1000 prize! Click here to claim now!", label: 'spam' as const },
  { message: "Thanks for your help today. Really appreciate it!", label: 'ham' as const },
  { message: "FREE entry in 2 a wkly comp for a chance to win FA Cup final tkts.", label: 'spam' as const },
  { message: "Can we reschedule our lunch meeting to next week?", label: 'ham' as const },
  { message: "Claim your reward points immediately! Limited time offer!", label: 'spam' as const },
  { message: "Mom called. She wants you to call her back.", label: 'ham' as const },
  { message: "WINNER!! As a valued network customer you have been selected...", label: 'spam' as const },
  { message: "Are we still meeting at 6pm for dinner?", label: 'ham' as const },
  { message: "Urgent! You have won a 1 week FREE membership in our £100,000 Prize Jackpot!", label: 'spam' as const },
  { message: "I'll be there in 10 minutes", label: 'ham' as const },
  { message: "Get a FREE iPhone! Text WIN to 12345 now!", label: 'spam' as const },
  { message: "How was your day at work?", label: 'ham' as const },
  { message: "100% guaranteed weight loss! Buy now!", label: 'spam' as const },
  { message: "Love you! See you soon.", label: 'ham' as const },
  { message: "Your mobile number has won £5000! Call now to claim.", label: 'spam' as const },
  { message: "Running late. Be there in 5.", label: 'ham' as const },
  { message: "Congratulations! You have won £2,000 in the weekly draw. Call to claim.", label: 'spam' as const },
  { message: "URGENT: Your account has been suspended. Verify identity immediately to restore access.", label: 'spam' as const },
  { message: "You have an unclaimed refund of $150. Click to claim your refund now.", label: 'spam' as const },
  { message: "Limited offer: Get a free gift card with every purchase this week. Reply YES to receive.", label: 'spam' as const },
  { message: "Final notice: Overdue invoice. Pay now to avoid legal action.", label: 'spam' as const },
  { message: "Exclusive: Work-from-home opportunity - earn £500/day. Sign up today!", label: 'spam' as const },
  { message: "Congratulations — you’re one of 10 winners of a holiday voucher. Call to confirm.", label: 'spam' as const },
  { message: "Important security alert: Suspicious login detected. Reset your password immediately.", label: 'spam' as const },
  { message: "You’ve been selected for a free trial of Premium. Provide card details to activate.", label: 'spam' as const },
  { message: "Claim your free smartphone now! Limited stock available — respond to this message.", label: 'spam' as const },
  { message: "Tax refund owed: Verify your bank details to receive £350 refund.", label: 'spam' as const },
  { message: "Your parcel is being held — pay shipping fee to have it delivered.", label: 'spam' as const },
  { message: "Congratulations! Instant £100 credit added to your account. Click to accept.", label: 'spam' as const },
  { message: "Get a low-interest loan even with bad credit. Apply now — instant approval.", label: 'spam' as const },
  { message: "You have an unpaid balance. Click here to avoid service interruption.", label: 'spam' as const },
  { message: "This is your final reminder: Verify your details to keep your account active.", label: 'spam' as const },
  { message: "Exclusive investment opportunity — double your money in 7 days. Limited spots.", label: 'spam' as const },
  { message: "Confirm your delivery address to receive a free sample pack.", label: 'spam' as const },
  { message: "Act now: Your credit card has been compromised. Call our fraud team immediately.", label: 'spam' as const },
  { message: "You’ve won a shopping spree worth £500. Reply with your name to claim.", label: 'spam' as const },
  { message: "Free subscription! Enter your payment info to continue after trial ends.", label: 'spam' as const },
  { message: "Urgent: You’ve been pre-approved for a credit increase. Accept now.", label: 'spam' as const },
  { message: "Your voicemail box is full. Click to listen to important messages.", label: 'spam' as const },
  { message: "Exclusive coupon: 90% off your next order — limited time only.", label: 'spam' as const },
  { message: "We found a problem with your delivery. Confirm details to avoid return.", label: 'spam' as const },
  { message: "Get paid to test products. Quick sign-up, big payouts.", label: 'spam' as const },
  { message: "Alert: Unauthorized activity on your card. Confirm transactions now.", label: 'spam' as const },
  { message: "You’re invited to a private investment webinar — guaranteed profit.", label: 'spam' as const },
  { message: "Free voucher inside — reply CLAIM to receive your code.", label: 'spam' as const },
  { message: "Your social media account will be deleted unless you verify now.", label: 'spam' as const },
  { message: "Low fee mortgage refinance available — lock in a lower rate today.", label: 'spam' as const },
  { message: "Congratulations! Your email won a prize. Provide details to receive.", label: 'spam' as const },
  { message: "Receive £250 cashback when you switch services. Apply within 24 hours.", label: 'spam' as const },
  { message: "Immediate action required: Update payment info or subscription will cancel.", label: 'spam' as const },
  { message: "Win big with our instant lottery — buy a ticket now and enter to win.", label: 'spam' as const },
  { message: "Get a free health supplement trial — pay only shipping.", label: 'spam' as const },
  { message: "Your insurance claim has been approved. Send bank details to receive payment.", label: 'spam' as const },
  { message: "Earn money from home reviewing apps. No experience needed.", label: 'spam' as const },
  { message: "Confirm your identity to collect a £1,000 government grant.", label: 'spam' as const },
  { message: "Immediate deposit: You qualify for a bonus of £750. Reply to accept.", label: 'spam' as const },
  { message: "Free Netflix for a year! Sign up with your account details to redeem.", label: 'spam' as const },
  { message: "Your account will be charged today. Click to see recent charges.", label: 'spam' as const },
  { message: "Act fast: Exclusive discount on luxury goods — limited inventory.", label: 'spam' as const },
  { message: "You’ve been selected for a mystery shopper role — high pay, flexible hours.", label: 'spam' as const },
  { message: "Recovery notice: You have unpaid taxes. Contact us to avoid fines.", label: 'spam' as const },
  { message: "Join our crypto pilot — guaranteed returns. Early access ends soon.", label: 'spam' as const },
  { message: "Confirm your card to receive a free shopping voucher worth £200.", label: 'spam' as const }
];

// Model performance metrics (simulated)
export const modelMetrics = {
  accuracy: 0.986,
  precision: {
    ham: 0.99,
    spam: 0.95
  },
  recall: {
    ham: 0.98,
    spam: 0.97
  },
  f1Score: {
    ham: 0.99,
    spam: 0.96
  },
  confusionMatrix: {
    truePositive: 146,   // Spam correctly classified as spam
    trueNegative: 887,   // Ham correctly classified as ham
    falsePositive: 13,   // Ham incorrectly classified as spam
    falseNegative: 4     // Spam incorrectly classified as ham
  },
  totalSamples: 1050,
  spamSamples: 150,
  hamSamples: 900
};
