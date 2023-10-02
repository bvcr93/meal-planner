import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
