import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Target, CalendarDays, BookOpen, TrendingUp } from 'lucide-react';

interface StudyEntry {
  date: string;
  content: string;
  wordCount: number;
}

interface TodayTabProps {
  entries: StudyEntry[];
}

export default function StatisticsTab({ entries }: TodayTabProps) {
  const calculateStats = () => {
    if (entries.length === 0) {
      return { currentStreak: 0, firstDay: null, totalDays: 0, totalWords: 0 };
    }

    const uniqueDates = Array.from(new Set(entries.map((e) => e.date))); // Remove duplicates
    const sortedDates = uniqueDates
      .map((date) => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime());

    let currentStreak = 0;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
      const entryDate = new Date(sortedDates[i]);
      entryDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(todayDate);
      expectedDate.setDate(todayDate.getDate() - i);

      if (entryDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      currentStreak,
      firstDay: sortedDates[sortedDates.length - 1],
      totalDays: uniqueDates.length,
      totalWords: entries.reduce((sum, entry) => sum + entry.wordCount, 0),
    };
  };

  const stats = calculateStats();

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Current Streak
            </CardTitle>
            <Target className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.currentStreak}</div>
            <p className='text-xs text-muted-foreground'>consecutive days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Days</CardTitle>
            <CalendarDays className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalDays}</div>
            <p className='text-xs text-muted-foreground'>with entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Words</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.totalWords.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>words written</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Journey Started
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.firstDay
                ? stats.firstDay.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'N/A'}
            </div>
            <p className='text-xs text-muted-foreground'>first entry</p>
          </CardContent>
        </Card>
      </div>

      {stats.totalDays > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Average words per day:</span>
                <span className='font-medium'>
                  {Math.round(stats.totalWords / stats.totalDays)}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Days since first entry:</span>
                <span className='font-medium'>
                  {stats.firstDay
                    ? Math.ceil(
                        (new Date().getTime() - stats.firstDay.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 0}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Consistency rate:</span>
                <span className='font-medium'>
                  {stats.firstDay
                    ? Math.round(
                        (stats.totalDays /
                          Math.ceil(
                            (new Date().getTime() - stats.firstDay.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
