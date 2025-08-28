// import { useState, useMemo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface DataPoint {
  [key: string]: string | number;
}

interface VisualizationEntry {
  name: string;
  date?: Date | string;
  [key: string]: string | number | Date | undefined | null;
}

interface DateMap {
  [key: string]: {
    date: string;
    name: string;
    [key: string]: string | number | null;
  };
}

interface Props {
  data: DataPoint[];
}

export function DataVisualization({ data }: Props) {
  console.log("Data received:", data);
  const getDateField = (obj: DataPoint): string | undefined => {
    return Object.keys(obj).find((key) => key.endsWith("_date"));
  };

  const getNumericFields = (obj: DataPoint): string[] => {
    return Object.keys(obj).filter((key) => {
      const value = obj[key];
      return (
        ((typeof value === "number" && !isNaN(value)) ||
          (typeof value === "string" &&
            value.trim() !== "" &&
            !isNaN(Number(value)))) &&
        !key.endsWith("_date")
      );
    });
  };

  const getCategoryField = (obj: DataPoint): string | undefined => {
    return Object.keys(obj).find(
      (key) => typeof obj[key] === "string" && !key.endsWith("_date")
    );
  };

  const formatKey = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  };

  const dateField = data.length > 0 ? getDateField(data[0]) : null;
  const numericFields = data.length > 0 ? getNumericFields(data[0]) : [];
  const categoryField =
    !dateField && data.length > 0 ? getCategoryField(data[0]) : null;

  console.log("Detected fields:", { dateField, numericFields, categoryField });

  const dataForVisualization = data
    .map((dp: DataPoint): VisualizationEntry | null => {
      if (numericFields.length === 0) {
        console.warn("Missing numeric fields");
        return null;
      }

      if (dateField) {
        const date = new Date(dp[dateField] as string);
        const entry: VisualizationEntry = {
          name: date.toLocaleString("default", {
            month: "short",
            day: "numeric",
          }),
          date: date,
        };
        numericFields.forEach((field) => {
          const value = dp[field];
          entry[field] = typeof value === "number" ? value : Number(value);
        });
        return entry;
      } else {
        const nameField = categoryField;
        const entry: VisualizationEntry = {
          name: nameField ? formatKey(dp[nameField] as string) : "Item",
        };
        numericFields.forEach((field) => {
          const value = dp[field];
          entry[field] = typeof value === "number" ? value : Number(value);
        });
        return entry;
      }
    })
    .filter((item): item is VisualizationEntry => item !== null)
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  let dateKey: string | undefined = undefined;
  let stringKey: string | undefined = undefined;
  let numericKey: string | undefined = undefined;

  if (data.length > 0) {
    dateKey = Object.keys(data[0]).find(
      (k) =>
        k.toLowerCase().includes("date") ||
        (typeof data[0][k] === "string" &&
          /\d{4}-\d{2}-\d{2}/.test(data[0][k] as string))
    );
    stringKey = Object.keys(data[0]).find(
      (k) =>
        typeof data[0][k] === "string" &&
        k !== dateKey &&
        (isNaN(Number(data[0][k])) || (data[0][k] as string).trim() === "")
    );
    numericKey = Object.keys(data[0]).find(
      (k) =>
        k !== dateKey &&
        k !== stringKey &&
        (typeof data[0][k] === "number" ||
          (typeof data[0][k] === "string" &&
            !isNaN(Number(data[0][k])) &&
            (data[0][k] as string).trim() !== ""))
    );
  }
  const isPivotCase = !!(dateKey && stringKey && numericKey);

  let visualizationData = dataForVisualization;
  let productList: string[] = [];
  if (isPivotCase && dateKey && stringKey && numericKey) {
    const allDates = Array.from(
      new Set(data.map((row) => row[dateKey] as string))
    ).sort();
    productList = Array.from(
      new Set(data.map((row) => row[stringKey] as string))
    );

    const dateMap: DateMap = {};
    allDates.forEach((date) => {
      dateMap[date] = {
        date,
        name: date,
      };
      productList.forEach((product) => {
        dateMap[date][product] = null;
      });
    });
    data.forEach((row) => {
      if (dateKey && stringKey && numericKey) {
        dateMap[row[dateKey] as string][row[stringKey] as string] = Number(
          row[numericKey]
        );
      }
    });
    visualizationData = allDates.map((date) => dateMap[date]);
  }
  console.log("Visualization data:", visualizationData);
  const NumberFormatter = (number: number): string => {
    return number.toString();
  };

  const commonProps = {
    width: 500,
    height: 300,
    data: visualizationData,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 15,
    },
  };

  const colors = [
    "#82ca9d",
    "#8884d8",
    "#ffc658",
    "#ff7300",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A569BD",
    "#5499C7",
    "#48C9B0",
    "#F4D03F",
    "#DC7633",
    "#AAB7B8",
    "#E74C3C",
    "#5D6D7E",
    "#229954",
    "#D35400",
    "#7D3C98",
    "#2874A6",
    "#117A65",
    "#B7950B",
    "#CA6F1E",
    "#616A6B",
  ];

  return (
    <div>
      {isPivotCase ? (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{ value: "Date", offset: 0, position: "bottom" }}
          />
          <YAxis
            label={{
              value: "Quantity",
              offset: 0,
              angle: -90,
              position: "left",
            }}
            tickFormatter={NumberFormatter}
          />
          <Tooltip />
          <Legend />
          {productList.map((product, idx) => (
            <Line
              key={product}
              type="monotone"
              dataKey={product}
              stroke={colors[idx % colors.length]}
              name={formatKey(product)}
              connectNulls
            />
          ))}
        </LineChart>
      ) : dateField ? (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: dateField
                ? formatKey(dateField)
                : categoryField
                ? formatKey(categoryField)
                : "Category",
              offset: 0,
              position: "bottom",
            }}
          />
          {numericFields.map((field, idx) => (
            <YAxis
              key={field}
              yAxisId={field}
              orientation={idx === 0 ? "left" : "right"}
              label={{
                value: formatKey(field),
                offset: 0,
                angle: -90,
                position: idx === 0 ? "left" : "right",
              }}
              tickFormatter={NumberFormatter}
              width={60}
              {...(idx > 0
                ? { axisLine: true, tickLine: true, dx: 40 * (idx - 1) }
                : {})}
            />
          ))}
          <Tooltip />
          <Legend />
          {numericFields.map((field, idx) => (
            <Line
              key={field}
              type="monotone"
              dataKey={field}
              stroke={colors[idx % colors.length]}
              name={formatKey(field)}
              yAxisId={field}
            />
          ))}
        </LineChart>
      ) : (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: categoryField ? formatKey(categoryField) : "Category",
              offset: 0,
              position: "bottom",
            }}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{ fontSize: 12 }}
          />
          {numericFields.map((field, idx) => (
            <YAxis
              key={field}
              yAxisId={field}
              orientation={idx === 0 ? "left" : "right"}
              label={{
                value: formatKey(field),
                offset: 0,
                angle: -90,
                position: idx === 0 ? "left" : "right",
              }}
              tickFormatter={NumberFormatter}
              width={60}
              {...(idx > 0
                ? { axisLine: true, tickLine: true, dx: 40 * (idx - 1) }
                : {})}
            />
          ))}
          <Tooltip />
          <Legend />
          {numericFields.map((field, idx) => (
            <Bar
              key={field}
              dataKey={field}
              fill={colors[idx % colors.length]}
              name={formatKey(field)}
              yAxisId={field}
            />
          ))}
        </BarChart>
      )}
    </div>
  );
}
