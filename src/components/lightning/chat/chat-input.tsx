"use client";

import { useState } from "react";

interface Props {
  onSend: (content: string) => void;
}

export function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        className="flex-1 border rounded px-2 py-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="bg-black text-white px-3 py-1 rounded"
        onClick={handleSend}
      >
        전송
      </button>
    </div>
  );
}
