"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Loader2,
  MoreHorizontal,
  Search,
  UserPlus,
  WalletCards,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ClientAssetList from "./client-asset-list";
import { format } from "date-fns";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useSSE } from "@/hooks/use-sse";

export type Client = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
  imported: boolean;
  Allocation: {
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
  }[];
};

export default function ClientsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalType, setModalType] = useState<"assets" | "edit" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [paginatedClients, setPaginatedClients] = useState<Client[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalClients: 0,
    totalAssets: 0,
    totalUnactiveClients: 0,
  });

  const [counter, setCounter] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [retryKey, setRetryKey] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_ATTEMPTS = 3;

  const { isFinished } = useSSE();
  const fetchDashboardMetrics = async () => {
    const replyDashboard = await fetch("/api/dashboard/metrics");
    if (replyDashboard.ok) {
      const metrics = await replyDashboard.json();
      setDashboardMetrics(metrics);
    }
  };

  const fetchClients = async (page = 1) => {
    try {
      const res = await fetch("/api/clients/page", {
        method: "POST",
        body: JSON.stringify({ page }),
      });

      if (res.status === 200) {
        const { clients, count } = await res.json();
        setTotalPages(Math.ceil(count / clients.length));
        setPaginatedClients(clients);
        setAttempts(0);
        setCounter(0);
      } else {
        useRetriableFetch(res.status);
      }
    } catch (e) {
      console.error("Erro ao buscar clientes:", e);
    }
  };

  const useRetriableFetch = (httpStatus: number, successStatus = 200) => {
    if (httpStatus === successStatus || attempts > MAX_ATTEMPTS) return;
    const newAttempts = attempts + 1;
    const newDelay = newAttempts * 5;
    setAttempts(newAttempts);
    setCounter(newDelay);
  };

  useEffect(() => {
    if (attempts === 0 || attempts >= MAX_ATTEMPTS) return;
    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRetryKey((k) => k + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [attempts]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      await fetchClients(currentPage);
      await fetchDashboardMetrics();
      setLoading(false);
    };

    fetchAll();
  }, [currentPage, retryKey, isFinished]);

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient.name);
      setEmail(selectedClient.email);
      setActive(selectedClient.active);
    }
  }, [selectedClient]);

  const handleEdit = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(email);
    setIsValidEmail(valid);

    if (!valid || !selectedClient) return;

    const res = await fetch("/api/clients", {
      method: "PATCH",
      body: JSON.stringify({
        id: selectedClient.id,
        name,
        email,
        active,
        page: currentPage,
      }),
    });

    if (res.ok || res.status === 201) {
      closeModal();

      await fetchClients(currentPage);
      const replyDashboard = await fetch("/api/dashboard/metrics");
      if (replyDashboard.ok) {
        const metrics = await replyDashboard.json();
        setDashboardMetrics(metrics);
      }
    }

    if (res.status === 500) setIsValidEmail(false);
  };

  const openModal = (client: Client, type: "assets" | "edit") => {
    setSelectedClient(client);
    setModalType(type);
  };

  const closeModal = () => {
    setIsValidEmail(true);
    setName("");
    setEmail("");
    setActive(false);
    setSelectedClient(null);
    setModalType(null);
  };

  const filteredClients = paginatedClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {/* Total de Clientes */}
        <Card className="relative bg-white/5 border border-border shadow-sm dark:bg-zinc-900 overflow-hidden">
          <div className="h-1 bg-emerald-600" />

          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    Clientes Totais
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold text-foreground">
                    {dashboardMetrics.totalClients}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-emerald-600 border-emerald-500 dark:text-emerald-400"
                  >
                    {dashboardMetrics.totalClients -
                      dashboardMetrics.totalUnactiveClients}{" "}
                    ativos
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  Cadastrados na base
                </p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2 rounded-full">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border border-border shadow-sm dark:bg-zinc-900 overflow-hidden">
          <div className="h-1 bg-red-600"></div>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Clientes Inativos
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold text-red-500">
                    {dashboardMetrics.totalUnactiveClients}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-500 dark:text-red-400"
                  >
                    Inativos
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Aguardando ativação
                </p>
              </div>
              <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-2 rounded-full">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total de Ativos */}
        <Card className="bg-white/5 border border-border shadow-sm dark:bg-zinc-900 overflow-hidden">
          <div className="h-1 bg-blue-600"></div>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Ativos Cadastrados
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold text-blue-500">
                    {dashboardMetrics.totalAssets}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-500 dark:text-blue-400"
                  >
                    Diversificados
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Na base de dados
                </p>
              </div>
              <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-2 rounded-full">
                <BarChart2 className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clientes Inativos */}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-orange-500 dark:text-orange-400" />
          <Input
            placeholder="Filtre por Nome, Email ou ID..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-[#1F1F23]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="tracking-wider uppercase">Name</TableHead>
                <TableHead className="tracking-wider uppercase">
                  Email
                </TableHead>
                <TableHead className="tracking-wider uppercase">
                  Data de Criação
                </TableHead>
                <TableHead className="tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="text-right tracking-wider uppercase">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 && !loading ? (
                filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="hover:bg-muted/50 h-12 border-b border-dashed"
                  >
                    <TableCell className="py-1 font-medium whitespace-nowrap px-6">
                      <div>
                        <div className="text-sm font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <span className="mr-1">ClientID</span>
                          <span className="font-mono text-orange-600">
                            {client.id}
                          </span>
                          {client.active ? (
                            <div className="w-2 h-2 bg-emerald-600 rounded-full ml-2 animate-pulse"></div>
                          ) : (
                            <div className="w-2 h-2 bg-red-600 rounded-full ml-2"></div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-1 border-dashed">
                      {client.email}
                    </TableCell>
                    <TableCell className="py-1 align-center justify-center border-dashed text-xs text-muted-foreground font-mono">
                      <div>
                        {format(
                          new Date(client.createdAt),
                          "dd/MM/yyyy 'às' HH:mm"
                        )}
                      </div>
                      <div className="text-[11px] text-orange-600 font-mono">
                        {client.imported
                          ? "Importado via .csv"
                          : "Criado manualmente"}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {client.active === true ? (
                          <Badge className="bg-green-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-600">
                            <Activity className="h-3 w-3 mr-1" />
                            Ativo
                          </Badge>
                        ) : (
                          <Badge className="bg-pink-100 text-red-700 border-red-600 dark:bg-red-900/50 dark:text-red-400">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Inativo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-1 text-right">
                      <DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => openModal(client, "assets")}
                            >
                              <BarChart2 className="w-4 h-4 mr-2 text-muted-foreground" />
                              Ver Informações
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openModal(client, "edit")}
                            >
                              <WalletCards className="w-4 h-4 mr-2 text-muted-foreground" />
                              Editar Cliente
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-orange-600">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {attempts >= MAX_ATTEMPTS ? (
                          <p className="text-red-600">
                            Erro ao carregar os dados. Tente novamente mais
                            tarde.
                          </p>
                        ) : counter > 0 ? (
                          <>
                            {" "}
                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />{" "}
                            <p className="text-orange-600">
                              Nova tentativa em T-{counter}s (tentativa{" "}
                              {attempts}/{MAX_ATTEMPTS})
                            </p>
                          </>
                        ) : attempts > 0 ? (
                          <>
                            {" "}
                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                            <p className="text-orange-600">
                              Carregando os dados dos seus Clientes...
                            </p>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                            <p className="text-orange-600">
                              Carregando os dados dos seus Clientes...
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between p-4 border-t border-dashed">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Página Anterior
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima Página
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedClient} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-lg">
          <div className="space-y-4 text-muted-foreground">
            {/* Header do Modal */}
            <div className="flex items-center w-full gap-2 mb-1">
              <div className="flex items-center whitespace-nowrap">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    <div className="flex flex-row items-center">
                      <WalletCards className="h-5 w-5 mr-1 text-orange-600" />
                      <span>{selectedClient?.name}</span>
                    </div>

                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      {modalType === "edit" && selectedClient && (
                        <>
                          <span className="mr-1">ClientID</span>
                          <span className="font-mono text-orange-600">
                            {selectedClient.id}
                          </span>
                        </>
                      )}

                      {modalType === "edit" &&
                        selectedClient &&
                        selectedClient.active && (
                          <div className="w-2 h-2 bg-emerald-600 rounded-full ml-2"></div>
                        )}

                      {modalType === "edit" &&
                        selectedClient &&
                        !selectedClient.active && (
                          <div className="w-2 h-2 bg-red-600 rounded-full ml-2"></div>
                        )}
                    </div>
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>

            {/* Conteúdo: Visualizar Alocações */}
            {modalType === "assets" && selectedClient && (
              <div className="space-y-6 text-sm text-muted-foreground">
                {/* Informações do Cliente */}
                <section className="space-y-1">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                    Informações do Cliente
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <Info label="Nome" value={selectedClient.name} />
                    <Info label="Email" value={selectedClient.email} />
                    <Info
                      label="Total Investido"
                      value={new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        selectedClient.Allocation.reduce(
                          (acc, asset) => acc + Number(asset.investedValue),
                          0
                        )
                      )}
                    />
                    <Info
                      label="Diversidade dos Ativos"
                      value={selectedClient.Allocation.length}
                    />
                    <div>
                      <p className="text-[13px] font-medium text-foreground mb-1">
                        Status
                      </p>
                      {selectedClient.active === true ? (
                        <Badge className="bg-green-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-600">
                          <Activity className="h-3 w-3 mr-1" />
                          Ativo
                        </Badge>
                      ) : (
                        <Badge className="bg-pink-100 text-red-700 border-red-600 dark:bg-red-900/50 dark:text-red-400">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Inativo
                        </Badge>
                      )}
                    </div>
                    <Info
                      label="Data de Entrada"
                      value={format(
                        new Date(selectedClient.createdAt),
                        "dd/MM/yyyy 'às' HH:mm"
                      )}
                    />
                  </div>
                </section>

                {/* Alocações */}
                {selectedClient.Allocation.length > 0 && (
                  <section className="space-y-2 border-t border-dashed pt-3">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      Alocações de Ativos
                    </h3>
                    <ClientAssetList
                      allocations={selectedClient.Allocation}
                      className="max-h-[250px] overflow-y-auto pr-2"
                    />
                  </section>
                )}

                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            )}

            {modalType === "edit" && selectedClient && (
              <section className="space-y-4">
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Ex: João da Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="cliente@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isValidEmail && (
                      <p className="text-xs text-red-500 mt-1">
                        E-mail inválido
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Cliente Ativo?
                    </Label>
                    <Switch
                      defaultChecked={selectedClient.active}
                      checked={active}
                      onCheckedChange={setActive}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                  <DialogClose asChild>
                    <Button variant="outline" className="rounded-lg">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleEdit}
                    disabled={
                      !name ||
                      !email ||
                      (name === selectedClient.name &&
                        email === selectedClient.email &&
                        active === selectedClient.active)
                    }
                    className="rounded-lg bg-orange-600 text-white hover:bg-orange-500"
                  >
                    Salvar
                  </Button>
                </DialogFooter>
              </section>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-foreground mb-1">{label}</p>
      <p>{value}</p>
    </div>
  );
}
