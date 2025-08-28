// src/app/search/loading.tsx
export default function Loading() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <div className="animate-pulse space-y-3">
        <div className="h-6 w-40 rounded bg-gray-200" />
        <div className="h-24 w-full rounded bg-gray-200" />
        <div className="h-24 w-full rounded bg-gray-200" />
      </div>
    </main>
  );
}
