import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { formatDate, formatDateKey } from '@/lib/formatDate';
import { useState, useMemo } from 'react';
import type { BaseTabProps } from '@/types/tabs';

export default function CalendarTab({ entries }: BaseTabProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const entryMap = useMemo(
    () => new Map(entries.map((entry) => [entry.date, entry])),
    [entries]
  );
  const entryDates = useMemo(
    () => new Set(entries.map((entry) => entry.date)),
    [entries]
  );
  const getEntryForDate = (date: Date) => entryMap.get(formatDateKey(date));
  const entry = selectedDay ? getEntryForDate(selectedDay) : undefined;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <Card className='lg:col-span-1'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <CalendarDays className='w-5 h-5' />
            Study Calendar
          </CardTitle>
          <CardDescription>Days with entries are highlighted</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode='single'
            selected={selectedDay}
            onSelect={setSelectedDay}
            className='rounded-md border w-full'
            modifiers={{
              hasEntry: (date: Date) => entryDates.has(formatDateKey(date)),
            }}
            modifiersClassNames={{
              hasEntry:
                'bg-blue-100 text-blue-900 font-semibold border-blue-300',
            }}
          />
        </CardContent>
      </Card>
      {selectedDay && (
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>{formatDate(selectedDay)}</CardTitle>
          </CardHeader>
          <CardContent>
            {entry ? (
              <div className='space-y-2'>
                <Badge variant='secondary'>{entry.wordCount} words</Badge>
                <ScrollArea className='h-[200px] w-full rounded border p-3'>
                  <p className='text-sm whitespace-pre-wrap'>{entry.content}</p>
                </ScrollArea>
              </div>
            ) : (
              <p className='text-muted-foreground'>No entry for this date</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
