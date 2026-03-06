export const youtubeUrlMapper = (baseUrl: string, key: string, handle: string): string => {
  return `${baseUrl}/channels?part=snippet,statistics&forHandle=${handle}&key=${key}`;
};
