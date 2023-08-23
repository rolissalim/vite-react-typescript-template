import { ACTION_BUTTON_STATUS, NO } from "./_more.columns.config";

// CAMPURAN MASTER COLUMN CONFIG
export const ITEM_COLUMN = () => {
    return [
        ...NO(),

        {
            Header: 'Image',
            accessor: 'imageName',
            minWidth: 100,
            filter: 'fuzzyText',
            show: true,
            disableFilters: true
        },
        {
            Header: 'Name',
            accessor: 'name',
            minWidth: 150,
            filter: 'fuzzyText',
            show: true,
            disableFilters: true
        },
        {
            Header: 'Purchase Price',
            accessor: 'purchase_price',
            minWidth: 150,
            filter: 'fuzzyText',
            show: true,
            disableFilters: true
        },
        {
            Header: 'Selling Price',
            accessor: 'selling_price',
            minWidth: 150,
            filter: 'fuzzyText',
            show: true,
            disableFilters: true
        },
        {
            Header: 'Stock',
            accessor: 'stock',
            minWidth: 100,
            filter: 'fuzzyText',
            show: true,
            disableFilters: true
        },
        ...ACTION_BUTTON_STATUS(),
    ];
};
