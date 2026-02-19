export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-20" />
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse" />
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-8 bg-gray-200 rounded w-32" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
