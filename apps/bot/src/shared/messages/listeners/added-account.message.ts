export const addedAccountListenerMessage = (platform: string, accountName: string) => {
  return 'Аккаунт получен\n' + `Платформа: ${platform},\n` + `Никнейм: ${accountName}`;
};
