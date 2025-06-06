// components/client/ClientFormBody.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { PlusCircle, Save } from "lucide-react";

interface ClientFormBodyProps {
  name: string;
  email: string;
  active: boolean;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangeActive: (v: boolean) => void;
  onSubmit: () => void;
  isEdit?: boolean;
  isValid: boolean;
}

export function ClientFormBody({
  name,
  email,
  active,
  onChangeName,
  onChangeEmail,
  onChangeActive,
  onSubmit,
  isEdit = false,
  isValid,
}: ClientFormBodyProps) {
  return (
    <div className="space-y-4 text-muted-foreground">
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Ex: João da Silva"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
          />

          {!isValid && (
            <p className="text-xs text-red-500 mt-1">E-mail inválido</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Cliente Ativo?</Label>
          <Switch checked={active} onCheckedChange={onChangeActive} />
        </div>
      </div>

      <DialogFooter className="gap-2 sm:justify-end">
        <DialogClose asChild>
          <Button variant="outline" className="rounded-lg">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          onClick={onSubmit}
          disabled={!name || !email}
          className="rounded-lg bg-orange-600 text-white hover:bg-orange-500"
        >
          {isEdit ? "Salvar" : "Criar Cliente"}
        </Button>
      </DialogFooter>
    </div>
  );
}
