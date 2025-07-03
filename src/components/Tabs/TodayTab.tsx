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
import { formatDate } from '@/lib/formatDate';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StudyEntry {
  date: string;
  content: string;
  wordCount: number;
}

export default function TodayTab() {
  const [todayEntry, setTodayEntry] = useState('');
  const [entries, setEntries] = useState<StudyEntry[]>([]);

  const wordCount = todayEntry.trim()
    ? todayEntry.trim().split(/\s+/).length
    : 0;
  const today = new Date().toLocaleDateString();

  const saveEntry = () => {
    const trimmed = todayEntry.trim();
    if (!trimmed) return;

    const newEntry = { date: today, content: trimmed, wordCount };
    const saved = JSON.parse(localStorage.getItem('entries') || '[]');
    const filtered = saved.filter((e: any) => e.date !== today);
    const updated = [...filtered, newEntry].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    localStorage.setItem('entries', JSON.stringify(updated));
    setEntries(updated);
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem('entries');
    if (savedEntries) {
      const entries: StudyEntry[] = JSON.parse(savedEntries);
      const todayEntryObj = entries.find((entry) => entry.date === today);
      if (todayEntryObj) {
        setTodayEntry(todayEntryObj.content);
      }
      setEntries(entries);
    }
  }, []);

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
        />
      </CardContent>

      <CardFooter className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          {todayEntry.trim() ? `${wordCount} words` : '0 words'}
        </span>
        <Button onClick={saveEntry} disabled={!todayEntry.trim()}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
