import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDate, formatDateKey } from '@/lib/formatDate';
import type { StudyEntry, TabWithSetterProps } from '@/types/tabs';
import notifyCustom from '@/lib/notifications';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

export default function TodayTab({ setEntries }: TabWithSetterProps) {
  const [todayEntry, setTodayEntry] = useState('');

  const today = formatDateKey(new Date());
  const trimmed = todayEntry.trim();

  useEffect(() => {
    db.entries.toArray().then(setEntries);
  }, [setEntries]);

  const handleSaveEntry = async () => {
    if (!trimmed) return;

    const newEntry: StudyEntry = {
      id: uuidv4(),
      date: today,
      content: trimmed,
      wordCount: countWords(todayEntry),
    };

    await db.entries.put(newEntry);
    const all = await db.entries.toArray();
    setEntries(all);
    notifyCustom(
      'New entry added!',
      'Your study log for today has been saved.'
    );
    setTodayEntry('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BookOpen className='w-5 h-5' />
          {formatDate(new Date())}
        </CardTitle>
        <CardDescription>Write about what you studied today</CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <Textarea
          placeholder='What did you study today? What concepts did you learn? Any challenges or breakthroughs?'
          value={todayEntry}
          onChange={(e) => setTodayEntry(e.target.value)}
          className='min-h-[200px]'
          aria-label='Daily study entry'
        />
      </CardContent>

      <CardFooter className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          {countWords(todayEntry)} words
        </span>
        <Button
          onClick={handleSaveEntry}
          disabled={!todayEntry.trim()}
          aria-label='Save study entry'
        >
          Save entry
        </Button>
      </CardFooter>
    </Card>
  );
}
