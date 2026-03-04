export const confirmAccountSuccessMessage = (accountUrl: string): string => {
  return `Greate, account:\n${accountUrl}\nsuccess added`;
};

export const confirmAccountFailedMessage = (accountUrl: string): string => {
  return `Okay, since account:\n${accountUrl}\nnot your, shall we try again?`;
};
