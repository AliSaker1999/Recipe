const SkeletonRecipeCard = () => (
  <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100 animate-pulse flex flex-col justify-between min-h-[240px]">
    <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="space-y-2 mb-8">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
    <div className="h-10 bg-gradient-to-r from-blue-200 to-pink-200 rounded-2xl" />
  </div>
);

export default SkeletonRecipeCard;