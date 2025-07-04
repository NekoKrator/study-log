import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { AutoTabProps } from '@/types/tabs';

export default function AutoTabs({ defaultValue, tabs }: AutoTabProps) {
  return (
    <Tabs defaultValue={defaultValue} className='space-y-4'>
      <TabsList className='grid w-full grid-cols-4'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='space-y-4'>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
