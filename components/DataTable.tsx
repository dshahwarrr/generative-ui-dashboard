type DataTableProps = {
  title: string;
  headers: string[];
  rows: string[][];
};

export function DataTable({ title, headers, rows }: DataTableProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 shadow-lg overflow-x-auto">
      <p className="text-gray-300 font-semibold mb-4">{title}</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="py-2 px-3 text-gray-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
