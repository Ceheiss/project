"use client";

import { useEffect, useState } from "react";

export default function NoteDetails({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Note Details</h1>
      <p>Note ID: {id}</p>
    </div>
  );
}
