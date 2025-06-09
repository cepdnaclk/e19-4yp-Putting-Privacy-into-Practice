import React, { useState } from "react";

export default function Table({
  columns,
  data,
  getRowId,
  initialPageSize = 10,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pageCount = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const goToPage = (page) => {
    if (page >= 0 && page < pageCount) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-left text-sm">
          <thead className="bg-[#252d5c] text-white">
            <tr>
              {columns.map((col) => (
                <th key={col.field} className="px-6 py-3">
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={getRowId(row)}
                  className="border-t transition-colors duration-200 hover:bg-gray-300"
                >
                  {columns.map((col) => (
                    <td key={col.field} className="px-6 py-4 text-[#252d5c]">
                      {col.render ? col.render(row) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
        <div>
          Rows per page:{" "}
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => goToPage(0)}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            {"<"}
          </button>
          <span>
            Page {currentPage + 1} of {pageCount || 1}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() => goToPage(pageCount - 1)}
            disabled={currentPage >= pageCount - 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
