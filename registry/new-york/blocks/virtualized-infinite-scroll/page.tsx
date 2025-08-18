import { InfiniteTable } from "./components/InfiniteTable";

export default function VirtualInfiniteDemo() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold text-white/90 mb-2">
        Virtual Infinite Scroll
      </h1>
      <InfiniteTable />
    </div>
  );
}