import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatDate';

interface StudyEntry {
  date: string;
  content: string;
  wordCount: number;
}

interface TodayTabProps {
  entries: StudyEntry[];
}

export default function PastEntriesTab({ entries }: TodayTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Entries</CardTitle>
        <CardDescription>Browse through your study journey</CardDescription>
      </CardHeader>

      <CardContent>
        {entries.length === 0 ? (
          <p className='text-muted-foreground text-center py-8'>
            No entries yet. Start by writing your first entry in the Today tab!
          </p>
        ) : (
          <ScrollArea className='h-[500px] w-full'>
            <div className='space-y-4'>
              {entries.map((entry) => (
                <Card key={entry.date} className='p-5'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-semibold'>
                      {formatDate(new Date(entry.date))}
                    </h3>
                    <Badge variant='outline'>{entry.wordCount} words</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                    {entry.content}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
