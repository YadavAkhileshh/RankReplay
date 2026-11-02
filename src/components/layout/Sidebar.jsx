import { useState } from 'react'
import { Menu, X, BarChart2, Users, TrendingUp, Activity, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { id: 'overview',    label: 'Overview',            icon: BarChart2  },
  { id: 'contest',     label: 'My Contest',          icon: TrendingUp },
  { id: 'competitors', label: 'Competitor Analysis', icon: Users      },
  { id: 'events',      label: 'Match Events',        icon: Activity   },
]

export function Sidebar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = (id) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-[#E2E8F0]">
        <span
          className="text-sm font-semibold text-[#1E293B] cursor-default tracking-tight hover:text-[#2563EB] transition-colors"
        >
          RankReplay
        </span>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left',
              activePage === id
                ? 'bg-[#DBEAFE] text-[#2563EB] font-medium'
                : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9]',
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-4">
        <button
          onClick={() => navigate('about')}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left',
            activePage === 'about'
              ? 'bg-[#DBEAFE] text-[#2563EB] font-medium'
              : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9]',
          )}
        >
          <Info size={15} />
          About
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-white border-r border-[#E2E8F0] h-full">
        <NavContent />
      </aside>

      <button
        className="lg:hidden fixed top-3.5 left-3.5 z-50 p-2 rounded-md border border-[#E2E8F0] bg-white shadow-sm"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} className="text-[#1E293B]" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 flex flex-col w-64 bg-white border-r border-[#E2E8F0] h-full shadow-xl">
            <button
              className="absolute top-4 right-4 p-1 rounded hover:bg-[#F1F5F9]"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} className="text-[#64748B]" />
            </button>
            <NavContent />
          </aside>
        </div>
      )}
    </>
  )
}
