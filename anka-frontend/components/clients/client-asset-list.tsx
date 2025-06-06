import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import React from "react"

interface Allocation {
    id: number;
    assetId: string;
    clientId: string;
    at: string;
    investedValue: string;
    Asset: {
      id: string;
      name: string;
      amount: string;
    };
}

interface ClientAssetListProps {
  allocations: Allocation[]
  className?: string
}

export default function ClientAssetList({ allocations, className }: ClientAssetListProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      {allocations.map((allocation, index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-white dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
        >
          <div>
            <h4 className="text-sm font-semibold text-foreground">{allocation.Asset.name}</h4>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="font-mono"><strong>Valor Investido:</strong> R$ {parseFloat(allocation.investedValue).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {allocation.at}
          </div>
        </div>
      ))}
    </div>
  )
}
