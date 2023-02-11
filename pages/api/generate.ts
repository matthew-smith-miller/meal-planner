// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export type MealPlannerInput = {
  date: Date;
  diet: string;
  adventurousness: number;
}

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Please add an API key"
      }
    });
    return;
  }

  const input = req.body.input || undefined;
  if (!input) {
    res.status(400).json({
      error: {
        message: "Please select a date"
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 2048,
      prompt: generatePrompt(input),
      temperature: setTemperature(input)
    });
    res.status(200).json({
      result: completion.data.choices[0].text
    });
  } catch (e) {
    console.error(e);
  }
}

function generatePrompt(input: MealPlannerInput) {
  const diet = 'Meals should be vegetarian.';
  const effort = 'easy'
  return `Suggest three ${effort} meals - breakfast, lunch, and dinner. ${diet} Return a JSON object with properties "breakfast", "lunch", and "dinner"`;
}

function setTemperature(input: MealPlannerInput) {
  return 0.4;
}