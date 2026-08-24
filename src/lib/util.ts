import { QueryFailedError, TypeORMError } from 'typeorm';

export const handleError = (error: unknown): string => {
  if (error instanceof QueryFailedError) {
    return 'An unexpected error occurred while doing operations with the database';
  }

  if (error instanceof TypeORMError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error !== null && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: unknown }).message;

    if (typeof message === 'string') {
      return message;
    }
  }

  return 'An unexpected error occurred';
};
