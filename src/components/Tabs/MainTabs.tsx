import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TodayTab from './TodayTab';
import CalendarTab from './CalendarTab';
import StatisticsTab from './StatisticsTab';
import PastEntriesTab from './PastEntriesTab';

export default function MainTabs() {
  return (
    <Tabs defaultValue='today'>
      <TabsList>
        <TabsTrigger value='today'>Today</TabsTrigger>
        <TabsTrigger value='calendar'>Calendar</TabsTrigger>
        <TabsTrigger value='statistics'>Statistics</TabsTrigger>
        <TabsTrigger value='pastEntries'>Past Entries</TabsTrigger>
      </TabsList>
      <TabsContent value='today'>
        <TodayTab />
      </TabsContent>
      <TabsContent value='calendar'>
        <CalendarTab />
      </TabsContent>
      <TabsContent value='statistics'>
        <StatisticsTab />
      </TabsContent>
      <TabsContent value='pastEntries'>
        <PastEntriesTab />
      </TabsContent>
    </Tabs>
  );
}
