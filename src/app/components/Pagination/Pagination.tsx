import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setActivePaging } from '@app/store/reducers/ui';

type Props = {
  pagination: any;
  handlePaginationClick: (e: any) => void;
  suffixTotal?: string;
  forced?: boolean;
  onDispatch?: boolean;
};

const Pagination: FC<Props> = ({
  pagination,
  handlePaginationClick,
  suffixTotal = 'Data',
  forced = true,
  onDispatch = true
}) => {
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams();
  const { activePaging } = useSelector((state: any) => state?.ui)


  const onClickPageLink = (v: any) => {
    if (forced) {
      searchParams.delete("page")
      searchParams.append("page", v?.selected + 1)
      setSearchParams(searchParams)
    }
    console.log("onClickPageLink ", v);

    if (onDispatch) {
      dispatch(setActivePaging(v?.selected))
    } else {
      handlePaginationClick(v)
    }
  }

  console.log("pagination", pagination);

  
  return (

  <>
    {pagination?.totalData > 0 && (
      <section className='animate__animated animate__fadeIn'>
        <div className='pagination-container d-flex justify-content-between align-items-center'>
          {pagination?.info &&

            <div className='text-muted d-none d-sm-block'>
              data kosong : {pagination?.info}
            </div>

          }
          <div className='text-muted d-none d-sm-block'>
            {pagination?.totalData} {suffixTotal}
          </div>

          <div className='d-flex justify-content-end'>
            <ReactPaginate
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me px-2'}
              pageCount={pagination.pageCount}
              // forcePage={forced ? pagination?.currentPage : 0}
              forcePage={activePaging || 0}
              marginPagesDisplayed={pagination.marginPagesDisplayed}
              pageRangeDisplayed={2}
              onPageChange={onClickPageLink}
              containerClassName={'pagination react-paginate'}
              activeClassName={'active'}
            />
          </div>

        </div>
      </section>
    )}
  </>
  );
};

export default Pagination;
