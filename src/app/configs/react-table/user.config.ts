import { ACTION_BUTTON_STATUS, EMAIL, NO } from "./_more.columns.config";

// CAMPURAN MASTER COLUMN CONFIG
export const USER_COLUMN = () => {
    return [
        ...NO(),
        {
            Header: 'Name',
            accessor: 'fullname',
            minWidth: 200,
            filter: 'fuzzyText',
            show: true,
            disableFilters: true
        },
        ...EMAIL(),
        ...ACTION_BUTTON_STATUS(),
    ];
};
