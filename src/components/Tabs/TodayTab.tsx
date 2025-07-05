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

function loadEntries(): StudyEntry[] {
  try {
    const saved = localStorage.getItem('entries');
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    console.error('Failed to parse entries from localStorage');
    return [];
  }
}

function saveEntries(entries: StudyEntry[]) {
  try {
    localStorage.setItem('entries', JSON.stringify(entries));
  } catch {
    console.error('Failed to save entries to localStorage');
  }
}

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

export default function TodayTab({ setEntries }: TabWithSetterProps) {
  const [todayEntry, setTodayEntry] = useState('');

  const today = formatDateKey(new Date());
  const trimmed = todayEntry.trim();

  useEffect(() => {
    const entries = loadEntries();
    setEntries(entries);
  }, [setEntries]);

  const wordCount = todayEntry.trim()
    ? todayEntry
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    : 0;

  const handleSaveEntry = () => {
    if (!trimmed) return;

    const newEntry: StudyEntry = {
      date: today,
      content: trimmed,
      wordCount: countWords(todayEntry),
    };

    const entries = loadEntries();
    const filtered = entries.filter((e) => e.date !== today);
    const updated = [...filtered, newEntry].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    saveEntries(updated);
    setEntries(updated);
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
          {todayEntry.trim() ? `${wordCount} words` : '0 words'}
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
