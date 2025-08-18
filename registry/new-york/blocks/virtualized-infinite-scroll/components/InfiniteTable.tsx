import { useVirtualizedInfiniteScroll } from '../hooks/use-virtualized-infinite-scroll';  
import type { User } from '../types/user.type';
import { fetchUsers } from '../lib/user';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

export function InfiniteTable() {

  const {
    status,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    allItems: users,
    parentRef,
    rowVirtualizer,
    isLoaderRow,
    getItem,
    refetch,
  } = useVirtualizedInfiniteScroll({
    queryKey: ['users'],
    queryFn: ({ pageParam }: { pageParam: number }) => fetchUsers(20, pageParam),
    getNextPageParam: (lastPage: any) => lastPage.nextOffset,
    estimateSize: 60,
    overscan: 10,
    getItemKey: (user: User, index: number) => {
      if (!user) return `user-${index}`;
      return `${user.email}-${user.dob.date}-${index}`;
    },
  });

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading users...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-red-500 p-4">
        Error: {error instanceof Error ? error.message : 'Unknown error'}
        <button 
          onClick={() => refetch()}
          className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-white/90">
            <TableRow>
              <TableHead className="w-16">Avatar</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Género</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead className="w-16">Edad</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        
        {/* virtualized container */}
        <div
          ref={parentRef}
          className="h-96 overflow-auto"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoader = isLoaderRow(virtualRow.index);
              const user = getItem(virtualRow.index) as User;

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className={`grid grid-cols-6 gap-4 items-center px-4 py-3 border-b border-gray-100 ${
                    virtualRow.index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {isLoader ? (
                    <div className="col-span-6 flex items-center justify-center text-gray-500">
                      {hasNextPage ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          Loading more users...
                        </div>
                      ) : (
                        'No more users'
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-start">
                        <img
                          src={user.picture.thumbnail}
                          alt={`${user.name.first} ${user.name.last}`}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="font-medium text-left">
                        {user.name.title} {user.name.first} {user.name.last}
                      </div>
                      <div className="text-gray-600 text-left">
                        {user.email}
                      </div>
                      <div className="text-left">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.gender === 'female' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.gender}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {user.location.city}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 text-left">
                        {user.dob.age}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <div className="text-sm text-white/90 font-bold py-3">
          {users.length} users loaded
          {isFetching && !isFetchingNextPage && ' (updating...)'}
        </div>
      </div>
    </div>
  );
}


