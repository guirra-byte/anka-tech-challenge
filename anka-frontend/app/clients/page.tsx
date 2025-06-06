import BackendStatus from "@/components/ankaui/backend-health";
import Layout from "@/components/ankaui/layout";
import ClientsTable from "@/components/clients/clients-table";
import { CreateClient } from "@/components/clients/create-client";
import CsvUploader from "@/components/clients/csv-uploader";
import AssetsOverview from "../../components/assets/assets-overview";

export default function ClientsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="top-0 z-50 backdrop-blur-lg border-b border-dashed">
          <div className="mx-auto w-full">
            <BackendStatus />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Carteira de Clientes
          </h1>

          <div className="flex-grow h-px border border-dashed" />
          <CreateClient />
          <CsvUploader />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="order-2 lg:order-1 lg:col-span-3">
            <ClientsTable />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-1">
            <AssetsOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
