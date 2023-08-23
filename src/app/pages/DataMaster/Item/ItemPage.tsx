import ButtonStatus from "@app/components/Button/ButtonStatus";
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from "@app/modules/Table/TableDataListAction";
import { setCurrentPage } from "@app/store/reducers/ui";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Filter from "./Filter";
import TextImage from "@app/components/Image/TextImage";
import ModalForm from "@app/components/Modals/ModalForm";
import ItemForm from "./ItemForm";
import { ITEM_COLUMN } from "@app/configs/react-table/data-master.config";

export default function ItemPage() {
    const path = "data_master.item"
    const dispatch = useDispatch()
    const [dataSelected, setDataSelected] = useState<any>();
    const [dataRows, setDataRows] = useState<any>();
    const [columns] = useState<any>(ITEM_COLUMN())
    const paging = {
        show: true,
    }

    const [modal, setModal] = useState<any>({
        show: false,
        approved: false,
        size: 'md',
        icon: '',
        title: 'Data',
        textApproved: 'Yes',
        classApproved: 'primary',
        textDecline: 'No',
        scrollable: false,
    });
    const handleAdd = () => {
        setDataSelected(null)
        setModal((prevState: any) => ({
            ...prevState,
            title: "Form Tambah Item",
            show: true,
        }));
    }
    const handleEdit = (item: any) => {
        setDataSelected(item)
        setModal((prevState: any) => ({
            ...prevState,
            title: "Form Edit Item",
            show: true,
        }));
    }

    useEffect(() => {
        dispatch(setCurrentPage({ title: "Data Master", pageTitle: "Item" }))
    }, [])


    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        if (data) {

            let dataTableValue: any = [];
            data?.forEach((item: any) => {
                dataTableValue.push({
                    ...item,
                    name: item?.name,
                    birth_day: item?.birth_place,
                    alamat: item?.address,
                    dapilName: item?.dapil?.name,
                    imageName: <div className="pointer" onClick={() => { handleImage(item) }}>
                        <TextImage
                            text=""
                            image={item?.image || "-"}
                        />
                    </div>,
                    button_status: (<ButtonStatus
                        path={path}
                        primaryKey="id"
                        data={item}
                        isStatus={true}
                        handleEdit={handleEdit}
                        isDelete={true}
                    />)
                });
            });
            setDataRows(() => {
                return dataTableValue
            })
        }

    }

    const handleImage = (item: any) => {
        setDataSelected(item)
    }

    return (
        <>
            <Card className="mb-1">
                <Card.Header>
                    <TableDataListAction
                        add={true}
                        exporting={false}
                        filter={true}
                        search={true}
                        sort={false}
                        onClickAdd={handleAdd}
                        placeholder="Search"
                    >
                        <Filter />
                    </TableDataListAction>
                </Card.Header>
                <Card.Body>
                    <TableData
                        columnsConfig={columns}
                        path={path}
                        primaryKey="id"
                        selected={dataSelected}
                        paging={paging}
                        deleteConfirmation={''}
                        handleEdit={handleEdit}
                        rowData={dataRows}
                        respDataApi={handleRespDataApi}

                    />
                </Card.Body>
            </Card>
            <ModalForm
                modalProps={modal}
            >
                <ItemForm dataSelected={dataSelected} />
            </ModalForm>
        </>
    )
}