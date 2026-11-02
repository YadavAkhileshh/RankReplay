import { Card, CardContent } from '../components/ui/index'
import { AlertCircle } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="max-w-2xl space-y-5">
      <Card>
        <CardContent className="py-8 flex flex-col items-center text-center gap-4">
          <div>
            <h2 className="text-base font-semibold text-[#1E293B]">RankReplay</h2>
            <p className="text-sm text-[#64748B] mt-1">
              Fantasy sports contest analysis tool
            </p>
          </div>
          <p className="text-sm text-[#64748B] max-w-md leading-relaxed">
            Compares your fantasy team against competitors to explain why your rank changed during a match.
            Uses simulated contest data and Groq to generate explanations.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
        <AlertCircle size={14} className="text-[#64748B] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#64748B] leading-relaxed">
          This is an independent prototype. Not affiliated with Dream11.
          All player names, teams, match events and contest data are simulated.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <p className="text-sm font-medium text-[#1E293B]">What it does</p>
          <ul className="space-y-2 text-sm text-[#64748B]">
            {[
              'Calculates fantasy points using a configurable scoring system',
              'Ranks all 51 teams and tracks your position over the match',
              'Compares your team against teams that overtook you',
              'Shows which player selections made the biggest difference',
              'Lets you simulate match events and see how rankings update',
              'Uses Groq to explain rank changes in plain language',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-1 h-1 rounded-full bg-[#CBD5E1] flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <p className="text-sm font-medium text-[#1E293B]">Stack</p>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Groq API', 'Lucide Icons'].map(tech => (
              <span key={tech} className="text-xs bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] px-2.5 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
