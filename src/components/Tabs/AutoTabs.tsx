import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TabConfig {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface AutoTabProps {
  defaultValue: string;
  tabs: TabConfig[];
}

export default function AutoTab({ defaultValue, tabs }: AutoTabProps) {
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
