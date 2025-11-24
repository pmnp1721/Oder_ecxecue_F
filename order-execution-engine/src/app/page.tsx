// src/app/page.tsx
import { TokenTable } from "@/components/token-table/TokenTable";
import { columns } from "@/components/token-table/columns";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-16 gap-y-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-8">Token Trading Table</h1>
      <div className="w-full max-w-5xl"> {/* Removed justify-between and lg:flex */}
        <TokenTable columns={columns} />
      </div>
    </main>
  );
}