import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';
import { useState } from 'react';

export default function CalendarTab() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

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
          />
        </CardContent>
      </Card>

      {selectedDay && (
        <Card>
          <CardHeader>
            <CardTitle>{formatDate(selectedDay)}</CardTitle>
          </CardHeader>

          <CardContent>
            <p className='text-muted-foreground'>No entry for this date</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
