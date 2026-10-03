import {
  WatchlistApiResponse,
  WatchlistApiAsset,
} from '../model/WatchlistApiResponse';
import {WatchlistAsset, WatchlistSummary} from '../model/WatchlistAsset';

export class WatchlistMapper {
  static mapResponseToDomain(response: WatchlistApiResponse): {
    summary: WatchlistSummary;
    assets: WatchlistAsset[];
  } {
    const accountValueUsd = response.data.accountValueUsd || 0;
    const rawAssets: WatchlistApiAsset[] = response.data.assets || [];

    let totalChange24hUsd = 0;

    const assets: WatchlistAsset[] = rawAssets.map((item) => {
      const marketValueUsd = item.balance * item.priceUsd;
      const change24hUsd = marketValueUsd * (item.change24hPercent / 100);
      totalChange24hUsd += change24hUsd;

      const allocationPercent =
        accountValueUsd > 0
          ? Number(((marketValueUsd / accountValueUsd) * 100).toFixed(2))
          : 0;

      return {
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        balance: item.balance,
        priceUsd: item.priceUsd,
        change24hPercent: item.change24hPercent,
        marketValueUsd: Number(marketValueUsd.toFixed(2)),
        allocationPercent,
      };
    });

    const summaryChange24hPercent =
      accountValueUsd > 0
        ? Number(((totalChange24hUsd / accountValueUsd) * 100).toFixed(2))
        : 0;

    const summary: WatchlistSummary = {
      accountValueUsd: Number(accountValueUsd.toFixed(2)),
      change24hUsd: Number(totalChange24hUsd.toFixed(2)),
      change24hPercent: summaryChange24hPercent,
    };

    return {summary, assets};
  }
}
