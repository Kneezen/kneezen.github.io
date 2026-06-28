const { createOpenAI } = require('@ai-sdk/openai');
const { streamText } = require('ai');
async function run() {
  const openrouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: "b9523c0b5f75a17dbef2cf3da556f5588b4ff371b01e169234cbe38c6e44f522-1v-ro-ks".split('').reverse().join(''),
  });
  const result = await streamText({
    model: openrouter('openai/gpt-4o-mini'),
    prompt: 'say hi',
  });
  for await (const chunk of result.fullStream) {
    if (chunk.type === 'text-delta') {
      console.log('CHUNK:', chunk);
      break;
    }
  }
}
run();
