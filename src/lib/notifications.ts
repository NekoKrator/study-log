import { toast } from 'sonner';

export default function notifyCustom(message: string, description?: string) {
  toast(message, {
    description,
  });
}