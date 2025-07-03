import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TodayTab from './TodayTab';
import CalendarTab from './CalendarTab';
import StatisticsTab from './StatisticsTab';
import PastEntriesTab from './PastEntriesTab';
import { useState, useEffect } from 'react';

interface StudyEntry {
  date: string;
  content: string;
  wordCount: number;
}

export default function MainTabs() {
  const [entries, setEntries] = useState<StudyEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  return (
    <Tabs defaultValue='today' className='space-y-4'>
      <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger value='today'>Today</TabsTrigger>
        <TabsTrigger value='calendar'>Calendar</TabsTrigger>
        <TabsTrigger value='statistics'>Statistics</TabsTrigger>
        <TabsTrigger value='pastEntries'>Past Entries</TabsTrigger>
      </TabsList>
      <TabsContent value='today' className='space-y-4'>
        <TodayTab entries={entries} setEntries={setEntries} />
      </TabsContent>
      <TabsContent value='calendar' className='space-y-4'>
        <CalendarTab entries={entries} />
      </TabsContent>
      <TabsContent value='statistics' className='space-y-4'>
        <StatisticsTab entries={entries} />
      </TabsContent>
      <TabsContent value='pastEntries' className='space-y-4'>
        <PastEntriesTab entries={entries} />
      </TabsContent>
    </Tabs>
  );
}
