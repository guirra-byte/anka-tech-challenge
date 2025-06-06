"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Loader2, RefreshCw, Zap } from "lucide-react"

interface BackendStatusProps {
  healthEndpoint?: string
  checkInterval?: number
}

type StatusType = "loading" | "healthy" | "error"

export default function BackendStatus({ healthEndpoint = "/api/health", checkInterval = 30000 }: BackendStatusProps) {
  const [status, setStatus] = useState<StatusType>("loading")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkHealth = async (manual = false) => {
    if (manual) setIsRefreshing(true)
    const startTime = Date.now()

    try {
      const response = await fetch(healthEndpoint, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      const endTime = Date.now()
      const duration = endTime - startTime

      setResponseTime(duration)
      setLastChecked(new Date())

      if (response.ok) {
        setStatus("healthy")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
      setLastChecked(new Date())
      setResponseTime(null)
    } finally {
      if (manual) {
        setTimeout(() => setIsRefreshing(false), 300)
      }
    }
  }

  useEffect(() => {
    checkHealth()
    const interval = setInterval(() => checkHealth(), checkInterval)
    return () => clearInterval(interval)
  }, [healthEndpoint, checkInterval])

  const getStatusConfig = () => {
    switch (status) {
      case "healthy":
        return {
          icon: CheckCircle,
          text: "Serviços estão Operacionais",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/20",
          iconColor: "text-emerald-500",
          textColor: "text-white-700",
          dotColor: "bg-emerald-500",
          buttonColor: "bg-emerald-600/20 hover:bg-emerald/80 border border-emerald-600/30"
        }
      case "error":
        return {
          icon: XCircle,
          text: "Serviços estão Indisponíveis",
          bgColor: "bg-red-600/10",
          borderColor: "border-red-600/20",
          iconColor: "text-red-600",
          textColor: "text-white-700",
          dotColor: "bg-red-600",
          buttonColor: "bg-red-600/20 hover:bg-red/80 border border-red-600/30"
        }
      default:
        return {
          icon: Loader2,
          text: "Checando Serviços...",
          bgColor: "bg-blue-600/10",
          borderColor: "border-blue-600/20",
          iconColor: "text-blue-600",
          textColor: "text-white-700",
          dotColor: "bg-blue-600",
          buttonColor: "bg-blue-600/20 hover:bg-blue/80 border border-blue-600/30"
        }
    }
  }

  const config = getStatusConfig()
  const StatusIcon = config.icon

  return (
    <div className="w-full">
      <div
        className={`
        flex items-center justify-between px-4 py-2.5 rounded-lg border backdrop-blur-sm
        ${config.bgColor} ${config.borderColor}
        transition-all duration-300 ease-out
      `}
      >
        <div className="flex items-center space-x-3">
          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <StatusIcon className={`h-4 w-4 ${config.iconColor} ${status === "loading" ? "animate-spin" : ""}`} />
              {status === "healthy" && (
                <div className={`absolute -top-0.5 -right-0.5 h-2 w-2 ${config.dotColor} rounded-full animate-pulse`} />
              )}
            </div>
            <span className={`text-sm font-medium ${config.textColor}`}>{config.text}</span>
          </div>

          {/* Metrics */}
          <div className="hidden sm:flex items-center space-x-4 text-xs text-muted-foreground">
            {responseTime && (
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span className="font-mono">{responseTime}ms</span>
              </div>
            )}
            {lastChecked && <span>Atualizado {lastChecked.toLocaleTimeString()}</span>}
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => checkHealth(true)}
          disabled={status === "loading" || isRefreshing}
          className={`
            flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 ease-out
            ${config.textColor} ${" "} ${config.buttonColor}
          `}
        >
          <RefreshCw
            className={`h-3 w-3 transition-transform duration-200 ${isRefreshing ? "animate-spin" : "hover:rotate-180"}`}
          />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-gray-200/50 rounded-full overflow-hidden mt-1">
        <div
          className={`
          h-full transition-all duration-1000 ease-out rounded-full
          ${status === "healthy" ? "bg-gradient-to-r from-emerald-500 to-green-600 w-full" : ""}
          ${status === "error" ? "bg-gradient-to-r from-red-500 to-rose-600 w-full" : ""}
          ${status === "loading" ? "bg-gradient-to-r from-blue-500 to-indigo-600 w-1/3 animate-pulse" : ""}
        `}
        />
      </div>
    </div>
  )
}
