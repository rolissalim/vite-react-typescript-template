import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactTable from '@app/components/ReactTable';
import Pagination from '@app/components/Pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { get, isArray } from 'lodash';
import { API_PATH } from '@app/services/_path.service';
import { deleteByPath, getAllByPath } from '@app/services/main.service';
import { useTranslation } from 'react-i18next';
import { reloadingData } from '@app/store/reducers/app';
import { decodeFilter } from '@app/helper/filter.helper';
import { setLoading } from '@app/store/reducers/ui';

export default function TableData({
  columnsConfig = [],
  filterParams = {},
  path,
  primaryKey,
  selected,
  action,
  paging = {},
  pagingPresistance = false,
  deleteConfirmation = {},
  rowSelect = false,
  rowSelectType = 'checkbox',
  selectedRows,
  trigger,
  module = null,
  ids = 'id',
  onEmpty,
  containerClass = 'table table-responsive',
  fieldSearch = "keywords",
  respDataApi,
  rowData,
  usePayloadParam,
  onDispatch = true,
}: ITableData) {
  const source = axios.CancelToken.source();
  const { activePage, activeFilters, callbackForm, activePaging, loading } = useSelector(
    (state: any) => state.ui
  );
  const { t } = useTranslation()
  const { currentUser, workspace } = useSelector((state: any) => state.auth);
  const { searchKeyword } = useSelector((state: any) => state.ui);
  const [loader, setLoader] = useState<any>({ Loading: undefined, Type: "ldss", NoData: true })
  let [searchParams, setSearchParams] = useSearchParams();
  const [loaderLocal, setLoaderLocal] = useState<any>(false)
  const { reloadData } = useSelector((state: any) => state.app);
  const currentPage = activePaging || 0;

  const label = module ? module : activePage?.display;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: currentPage ? parseInt(currentPage) - 1 : 0,
    pageCount: 10,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
    ...paging,
  });

  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'far fa-trash',
    description: `${t('Delete')} data ${label}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
    ...deleteConfirmation,
  });

  const initFilters = {
    field: 'updated_at',
    sort: 'DESC',
    is_active: true
  };

  const [filters, setFilters] = useState<any>(initFilters);

  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>(selected);


  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (onDispatch) {
      dispatch(dispatch(setLoading(true)))
    } else {
      setLoaderLocal(true)
    }

    try {
      let filtering = decodeFilter(activeFilters?.filters?.filter)
      let params: any = {
        ...filters,
        workspace_id: workspace?.id,
        page: (activePaging) + 1,
        perpage: pagination.perPage,
        [fieldSearch]: searchKeyword || "",

        ...filterParams,
        ...filtering
      };

      if (currentUser?.caleg?.id)
        params.caleg_id = currentUser?.caleg?.id || null

      if (usePayloadParam) {
        let tempParams: any = new URLSearchParams();
        Object.keys(params).map((key: any) => {
          if (isArray(params[key])) {
            params[key]?.map((items: any) => {
              tempParams.append(key, items)
            })
          } else {
            tempParams.append(key, params[key])
          }
        })
        params = tempParams
      }

      let req: any = await getAllByPath(`${get(API_PATH(), path)}`, params, source.token);
      const { data, meta } = req;
      if (data) {
        let datas = data?.map((d: any, i: number) => {
          d.number = pagination.currentPage * pagination.perPage + (i + 1);
          d.index = i;
          return d;

        });

        respDataApi(datas);
        console.log("'meta",);

        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: Math.ceil(meta?.total / pagination?.perPage),
          totalData: meta?.total,
        }));
      } else {
        respDataApi([]);
        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: 1,
          totalData: 0,
        }));
        if (onEmpty) {
          onEmpty(true);
        }
      }
      if (reloadData) {
        dispatch(reloadingData(null))
      }
      if (onDispatch) {
        dispatch(setLoading(false));
      } else {
        setLoaderLocal(false)
      }
    } catch (err: any) {
      console.log("error", err);
      if (onDispatch) {
        dispatch(setLoading(false));
      } else {
        setLoaderLocal(false)
      }
    }
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    if (path
      && trigger !== null
      // && activeFilters != null
      && callbackForm?.getData !== false) {
      getAllData();
    } else if (!path) {
      setData([])
    }

    return () => {
      source.cancel();
    };
  }, [
    pagination?.currentPage,
    activePaging,
    searchKeyword,
    trigger,
    path,
    activeFilters,
    callbackForm,
    location.pathname,
  ]);

  /** DELETE HANDLING */
  const deleteData = async () => {
    dispatch(setLoading(true));

    try {
      await deleteByPath(get(API_PATH(), path), dataSelected[primaryKey], source.token);
      dispatchNotification(`Sukses menghapus data ${label}`, 'success');
      getAllData();
    } catch (err: any) {
      dispatch(setLoading(false));
      dispatchNotification(`Failed menghapus data ${label}`, 'danger');
    }
  };

  /** DELETE HANDLING */

  useEffect(() => {
    if (selected) {
      switch (action) {
        case 'delete':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            show: true,
          }));
          break;
        case 'edit.modal':
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case 'edit':
          navigate(`edit/${get(selected, primaryKey)}`);
          break;
        case 'detail':
          navigate(`detail/${get(selected, primaryKey)}`);
          break;
        default:
          break;
      }
    }
  }, [action, selected]);

  const callbackModalConfirm = (approved = false) => {
    if (approved) {
      switch (modalConfirm?.action) {
        default:
          deleteData();
          break;
      }
    }
  };

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState: any) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  const handleSort = useCallback(({ sortBy }: any) => {
    if (sortBy.length > 0) {
      setFilters((prevState: any) => ({
        ...prevState,
        sort_by: sortBy[0]['desc'] ? '-' : '' + sortBy[0]['id'],
      }));
    }
  }, []);

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const tableData = useMemo(() => data, [data]);

  /** HANDLE RELOAD DATA CLICK */
  // useEffect(() => {
  //   if (reloadData) {
  //     getAllData()
  //   }
  // }, [reloadData])


  useEffect(() => {
    if (rowData) setData(rowData);
  }, [rowData]);


  useEffect(() => {
    return () => {
      setData([]);
      source.cancel();
    };
  }, []);

  useEffect(() => {
    setLoader(() => {
      return { ...loader, Loading: onDispatch ? loading : loaderLocal }
    })
  }, [loading, loaderLocal])

  return (
    <>
      <ReactTable
        rowSelect={rowSelect}
        rowSelectType={rowSelectType}
        selectedRows={selectedRows}
        columns={columnsConfig}
        data={tableData}
        onSort={handleSort}
        containerClass={containerClass}
        loading={loading}
        loader={loader}
      />

      {
        paging?.show != false &&
        <Pagination
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={pagingPresistance}
          onDispatch={onDispatch}
        />
      }

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  );
}
interface ITableData {
  columnsConfig: any;
  filterParams?: any;
  respDataApi?: any;
  rowData?: any;
  rowSelect?: boolean;
  rowSelectType?: string;
  selectedRows?: any;
  selected?: any;
  path?: any;
  download?: any;
  exportConfig?: IExportConfig;
  primaryKey: any;
  action?: string | undefined;
  onColumnsChanged?: any;
  paging?: any;
  pagingPresistance?: boolean;
  deleteConfirmation?: any;
  trigger?: any;
  module?: any;
  ids?: any;
  onEmpty?: any;
  containerClass?: string,
  handleEdit?: any,
  handleDetail?: any,
  handleModerasi?: any,
  fieldSearch?: string
  uuid?: string
  usePayloadParam?: boolean,
  onDispatch?: boolean,
  additionalPath?: string,
  additionalPathDownload?: string,
  pathDownload?: any,
}


interface IExportConfig {
  path?: string
  addParams?: any;
  customParams?: any;
}