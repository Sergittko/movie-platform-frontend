import { toast } from 'sonner';

const toastDurationMS = 3000;

export const successToast = (message: string) =>
  toast.success(message, { duration: toastDurationMS });

export const errorToast = (message: string) => toast.error(message, { duration: toastDurationMS });
