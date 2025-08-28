export type TQuestionCategory =
  | "Business Intelligence & Analytics"
  | "Performance Diagnostics"
  | "Customer Intelligence"
  | "Strategic Growth"
  | "Profitability & Finance";

export const questions: Record<TQuestionCategory, string[]> = {
  "Business Intelligence & Analytics": [
    "What were my top 5 performing products this quarter?",
    "How does this month's performance compare to last month?",
    "What's my average order value trending over time?",
    "How seasonal is my business and when should I prepare for peaks?",
  ],
  "Performance Diagnostics": [
    "Why are my sales declining?",
    "Why is my conversion rate so low?",
    "Why aren't my website visitors buying anything?",
    "At which step of the sales funnel are most users dropping off?",
  ],
  "Customer Intelligence": [
    "Who are my best customers?",
    "What are the common characteristics of my repeat buyers?",
    "What problems are my customers trying to solve with my products?",
    "What is the target audience for my online store?",
  ],
  "Strategic Growth": [
    "How can I increase sales next quarter?",
    "How can I improve customer retention?",
    "What are the projected sales for the rest of the year?",
    "What are the most effective ways to get more repeat purchases?",
  ],
  "Profitability & Finance": [
    "Why am I not profitable even though my sales are up?",
    "What is my true customer acquisition cost (CAC)?",
    "What is the lifetime value (LTV) of my customers?",
    "Is my discount strategy hurting my profit margins?",
  ],
};
