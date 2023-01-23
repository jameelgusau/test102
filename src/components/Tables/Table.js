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
    tableHeading,
    pageAction,
    currentPage,
    loading,
    totalPages,
    totalRecord,
    pagination,
    tabCon,
    rowPadding,
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
        <td
          key={item[dataKeyNames[idx]]+column?.columnName.length}
          className={rowPadding ? rowPadding : "tablebody__cell"}
        >
          {
          item[dataKeyNames[idx]]
          }
        </td>
      ))
    );
  });

  return (
    <div className={tabCon ? tabCon : "table-container"}>
      {
        tableHeading &&(
          <h1 className="tableHeading">{tableHeading}</h1>
        )
      }
      {loading && (
        <div className="emptyData">
          <Loading />
        </div>
      )}
      {!loading && tableData.length === 0 && (
        <div className="emptyData">
          <NotFound size="100px" color="#0b2d40" />
        </div>
      )}
      {!loading && tableData.length > 0 && (
        <table className="table">
          <thead>
            <tr className="tableHead">{tableHead}</tr>
          </thead>
          <tbody>
            {tableDataList.length
              ? tableDataList.map((item, idx) => (
                  <tr className="tablebody" key={idx}>{item}</tr>
                ))
              : ""}
          </tbody>
        </table>
      )}
      {(pagination && totalRecord > 10) && (
        <div className="pagination-container">
          <div className="pagination">
            <IconButton
              onClick={() => pageAction(0)}
              disabled={currentPage === 0}
            >
              <BiChevronsLeft />
            </IconButton>
            <IconButton
              onClick={() => pageAction((currentPage + 1) - 2)}
              disabled={currentPage === 0}
            >
              <BiChevronLeft />
            </IconButton>
            <h2>{pageValue + 1}</h2>
            <IconButton
              onClick={() =>
                pageAction((currentPage + 1) === totalPages - 1 ? 1 : (currentPage + 1))
              }
              disabled={(currentPage + 1) === totalPages}
            >
              <BiChevronRight />
            </IconButton>
            <IconButton
              onClick={() => pageAction(1)}
              disabled={(currentPage + 1) === totalPages}
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
