"use client";
import { useState, useMemo } from "react";
import { DataTable, EmptyState, Card } from "@shopify/polaris";

interface SQLQueryTableProps {
  data: Record<string, string>[];
  errorMessage?: string;
}

export function SQLQueryTable({ data }: SQLQueryTableProps) {
  // const t = useTranslations("text2sql.queryResult");
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const pages = Math.ceil((data?.length || 0) / rowsPerPage);

  const paginatedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  if (!data || data.length === 0) {
    return (
      <Card>
        <EmptyState heading="No results found" image="none">
          <p>The query returned no results.</p>
        </EmptyState>
      </Card>
    );
  }

  const headings = Object.keys(data[0]).map((k) => k.replaceAll("_", " "));
  const columnContentTypes = Object.values(data[0]).map((v) =>
    typeof v === "number" || (!isNaN(Number(v)) && v !== "" && v !== null)
      ? "numeric"
      : "text"
  );
  const rows = paginatedData.map((row) => Object.values(row));

  return (
    <div className="w-full bg-[#f1f1f1] p-3 rounded-xl">
      <DataTable
        headings={headings}
        columnContentTypes={columnContentTypes}
        rows={rows}
        pagination={
          pages <= 1
            ? undefined
            : {
                hasNext: page !== pages,
                hasPrevious: page !== 1,
                onNext: () => {
                  setPage(page + 1);
                },
                onPrevious: () => {
                  setPage(page - 1);
                },
                label: "Page " + page + " of " + pages,
              }
        }
      />
    </div>
  );
}
