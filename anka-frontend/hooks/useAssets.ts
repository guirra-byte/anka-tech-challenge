import { useEffect, useState } from "react";

type Asset = {
  id: string;
  name: string;
  variation: number;
  mockHistory: { day: string; amount: number }[];
};

const ASSETS_KEY = "cachedAssets";
const PINNED_KEY = "pinnedAssets";
const MAX_PINNED = 4;

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem(ASSETS_KEY);
    if (cached) {
      try {
        setAssets(JSON.parse(cached));
        return;
      } catch {}
    }

    fetch("/api/assets")
      .then((res) => res.json())
      .then((data: { id: string; name: string }[]) => {
        const enriched: Asset[] = data.map((a) => ({
          ...a,
          variation: Math.random() * 4 - 2,
          mockHistory: Array.from({ length: 7 }, (_, i) => ({
            day: `D${i + 1}`,
            amount: Math.random() * 100 + 50,
          })),
        }));

        setAssets(enriched);
        localStorage.setItem(ASSETS_KEY, JSON.stringify(enriched));
      });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(PINNED_KEY);
    if (stored) {
      try {
        setPinnedIds(JSON.parse(stored));
      } catch {
        setPinnedIds([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PINNED_KEY, JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  const togglePin = (id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((t) => t !== id);
      } else {
        if (prev.length >= MAX_PINNED) return prev;
        return [...prev, id];
      }
    });
  };

  const pinnedAssets = assets.filter((a) => pinnedIds.includes(a.id));
  return { assets, pinned: pinnedIds, pinnedAssets, togglePin };
}
