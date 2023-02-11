import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Please add an API key"
      }
    });
    return;
  }

  const prompt = req.body.prompt || undefined;
  if (!prompt) {
    res.status(400).json({
      error: {
        message: "An error occurred - please try again"
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 2048,
      prompt: prompt,
      temperature: 0.9,
    });
    res.status(200).json({
      result: completion.data.choices[0].text
    });
  } catch (e) {
    console.error(e);
  }
}