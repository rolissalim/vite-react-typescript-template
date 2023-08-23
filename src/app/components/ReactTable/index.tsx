import React, { FC, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useExpanded,
  useRowSelect,
} from 'react-table';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { DefaultColumnFilter } from './ReactTableFilter';
import { ReactTableStyle } from './ReactTableStyle';
import Loader from '../Loader/Loader';

type Props = {
  columns: any;
  data: any;
  onSort?: any;
  onFilters?: any;
  columnFilters?: boolean;
  containerClass?: string;
  rowSelectType?: string;
  rowSelect?: boolean;
  selectedRows?: any;
  loading?: boolean;
  loader?: any
};

const ReactTable: FC<Props> = ({
  columns,
  data,
  onSort,
  onFilters,
  columnFilters = false,
  containerClass = 'table my-3',
  rowSelectType = 'checkbox',
  rowSelect = false,
  selectedRows,
  loader
}) => {
  const defaultColumn: any = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { sortBy, filters }, // expanded , selectedRowIds
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
      stateReducer: (newState: any, action: any) => {
        if (action.type === 'toggleRowSelected' && rowSelectType == 'radio') {
          newState.selectedRowIds = {
            [action.id]: true,
          };
        }

        return newState;
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      rowSelect &&
        hooks.visibleColumns.push((columns: any) => {
          return [
            {
              Header: rowSelectType == "checkbox" ? ({ getToggleAllRowsSelectedProps }: any) => (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              ) : "",
              accessor: 'selection',
              minWidth: '20px',
              canFilter: false,
              disableSortBy: true,
              show: true,
              disableFilters: true,
              Cell: ({ row }: any) => (
                <IndeterminateCheckbox
                  type={rowSelectType}
                  {...row.getToggleRowSelectedProps()}
                />
              ),
            },
            ...columns,
          ];
        });
    }
  );

  useEffect(() => {
    onSort && onSort({ sortBy });
  }, [onSort, sortBy]);

  useEffect(() => {
    onFilters && onFilters({ filters });
  }, [onFilters, filters]);

  useEffect(() => {
    selectedRows && selectedRows(selectedFlatRows.map((d: any) => d.original));
  }, [selectedFlatRows]);
  // Render the UI for your table

  console.log("inde rect table ", columns);

  return (
    <>
      <ReactTableStyle
        className={containerClass}
        style={{ minHeight: '18rem' }}
      >
        <table {...getTableProps()} >
          <thead className='table-light'>
            {headerGroups.map((headerGroup: any, iHeader: number) => (
              <tr key={iHeader} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, iColumn: number) => (
                  <th key={`${iHeader}-${iColumn}`}
                    id={column.id} style={{ minWidth: column?.minWidth }} {...column.getHeaderProps()}
                    className={column?.customClass}>
                    <div
                      {...column.getHeaderProps(
                        column.getSortByToggleProps()
                      )}
                    >
                      {column.render('Header')}
                      <span className='ms-2'>
                        {column?.isSorted ? (
                          column.isSortedDesc ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: `<i class='fas fa-long-arrow-down'></i>`,
                              }}
                            ></span>
                          ) : (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: `<i class='fas fa-long-arrow-up'></i>`,
                              }}
                            ></span>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                    {columnFilters && !column.disableFilters && (
                      <div
                        className='mt-2'
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.id !== 'action'
                          ? column.render('Filter')
                          : null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loader.Loading !== true && loader.Loading !== undefined && rows?.length > 0 && rows.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`tbody.tr${i}`} className={row?.original?.customClass}>
                  {row.cells.map((cell: any, indexTd: number) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={`tbody.tr${i}.td${indexTd}`}
                        id={cell?.column?.id}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {loader.Loading == true &&
              <tr style={{ borderBottom: '1px solid var(--body-bg)' }} >
                <td
                  colSpan={1000}
                  className='text-center fw-bold'
                  style={{
                    padding: '2rem 0',
                    fontSize: '1.25rem',
                    color: 'var(--black-150)',
                  }}
                >
                  <Loader loader={loader} />
                </td>
              </tr>
            }
            {loader.Loading === false && rows?.length < 1 &&
              <tr style={{ borderBottom: '1px solid var(--body-bg)' }} >
                <td
                  colSpan={1000}
                  className='text-center fw-bold'
                  style={{
                    padding: '2rem 0',
                    fontSize: '1.25rem',
                    color: 'var(--black-150)',
                  }}
                >
                  <Loader loader={loader} />
                </td>
              </tr>
            }
          </tbody>
        </table>
      </ReactTableStyle >
    </>
  );
};

export default ReactTable;
