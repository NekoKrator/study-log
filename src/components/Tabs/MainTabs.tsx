import AutoTabs from './AutoTabs';
import TodayTab from './TodayTab';
import CalendarTab from './CalendarTab';
import StatisticsTab from './StatisticsTab';
import PastEntriesTab from './PastEntriesTab';
import { useState, useEffect } from 'react';
import type { TabConfig, StudyEntry } from '@/types/tabs';

export default function MainTabs() {
  const [entries, setEntries] = useState<StudyEntry[]>([]);

  const tabs: TabConfig[] = [
    {
      value: 'today',
      label: 'Today',
      content: () => <TodayTab entries={entries} setEntries={setEntries} />,
    },
    {
      value: 'calendar',
      label: 'Calendar',
      content: () => <CalendarTab entries={entries} />,
    },
    {
      value: 'statistics',
      label: 'Statistics',
      content: () => <StatisticsTab entries={entries} />,
    },
    {
      value: 'pastEntries',
      label: 'Past Entries',
      content: () => <PastEntriesTab entries={entries} />,
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  return <AutoTabs defaultValue='today' tabs={tabs} />;
}
