export default function CommentsSkeleton() {
  const rows = Array.from({ length: 9 });

  return (
    <section className="z-40 relative">
      <div className="tab:w-[624px] desk:w-[746px] max-h-[416px] mt-16 bg-bg_fon rounded-tl-[16px] rounded-tr-[16px]">
        
        {/* Header */}
        <div className="flex items-center py-1">
          <div className="tab:w-[116px] desk:w-[136px] text-center text-sx font-bold">DATE</div>
          <div className="tab:w-[190px] desk:w-[221px] text-sx font-bold">DESCRIPTION</div>
          <div className="tab:w-[156px] desk:w-[179px] text-center text-sx font-bold">CATEGORY</div>
          <div className="tab:w-[105px] desk:w-[105px] text-center text-sx font-bold">SUM</div>
          <div className="tab:w-[105px] desk:w-[105px]"></div>
        </div>

        {/* Skeleton rows */}
        <div className="overflow-y-auto max-h-[300px] scrollbar-bt_col">
          {rows.map((_, i) => (
            <div
              key={i}
              className="flex items-center py-1 mx-[2px] mb-[2px] bg-white shadow-shadow_menu animate-pulse"
            >
              <div className="tab:w-[116px] desk:w-[136px] flex justify-center">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>

              <div className="tab:w-[190px] desk:w-[221px]">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>

              <div className="tab:w-[156px] desk:w-[179px] flex justify-center">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>

              <div className="tab:w-[105px] desk:w-[105px] flex justify-center">
                <div className="h-4 w-14 bg-gray-200 rounded"></div>
              </div>

              <div className="tab:w-[105px] desk:w-[105px] flex justify-center gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-2 px-3 py-2 border-2 border-text_color text-text_color rounded-[16px] opacity-50 cursor-default"
        disabled
      >
        Add
      </button>
    </section>
  );
}
