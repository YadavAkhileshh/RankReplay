import Groq from 'groq-sdk'

const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b'

const SYSTEM_PROMPT = `You are a fantasy cricket contest analyst.
Explain the user's rank movement using only the data provided.
Rules:
- Only use facts from the data. Never invent stats, events or percentages.
- If you can't determine a cause, say so.
- Write short, direct sentences. No marketing language.
- Return valid JSON with this exact schema:
{
  "summary": "2-3 sentences explaining what happened",
  "main_contributors": [{"player": "Name", "contribution": "what they did", "impact": "effect on rank"}],
  "evidence": ["fact 1", "fact 2", "fact 3"],
  "limitations": "what this data cannot explain"
}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'GROQ_API_KEY not set' })
  }

  try {
    const { analysis } = req.body
    if (!analysis) {
      return res.status(400).json({ error: 'Missing analysis payload' })
    }

    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Here is the contest data:\n\n${JSON.stringify(analysis, null, 2)}\n\nReturn only JSON.`,
        },
      ],
      temperature: 0.2,
      max_tokens: 700,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from Groq')

    const parsed = JSON.parse(content)
    return res.status(200).json(parsed)
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Groq request failed' })
  }
}
