import { format } from 'date-fns';

export function useDateFormat() {
  const formatDate = (date: string) => {
    return format(new Date(date), 'yyyy-MM-dd');
  }

  const formatTime = (date: string) => {
    return format(new Date(date), 'HH:mm');
  }

  const combineDateAndTime = (date: string | null, time: string | null): Date | string  => {
    if (date && time) {
      return new Date(`${date}  ${time}:00`);
    }

    if (date && !time) {
      return new Date(date)
    }
    

    return '';
  };

  return {
    formatDate,
    formatTime,
    combineDateAndTime,
  }
}