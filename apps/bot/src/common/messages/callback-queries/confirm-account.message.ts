export const confirmAccountSuccessMessage = (accountUrl: string): string => {
  return `Отлично, аккаунт:\n${accountUrl}\nуспешно добавлен`;
};

export const confirmAccountFailedMessage = (accountUrl: string): string => {
  return `Хорошо, раз аккаунт:\n${accountUrl}\nне твой, попробуем ещё раз?`;
};
