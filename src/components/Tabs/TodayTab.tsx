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

export default function TodayTab({ setEntries }: TabWithSetterProps) {
  const [todayEntry, setTodayEntry] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('entries');
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to parse entries from localStorage:', error);
      setEntries([]);
    }
  }, [setEntries]);

  const wordCount = todayEntry.trim()
    ? todayEntry
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    : 0;

  const today = formatDateKey(new Date());

  const saveEntry = () => {
    const trimmed = todayEntry.trim();
    if (!trimmed) return;

    const newEntry = { date: today, content: trimmed, wordCount };
    try {
      const saved: StudyEntry[] = JSON.parse(
        localStorage.getItem('entries') || '[]'
      );
      const filtered = saved.filter((e) => e.date !== today);
      const updated = [...filtered, newEntry].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      localStorage.setItem('entries', JSON.stringify(updated));
      setEntries(updated);
      setTodayEntry('');
    } catch (error) {
      console.error('Failed to save entry to localStorage:', error);
    }
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
          onClick={saveEntry}
          disabled={!todayEntry.trim()}
          aria-label='Save study entry'
        >
          Save entry
        </Button>
      </CardFooter>
    </Card>
  );
}
