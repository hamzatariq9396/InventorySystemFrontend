import React, { useMemo } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "./GlobalFilter";
import { CSVLink } from "react-csv";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Button,
} from "@mui/material";


function ReactTable({
  columns,
  data,
  includeDownload = false,
  downloadFileName = "",
  includeColumnAccessors = [],
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);
  const { globalFilter, pageIndex, pageSize } = state;

  // Function to format data for CSV export
  const formatDataForExport = () => {
    const formattedData = rows.map((row, rowIndex) => {
      const formattedRow = {};
      prepareRow(row);
      row.cells.forEach((cell, index) => {
        const columnId = cell.column.id;
        if (includeColumnAccessors.includes(columnId)) {
          if (
            typeof cell.value === "object" &&
            data?.[rowIndex]?.[columnId + "_CSV"]
          ) {
            formattedRow[columnId] = data[rowIndex][columnId + "_CSV"];
          } else {
            formattedRow[columnId] = cell.value;
          }
        }
      });
      return formattedRow;
    });
    return formattedData;
  };

  return (
    <div className="react-table-container" style={{ margin: "20px 0" }}>
      {includeDownload && (
        <CSVLink
          data={formatDataForExport()}
          filename={downloadFileName + ".csv"}
          className="download-button"
        >
          <Button variant="contained" color="primary">
            Download CSV
          </Button>
        </CSVLink>
      )}
      <div className="table-options" style={{ margin: "10px 0" }}>
        <div className="show-entries" style={{ marginBottom: "10px" }}>
          <span>Show Entries</span>
          <Select
            variant="outlined"
            className="entries-select"
            style={{ width: "100px", background: "#f7f7f7" }}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 50, 100, 500, "All"].map((pageSize) => (
              <option key={pageSize} value={pageSize !== "All" ? pageSize : 10000}>
                {pageSize}
              </option>
            ))}
          </Select>
        </div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <TableContainer className="custom-table-container" style={{ margin: "10px 0" }}>
        <Table {...getTableProps()} >
          <TableHead style={{ backgroundColor: '#ffffff' }} >
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()}  style={{ backgroundColor: 'dark' }} >
                {headerGroup.headers.map((column, j) => (
                  <TableCell
   
                    key={j}
                    {...column.getHeaderProps()}
                    className="table-header-cell"
                    style={{ color: 'blue' }} 
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, j) => (
                    <TableCell
                      key={j}
                      {...cell.getCellProps()}
                      className="table-body-cell"
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination" style={{ margin: "10px 0" }}>
        <span className="page-info">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <span style={{ float: "right" }}>
          <Button
            variant="contained"
            color="inherit"
            className="pagination-button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="pagination-button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </span>
      </div>
    </div>
  );
}

export default ReactTable;
