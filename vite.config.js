import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const GROQ_MODEL = env.GROQ_MODEL || 'openai/gpt-oss-20b'

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'groq-api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/explain', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            const apiKey = env.GROQ_API_KEY
            if (!apiKey) {
              res.statusCode = 503
              res.end(JSON.stringify({ error: 'GROQ_API_KEY not set in .env' }))
              return
            }

            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const { analysis } = JSON.parse(body)
                const { default: Groq } = await import('groq-sdk')
                const groq = new Groq({ apiKey })

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

                const completion = await groq.chat.completions.create({
                  model: GROQ_MODEL,
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

                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(content)
              } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: err.message || 'Groq request failed' }))
              }
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  }
})
