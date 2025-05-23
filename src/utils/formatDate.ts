import { format, formatDistanceToNow } from 'date-fns';

// Formate la date au format 'yyyy-MM-dd' et renvoie la chaîne de caractères
// ===========================================================================================
export const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

// Compte le temps écoulé depuis la date donnée et renvoie une chaîne de caractères
// ===========================================================================================
export const timeAgo = (date: Date): string =>
  formatDistanceToNow(date, { addSuffix: true });
