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

export default function TodayTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <BookOpen />
          {formatDate(new Date())}
        </CardTitle>
        <CardDescription>Write about what you studied today</CardDescription>
      </CardHeader>

      <CardContent>
        <Textarea />
      </CardContent>

      <CardFooter>
        <span>0 words</span>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
