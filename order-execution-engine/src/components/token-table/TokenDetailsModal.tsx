"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Token } from "./data";

interface TokenDetailsModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TokenDetailsModal({
  token,
  isOpen,
  onClose,
}: TokenDetailsModalProps) {
  if (!token) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{token.name} ({token.symbol})</DialogTitle>
          <DialogDescription>
            Detailed information for {token.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Current Price:</span>
            <span className="col-span-2 text-sm">${token.price.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">24h Change:</span>
            <span className="col-span-2 text-sm">{token.change24h}%</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">24h Volume:</span>
            <span className="col-span-2 text-sm">${token.volume24h.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Market Cap:</span>
            <span className="col-span-2 text-sm">${token.marketCap.toLocaleString()}</span>
          </div>
          {/* Add more token details here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
