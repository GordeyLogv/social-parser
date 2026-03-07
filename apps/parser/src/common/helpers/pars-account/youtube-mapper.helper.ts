import { SearchAccountResponse, YouTubeChannelResponse } from '@app/contracts';

export const youtubeMapperParsedAccount = (channel: YouTubeChannelResponse, inputHandle: string): SearchAccountResponse => {
  const item = channel.items[0];

  return {
    platform: 'youtube',
    handle: item.snippet.customUrl ?? inputHandle,
    url: `https://www.youtube.com/channel/${item.id}`,
    title: item.snippet.title,
    subscribers: Number(item.statistics.subscriberCount ?? 0),
    videoCount: Number(item.statistics.videoCount ?? 0),
  };
};
