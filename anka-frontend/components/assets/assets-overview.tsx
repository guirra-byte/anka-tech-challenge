"use client";

import { useAssets } from "@/hooks/use-assets";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Pin } from "lucide-react";

export default function AssetsOverview() {
  const { pinnedAssets } = useAssets();

  const MAX_SLOTS = 4;
  const emptySlots = MAX_SLOTS - pinnedAssets.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
      {pinnedAssets.map((asset) => (
        <Card
          key={asset.id}
          className="bg-white/5 border border-border dark:bg-zinc-900 overflow-hidden rounded-xl shadow-sm"
        >
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground tracking-wide">
                  {asset.name}
                </h2>
                <p className="text-xs text-muted-foreground">Ativo Financeiro</p>
              </div>
              <span
                className={`text-sm font-mono ${
                  asset.variation >= 0 ? "text-emerald-500" : "text-pink-500"
                }`}
              >
                {asset.variation >= 0 ? "+" : ""}
                {asset.variation.toFixed(2)}%
              </span>
            </div>

            <div>
              <p className="text-xl font-semibold text-foreground font-mono">
                R$ {(asset.mockHistory.at(-1)?.amount ?? 0).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">Valor estimado</p>
            </div>

            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={asset.mockHistory}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v: number) => `R$ ${v.toFixed(2)}`}
                    labelFormatter={(label) => `Dia: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke={asset.variation >= 0 ? "#10B981" : "#EC4899"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}

      {Array.from({ length: emptySlots }).map((_, i) => (
        <Card
          key={`empty-${i}`}
          className="bg-zinc-100/50 dark:bg-zinc-800/30 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-center h-52"
        >
          <CardContent className="flex flex-col items-center justify-center text-orange-600 text-sm gap-2 p-4">
            <Pin className="w-5 h-5" />
            <p>
              Slot disponível <br />
              para fixar ativo
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}