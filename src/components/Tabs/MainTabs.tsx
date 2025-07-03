import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TodayTab from './TodayTab';
import CalendarTab from './CalendarTab';
import StatisticsTab from './StatisticsTab';
import PastEntriesTab from './PastEntriesTab';

export default function MainTabs() {
  return (
    <Tabs defaultValue='today' className='space-y-4'>
      <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger value='today'>Today</TabsTrigger>
        <TabsTrigger value='calendar'>Calendar</TabsTrigger>
        <TabsTrigger value='statistics'>Statistics</TabsTrigger>
        <TabsTrigger value='pastEntries'>Past Entries</TabsTrigger>
      </TabsList>
      <TabsContent value='today' className='space-y-4'>
        <TodayTab />
      </TabsContent>
      <TabsContent value='calendar' className='space-y-4'>
        <CalendarTab />
      </TabsContent>
      <TabsContent value='statistics' className='space-y-4'>
        <StatisticsTab />
      </TabsContent>
      <TabsContent value='pastEntries' className='space-y-4'>
        <PastEntriesTab />
      </TabsContent>
    </Tabs>
  );
}
