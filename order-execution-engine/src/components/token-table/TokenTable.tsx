"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTokens, Token } from "./data";
import { getColumns } from "./columns";
import { TokenDetailsModal } from "./TokenDetailsModal";

// Skeleton component for loading state
const TableSkeleton = ({ columnsLength }: { columnsLength: number }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columnsLength }).map((_, i) => (
            <TableHead key={i}>
              <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => ( // 5 rows of skeleton
          <TableRow key={i}>
            {Array.from({ length: columnsLength }).map((_, j) => (
              <TableCell key={j}>
                <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

interface TokenTableProps<TValue> {}

export function TokenTable<TValue>({}: TokenTableProps<Token, TValue>) {
  const [data, setData] = React.useState<Token[]>([]); // Initialize with empty array
  const [isLoading, setIsLoading] = React.useState(true); // Loading state
  const [priceChanges, setPriceChanges] = React.useState<
    Record<string, "up" | "down" | null>
  >({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState<Token | null>(null);

  React.useEffect(() => {
    // Simulate data fetching
    const fetchTimeout = setTimeout(() => {
      setData(mockTokens);
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds loading time

    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((token) => {
          const change = (Math.random() - 0.5) * 10;
          const newPrice = Math.max(0, token.price + change);
          const newChange24h = (Math.random() - 0.5) * 5;

          setPriceChanges((prevChanges) => ({
            ...prevChanges,
            [token.id]:
              newPrice > token.price
                ? "up"
                : newPrice < token.price
                ? "down"
                : null,
          }));

          return {
            ...token,
            price: parseFloat(newPrice.toFixed(2)),
            change24h: parseFloat(newChange24h.toFixed(2)),
          };
        })
      );
    }, 2000);

    return () => {
      clearTimeout(fetchTimeout);
      clearInterval(interval);
    };
  }, []);

  const columns = getColumns(priceChanges);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handleRowClick = (token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <TableSkeleton columnsLength={columns.length} />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original as Token)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TokenDetailsModal
        token={selectedToken}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}