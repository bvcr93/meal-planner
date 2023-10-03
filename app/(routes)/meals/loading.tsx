import Spinner from "@/components/ui/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
