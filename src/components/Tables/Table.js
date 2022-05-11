import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import { NotFound } from "../../assets/img/Icons";
import IconButton from "@mui/material/IconButton";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
// const head=[

// ]
const Table = (props) => {
  const {
    columns,
    tableData,
    pageAction,
    currentPage,
    loading,
    totalPages,
    pagination,
  } = props;
  const [pageValue, setPageValue] = useState(currentPage);
  useEffect(() => {
    setPageValue(currentPage);
  }, [currentPage]);
  const dataKeyNames = columns.map((column) => column.keyName);

  const tableHead =
    tableData.length &&
    columns.map((column) => (
      <th key={column.columnName} className="tableHead__cell">
        {column.columnName}
      </th>
    ));

  const tableDataList = [];
  // eslint-disable-next-line array-callback-return
  tableData.map((item) => {
    tableDataList.push(
      columns.map((column, idx) => (
        <td key={item[dataKeyNames[idx]]} className="tablebody__cell">
          {item[dataKeyNames[idx]]}
        </td>
      ))
    );
  });

  return (
    <div className="table-container">
      {loading && (
        <div  className="emptyData">
          <Loading />
        </div>
      )}
      {!loading && tableData.length === 0 && (
        <div className="emptyData">
          <NotFound size="100px" color="#0b2d40" />
        </div>
      )}
      {!loading && tableData.length > 0 && (
        <div className="overflow">
          <table className="table">
            <tr className="tableHead">{tableHead}</tr>
            {tableDataList.length
              ? tableDataList.map((item) => (
                  <tr className="tablebody">{item}</tr>
                ))
              : ""}
          </table>
        </div>
      )}
      {pagination && (
        <div className="pagination-container">
          <div className="pagination">
            <IconButton
              onClick={() => pageAction(0)}
              disabled={currentPage === 1}
            >
              <BiChevronsLeft />
            </IconButton>
            <IconButton
              onClick={() => pageAction(currentPage - 2)}
              disabled={currentPage === 1}
            >
              <BiChevronLeft />
            </IconButton>
            <h2>{pageValue}</h2>
            <IconButton
              onClick={() =>
                pageAction(currentPage === totalPages - 1 ? -1 : currentPage)
              }
              disabled={currentPage === totalPages}
            >
              <BiChevronRight />
            </IconButton>
            <IconButton
              onClick={() => pageAction(-1)}
              disabled={currentPage === totalPages}
            >
              <BiChevronsRight />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
