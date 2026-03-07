export const youtubeUrlMapper = (baseUrl: string, key: string, handle: string): string => {
  const items = 'id,snippet,statistics';
  const fieldSnippet = 'id,snippet(title,customUrl)';
  const fieldStatistics = 'statistics(subscriberCount,videoCount)';

  return `${baseUrl}/channels?part=${items}&forHandle=${handle}&fields=items(${fieldSnippet},${fieldStatistics})&key=${key}`;
};
