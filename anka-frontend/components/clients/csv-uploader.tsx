"use client";

import { useState, useRef, useEffect } from "react";
import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Trash2, FileUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SSEProvider, useSSE } from "@/hooks/use-sse";

export default function CsvUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showReplaceWarning, setShowReplaceWarning] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { openConnection, isConnected, isFinished, closeConnection } = useSSE();
  
  useEffect(() => {
    if (isFinished) {
      setIsUploading(false);
    }

    if (!isOpen) {
      closeConnection();
    }
  }, [isFinished, isOpen]);

  const preHandleUpload = () => {
    setIsOpen(!isOpen);
    openConnection();
    handleUpload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (file) setShowReplaceWarning(true);
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (file) setShowReplaceWarning(true);
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/clients/upload", { method: "POST", body: formData });

    setFile(null);
    setShowReplaceWarning(false);
  };

  const handleRemove = () => {
    setFile(null);
    setShowReplaceWarning(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 rounded-lg border"
          variant="default"
          onClick={() => preHandleUpload()}
        >
          <Upload className="h-4 w-4" />
          Importe seus Clientes
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <div className="space-y-4 py-2 text-muted-foreground">
          <div className="flex items-center w-full gap-2 mb-1">
            <div className="flex items-center whitespace-nowrap">
              <FileUp className="h-5 w-5 mr-1 text-orange-600" />
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Importe Clientes
                </DialogTitle>
              </DialogHeader>
            </div>
            <div className="flex-grow h-px border border-dashed" />
          </div>

          {/* Status da Conexão SSE */}
          <div
            className="bg-muted/30 px-3 py-2 rounded-lg border flex items-center justify-between backdrop-blur-
        transition-all duration-300 ease-out"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  isConnected ? "bg-emerald-600" : "bg-red-600"
                )}
              />
              <span className="text-sm font-medium">Status da Conexão SSE</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  isConnected
                    ? "text-emerald-600 dark:text-emerald-500"
                    : "text-red-600 dark:text-red-500"
                )}
              >
                {isConnected ? "Conectado" : "Desconectado"}
              </span>
              {!isConnected && (
                <button
                  onClick={openConnection}
                  className="text-xs text-orange-600 hover:text-orange-700 font-medium underline"
                >
                  Reconectar
                </button>
              )}
            </div>
          </div>

          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer text-center transition-all",
              isDragging
                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/5"
                : "border-muted"
            )}
          >
            <Upload className="w-6 h-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Arraste e solte o arquivo .csv aqui ou{" "}
              <span className="underline text-orange-600">
                clique para selecionar
              </span>
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </div>

          {showReplaceWarning && (
            <div className="flex items-center gap-2 bg-pink-100 dark:bg-pink-900/20 border border-pink-800 text-pink-800 dark:text-pink-300 text-sm px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              Arquivo anterior substituído.
            </div>
          )}

          {file && (
            <div className="flex items-center justify-between border border-orange-600/50 bg-orange-900/5 px-3 py-2 rounded-lg text-sm">
              <span className="truncate text-muted-foreground">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
              <button
                onClick={handleRemove}
                className="text-muted-foreground hover:text-pink-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="text-sm text-muted-foreground border-t border-dashed pt-3">
            <p className="mb-1">
              O arquivo .CSV deve conter as seguintes colunas:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>name</li>
              <li>email</li>
              <li>active</li>
              <li>asset_name</li>
              <li>invested_value</li>
              <li>at</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isUploading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading || !isConnected}
            className="bg-orange-600 text-white hover:bg-orange-400 transition-colors"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Importando...
              </>
            ) : (
              "Importar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
