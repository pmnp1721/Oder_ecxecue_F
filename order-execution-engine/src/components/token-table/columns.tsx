"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Token } from "./data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover components

export const getColumns = (
  priceChanges: Record<string, "up" | "down" | null>
): ColumnDef<Token>[] => {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const token = row.original;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-medium">{token.name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Full Name: {token.name}</p>
                <p>Symbol: {token.symbol}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "symbol",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Symbol
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const token = row.original;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="px-0">
                {token.symbol}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{token.name} ({token.symbol})</h4>
                  <p className="text-sm text-muted-foreground">
                    Token details at a glance.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <p className="text-sm font-medium leading-none">Price:</p>
                    <p className="col-span-2 text-sm">${token.price.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <p className="text-sm font-medium leading-none">24h Change:</p>
                    <p className="col-span-2 text-sm">{token.change24h}%</p>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <p className="text-sm font-medium leading-none">Market Cap:</p>
                    <p className="col-span-2 text-sm">${token.marketCap.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const token = row.original;
        const changeType = priceChanges[token.id];
        return (
          <div
            className={cn(
              "font-medium transition-colors duration-500",
              changeType === "up" && "text-green-500",
              changeType === "down" && "text-red-500"
            )}
          >
            {token.price.toFixed(2)}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "change24h",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            24h Change
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "volume24h",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            24h Volume
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "marketCap",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Market Cap
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      enableSorting: true,
    },
  ];
};
