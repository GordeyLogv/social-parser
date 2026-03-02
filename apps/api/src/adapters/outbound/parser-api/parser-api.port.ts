export interface ParserApiPort {
  searchAccount: (handle: string, platform: string) => Promise<string>;
}
