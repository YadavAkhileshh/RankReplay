import { Radio, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const PAGE_TITLES = {
  overview:    'Overview',
  contest:     'My Contest',
  competitors: 'Competitor Analysis',
  events:      'Match Events',
  about:       'About',
}

export function Header({ activePage }) {
  const { matchInfo } = useApp()

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-5 lg:px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0">
      <div className="pl-10 lg:pl-0">
        <h1 className="text-sm font-semibold text-[#1E293B]">
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </h1>
        <p className="text-xs text-[#64748B] hidden sm:block">
          {matchInfo.title} - Over {matchInfo.currentOver}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B]">
          <span className="font-medium">{matchInfo.title.split(' - ')[0].trim()}</span>
          <span className="text-[#64748B]">·</span>
          <span className="text-[#64748B]">Over {matchInfo.currentOver}</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#FECACA] bg-[#FEF2F2]">
          <Radio size={11} className="text-[#DC2626] animate-pulse" />
          <span className="text-xs font-medium text-[#DC2626]">Live</span>
        </div>

        <div className="w-7 h-7 rounded-full bg-[#1E293B] flex items-center justify-center flex-shrink-0">
          <User size={13} className="text-white" />
        </div>
      </div>
    </header>
  )
}
