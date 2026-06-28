const { createOpenAI } = require('@ai-sdk/openai');
const { streamText, tool } = require('ai');
const { z } = require('zod');
async function run() {
  const openrouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: "b9523c0b5f75a17dbef2cf3da556f5588b4ff371b01e169234cbe38c6e44f522-1v-ro-ks".split('').reverse().join(''),
  });
  const result = await streamText({
    model: openrouter('openai/gpt-4o-mini'),
    prompt: 'take me to the cv page',
    tools: {
      navigateToPage: tool({
        description: 'Navigate the user to a specific page on the website. STRICT RULE: ONLY call this if the user explicitly requests to change pages.',
        parameters: z.object({
          path: z.enum(['/', '/about', '/cv', '/education', '/experience', '/projects', '/certifications']).describe('The path to navigate to.'),
          message: z.string().describe('A short message to display to the user before navigating, e.g. "Taking you to the projects page..."'),
        }),
      }),
    }
  });
  for await (const chunk of result.fullStream) {
    console.log(chunk);
  }
}
run();
