import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default async function (animal) {
  if (!configuration.apiKey) {
    throw new Error('Api key not found')
  }


  if (!animal) {
    throw new Error('Animal name is empty')
  }


  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    return completion.data.choices[0].text
  } catch (error) {
    throw error
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `
    Suggest three names for an animal that is a superhero.
    Animal: Cat
    Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    Animal: Dog
    Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    Animal: ${capitalizedAnimal}
    Names:
  `;
}
