"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ClientFormBody } from "./client-modal-body";

export function CreateClient() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleCreate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));

    const reply = await fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify({ name, email, active }),
    });

    if (reply.status === 500) {
      setIsValidEmail(false);
    }

    if (reply.ok || reply.status === 201) {
      setOpen(false);
      setName("");
      setEmail("");
      setActive(true);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-lg" variant="default">
          <PlusCircle className="w-4 h-4" />
          Novo Cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <div className="space-y-4 py-2 text-muted-foreground">
          <div className="flex items-center w-full gap-2">
            <div className="flex items-center whitespace-nowrap">
              <PlusCircle className="h-5 w-5 mr-1 text-orange-600" />
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Criar Novo Cliente
                </DialogTitle>
              </DialogHeader>
            </div>
            <div className="flex-grow h-px border border-dashed" />
          </div>
        </div>

        <ClientFormBody
          name={name}
          email={email}
          active={active}
          onChangeName={setName}
          onChangeEmail={setEmail}
          onChangeActive={setActive}
          onSubmit={handleCreate}
          isValid={isValidEmail}
        />
      </DialogContent>
    </Dialog>
  );
}
