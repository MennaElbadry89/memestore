export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mx-auto my-6 flex items-center justify-center gap-2">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50" >  Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded px-3 py-1 ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-300"
          }`} >  {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"> Next
      </button>
    </div>
  );
}
