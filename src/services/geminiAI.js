// Google Gemini AI Service
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// System context for Cape Town tourism
const TOURISM_CONTEXT = `You are a knowledgeable and friendly Cape Town tourism expert assistant.
Your goal is to help tourists plan their perfect Cape Town experience.
Provide personalized recommendations based on their preferences, budget, travel dates, and interests.
Be concise, helpful, and enthusiastic about Cape Town's attractions, culture, and experiences.
Always provide practical information like addresses, operating hours, and estimated costs when relevant.
Focus on creating memorable experiences while ensuring safety and enjoyment.`;

// Get the Gemini Pro model for text generation
export const getTextModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  });
};

// Get the Gemini Pro Vision model for image analysis
export const getVisionModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-pro-vision",
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 0.95,
      maxOutputTokens: 512,
    }
  });
};

// Generate AI response for chat
export const generateChatResponse = async (userMessage, conversationHistory = []) => {
  try {
    const model = getTextModel();

    // Build conversation context
    const context = `${TOURISM_CONTEXT}\n\nConversation History:\n${conversationHistory.join('\n')}\n\nUser: ${userMessage}\n\nAssistant:`;

    const result = await model.generateContent(context);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
};

// Generate personalized itinerary
export const generateItinerary = async (preferences) => {
  try {
    const model = getTextModel();

    const prompt = `${TOURISM_CONTEXT}

Based on the following traveler preferences, create a detailed day-by-day itinerary for Cape Town:

Duration: ${preferences.duration} days
Travel Dates: ${preferences.dates || 'Flexible'}
Budget: ${preferences.budget} per person per day
Group Type: ${preferences.groupType}
Interests: ${preferences.interests.join(', ')}
Pace: ${preferences.pace}
Mobility: ${preferences.mobility}

Please provide:
1. Daily schedule with morning, afternoon, and evening activities
2. Specific attraction names with brief descriptions
3. Estimated costs for each activity
4. Restaurant recommendations for meals
5. Travel time between locations
6. Practical tips and insider advice

Format the response in a clear, structured way that can be easily saved and followed.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
};

// Identify landmark from image
export const identifyLandmark = async (imageData) => {
  try {
    const model = getVisionModel();

    const prompt = `Analyze this image and identify if it shows any Cape Town landmarks or attractions.
If you recognize a landmark, provide:
1. Name of the landmark
2. Brief historical or cultural information
3. Best times to visit
4. Photography tips
5. Nearby attractions

If it's not a recognizable Cape Town landmark, provide general information about what the image shows.`;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error identifying landmark:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};

// Generate budget breakdown
export const generateBudgetPlan = async (totalBudget, duration, numPeople, priorities) => {
  try {
    const model = getTextModel();

    const prompt = `${TOURISM_CONTEXT}

Create a detailed budget breakdown for a Cape Town trip:

Total Budget: R${totalBudget}
Trip Duration: ${duration} days
Number of People: ${numPeople}
Budget Priorities: ${priorities.join(', ')}

Provide:
1. Recommended budget allocation by category (accommodation, food, activities, transport, misc)
2. Daily spending limit per person
3. Specific budget-friendly recommendations
4. Money-saving tips
5. Free or low-cost activities
6. Where to splurge vs. where to save

Present this in a clear, actionable format.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating budget plan:', error);
    throw new Error('Failed to generate budget plan. Please try again.');
  }
};

// Get weather-based recommendations
export const getWeatherRecommendations = async (weatherData) => {
  try {
    const model = getTextModel();

    const prompt = `${TOURISM_CONTEXT}

Based on this weather forecast for Cape Town:
${JSON.stringify(weatherData)}

Recommend:
1. Best activities for this weather
2. What to pack
3. Indoor alternatives if weather is poor
4. Best times of day for outdoor activities
5. Safety considerations

Keep it concise and actionable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting weather recommendations:', error);
    throw new Error('Failed to get recommendations. Please try again.');
  }
};

export default {
  generateChatResponse,
  generateItinerary,
  identifyLandmark,
  generateBudgetPlan,
  getWeatherRecommendations
};
