import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import {
  FastForwardOutlined, FirstPageOutlined, LastPage, ChevronLeft, ChevronRight
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import {
  red, blue, amber, green
} from '@material-ui/core/colors';
import { Content, SText } from '../styledComponents';
import Input from '../Input';
import { LogoLoader } from '../loaders';
import { NoDataIcon } from '../icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    // minWidth: 650,
    // maxWidth: '100%',
    // overflowX: 'scroll',
    // position: 'relative'
  },
  cell: {
    // width: '100px'
    whiteSpace: 'nowrap',
    borderRightColor: '#e9e9e9 !important',
    borderRightWidth: '1px',
    borderRightStyle: 'solid'
  },
  frozenColumn: {
    position: 'sticky',
    // right: '100%',
    top: 'auto',
    width: '5em !important',
    left: 0,
    background: '#fff'
  },
  frozenColumnB: {
    position: 'sticky',
    // right: '100%',
    top: 'auto',
    width: '5em !important',
    right: 0,
    background: '#fff'
  },
  wrapper: {
    position: 'relative',
  },
  scrollDiv: {
    overflowX: 'scroll',
    overflowY: 'visible',
    position: 'relative',
    minHeight: '60vh'
  },
  late: {
    // background: amber[500]
    background: '#CFBEA5'
  },
  early: {
    // background: green[500]
    background: '#BAE4F0'
  },
  veryLate: {
    // background: amber[900]
    background: '#F15151'
  },
  absent: {
    background: red.A100
  }
}));

const DataTable = (props) => {
  const classes = useStyles();
  const {
    columns, tableData, pageAction, currentPage, loading, submit, totalPages, reportType, legend, legend1
  } = props;
  const [pageValue, setPageValue] = useState(currentPage);
  useEffect(() => {
    setPageValue(currentPage);
  }, [currentPage]);
  const dataKeyNames = columns.map(column => column.keyName);
  // const columnCount = dataKeyNames.length;
  const tableHead = tableData.length && (columns.map((column, index) => (
    <TableCell
      align={index === 0 ? 'center' : 'center'}
      key={index}
      className={classNames(classes.cell, {
        [classes.frozenColumn]: index === 0,
        [classes.frozenColumnB]: index === columns.length - 1 && reportType !== 'worktimereport'
      })}
    >
      {column.columnName}
    </TableCell>
  )));
  const tableDataList = [];
  // eslint-disable-next-line array-callback-return
  tableData.map((item) => {
    tableDataList.push(columns.map((column, idx) => (
      <TableCell
        align={idx === 0 ? 'left' : 'center'}
        key={idx}
        className={classNames(classes.cell, {
          [classes.frozenColumn]: idx === 0,
          [classes.frozenColumnB]: idx === columns.length - 1 && reportType !== 'worktimereport',
          [classes.late]: idx > 0 && Number(item[dataKeyNames[idx]]) > 50 && Number(item[dataKeyNames[idx]]) < 100 && column.keyName !== 'CUMMULATIVE PERCENTAGE' && reportType === 'percentage',
          [classes.early]: idx > 0 && Number(item[dataKeyNames[idx]]) === 100 && reportType === 'percentage',
          [classes.veryLate]: idx > 0 && Number(item[dataKeyNames[idx]]) < 50 && column.keyName !== 'WORKING DAYS' && column.keyName !== 'CUMMULATIVE PERCENTAGE' && reportType === 'percentage',
          // [classes.absent]: item[dataKeyNames[idx]] === 'ABS'
        })}
      >
        {
          idx === 0
          && (
            <p style={{ width: '3em', display: 'inline-block' }}>{item.row}</p>
          )
        }
        {item[dataKeyNames[idx]]}
      </TableCell>
    )));
  });
  return (
    <div className={classes.wrapper}>
      {
        loading
        && (
          <Content height="100%" bg="#ffffff88" flex justify="center" position="absolute" style={{ zIndex: 1100 }} align="center">
            <LogoLoader height="80px" color="#0b2d40" />
          </Content>
        )
      }
      <div className={classes.scrollDiv}>
        {
          (!loading && tableData.length === 0)
          && (
            <Content height="100%" flex justify="center" position="absolute" style={{ zIndex: 1100 }} align="center">
              <NoDataIcon height="100px" color="#0b2d40" />
            </Content>
          )
        }
        {
          (!loading && tableData.length > 0)
          && (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {tableHead}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                      tableDataList.length
                        ? tableDataList.map((item, index) => (
                          <TableRow key={index} style={{ position: 'relative' }}>
                            {item}
                          </TableRow>
                        ))
                        : <TableCell>No Result found</TableCell>
                    }
                </TableBody>
              </Table>
          )
        }
      </div>
      <Content height="4em" align="center" justify={legend ? 'space-between' : 'flex-end'} flex horizontal>
        {
          legend
          && (
            <Content flex horizontal align="center" width="auto" justify="flex-start">
              <Content flex horizontal hmargin="1em" width="auto">
                <Content hmargin="0.5em" width="2em" height="2em" bg="#BAE4F0" />
                <SText size="14px">100%</SText>
              </Content>
              <Content flex horizontal hmargin="1em" width="auto">
                <Content hmargin="0.5em" width="2em" height="2em" bg="#CFBEA5" />
                <SText size="14px">50 - 99%</SText>
              </Content>
              <Content flex horizontal hmargin="1em" width="auto">
                <Content hmargin="0.5em" width="2em" height="2em" bg="#F15151" />
                <SText size="14px">0 - 49%</SText>
              </Content>
              <Content flex horizontal hmargin="1em" width="auto">
                <SText size="14px" weight="600">ABS</SText>
                <SText size="14px">: Absent</SText>
              </Content>
              <Content flex horizontal hmargin="1em" width="auto">
                <SText size="14px" weight="600">DNI</SText>
                <SText size="14px">
                  {": Didn't Clock In"}
                </SText>
              </Content>
              <Content flex horizontal hmargin="1em" width="auto">
                <SText size="14px" weight="600">DNO</SText>
                <SText size="14px">
                  {": Didn't Clock Out"}
                </SText>
              </Content>
            </Content>
          )
        }{
          legend1
          &&(
            <Content flex horizontal hmargin="1em" width="auto">
            <SText size="14px" weight="600">ABS</SText>
            <SText size="14px">: Absent</SText>
            </Content>
          )
        }
        <Content flex horizontal justify="flex-end" width="auto" align="center">
          <IconButton onClick={() => pageAction('first')} disabled={currentPage === 1}>
            <FirstPageOutlined />
          </IconButton>
          <IconButton onClick={() => pageAction('prev')} disabled={currentPage === 1}>
            <ChevronLeft />
          </IconButton>
          <Input
            type="text"
            variant="outlined"
            name="page"
            width="3em"
            value={pageValue || ''}
            placeHolder={currentPage}
            onChange={({ target }) => setPageValue(target.value)}
            onKeyDown={(e) => { if (e.keyCode === 13) submit(e.target.value - 1); }}
          />
          <IconButton onClick={() => pageAction('next')} disabled={currentPage === totalPages}>
            <ChevronRight />
          </IconButton>
          <IconButton onClick={() => pageAction('last')} disabled={currentPage === totalPages}>
            <LastPage />
          </IconButton>
        </Content>
      </Content>
    </div>
  );
};

export default DataTable;
