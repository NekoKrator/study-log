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
import { useState } from 'react';

interface StudyEntry {
  date: string;
  content: string;
  wordCount: number;
}

interface TodayTabProps {
  entries: StudyEntry[];
}

export default function CalendarTab({ entries }: TodayTabProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const hasEntry = (date: Date) => {
    const dateKey = formatDateKey(date);
    console.log(
      'Checking date:',
      dateKey,
      'Available entries:',
      entries.map((e) => e.date)
    );
    return entries.some((entry) => entry.date === dateKey);
  };

  const getEntryForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return entries.find((entry) => entry.date === dateKey);
  };

  const entryDates = new Set(entries.map((entry) => entry.date));

  console.log('All entry dates:', Array.from(entryDates));

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <Card>
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
            className='rounded-md border'
            modifiers={{
              hasEntry: (date: Date) => {
                const dateKey = formatDateKey(date);
                const hasEntryResult = entryDates.has(dateKey);
                console.log(
                  'Calendar checking:',
                  dateKey,
                  'has entry:',
                  hasEntryResult
                );
                return hasEntryResult;
              },
            }}
            modifiersClassNames={{
              hasEntry:
                'bg-blue-100 text-blue-900 font-semibold border-blue-300',
            }}
          />
        </CardContent>
      </Card>
      {selectedDay && (
        <Card>
          <CardHeader>
            <CardTitle>{formatDate(selectedDay)}</CardTitle>
          </CardHeader>
          <CardContent>
            {hasEntry(selectedDay) ? (
              <div className='space-y-2'>
                <Badge variant='secondary'>
                  {getEntryForDate(selectedDay)?.wordCount} words
                </Badge>
                <ScrollArea className='h-[200px] w-full rounded border p-3'>
                  <p className='text-sm whitespace-pre-wrap'>
                    {getEntryForDate(selectedDay)?.content}
                  </p>
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
