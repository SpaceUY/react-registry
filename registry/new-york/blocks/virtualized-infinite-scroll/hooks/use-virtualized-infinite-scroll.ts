import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

export function useVirtualizedInfiniteScroll({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam = 0,
  estimateSize = 60,
  overscan = 5,
  enabled = true,
  getItemKey,
}: any) {

const parentRef = useRef<HTMLDivElement>(null);

const {
  status,
  data,
  error,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  refetch,
} = useInfiniteQuery({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam,
  enabled,
});

const allItems = useMemo(() => {
  return data ? data.pages.flatMap((page: any) => page.items || page.rows || page.data || []) : [];
}, [data]);

const rowVirtualizer = useVirtualizer({
  count: hasNextPage ? allItems.length + 1 : allItems.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => estimateSize,
  overscan,
  getItemKey: getItemKey ? (index: number) => {
    if (index >= allItems.length) return `loader-${index}`;
    return getItemKey(allItems[index], index);
  } : undefined,
});

useEffect(() => {
  const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

  if (!lastItem) return;

  if (
    lastItem.index >= allItems.length - 1 &&
    hasNextPage &&
    !isFetchingNextPage
  ) {
    fetchNextPage();
  }
}, [
  hasNextPage,
  fetchNextPage,
  allItems.length,
  isFetchingNextPage,
  rowVirtualizer.getVirtualItems(),
]);

return {
  //query states
  status,
  data,
  error,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  refetch,
  
  //processed data
  allItems,
  
  //virtualizer
  parentRef,
  rowVirtualizer,
  
  //helpers
  isLoaderRow: (index: number) => index >= allItems.length,
  getItem: (index: number) => allItems[index],
};
}