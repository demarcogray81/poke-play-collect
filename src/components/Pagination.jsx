export default function Pagination({ page, setPage, totalPages }) {
  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  const renderPageNumbers = () => {
    const nums = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      nums.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded ${
            i === page
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }
    return nums;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => goToPage(1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40"
      >
        ⏮ First
      </button>

      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40"
      >
        ◀ Prev
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40"
      >
        Next ▶
      </button>

      <button
        onClick={() => goToPage(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40"
      >
        Last ⏭
      </button>
    </div>
  );
}
