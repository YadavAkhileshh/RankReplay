import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewPage } from './pages/Overview';
import { ContestPage } from './pages/Contest';
import { CompetitorsPage } from './pages/Competitors';
import { EventsPage } from './pages/Events';
import { AboutPage } from './pages/About';

function AppContent() {
  const [activePage, setActivePage] = useState('overview');

  const renderPage = () => {
    switch (activePage) {
      case 'overview':    return <OverviewPage />;
      case 'contest':     return <ContestPage />;
      case 'competitors': return <CompetitorsPage />;
      case 'events':      return <EventsPage />;
      case 'about':       return <AboutPage />;
      default:            return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F1F7FC] overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header activePage={activePage} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 lg:p-6 max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
