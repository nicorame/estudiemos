import Anthropic from '@anthropic-ai/sdk';

const apiKey = import.meta.env.SECRET_ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error('Missing Anthropic API key');
}

export const anthropic = new Anthropic({
  apiKey,
});

export async function generateStudentResponse(prompt: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response format from Claude');
}
