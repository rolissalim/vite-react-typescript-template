export const NO = () => [{ Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true }]
export const EMAIL = () => [{ Header: 'Email', accessor: 'email', minWidth: '150', disableFilters: true, show: true }]
export const STATUS = () => [{ Header: 'Status', accessor: 'status_active', minWidth: '100px', disableFilters: true, show: true }]
export const ACTION_BUTTON_STATUS = (width = 150) => [{
    Header: '',
    accessor: 'button_status',
    minWidth: width,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
},];
export const CREATED_AT = () => [{
    Header: 'Created At',
    accessor: 'created_at',
    minWidth: 200,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
}]

export const UPDATED_AT = () => [{
    Header: 'Waktu update',
    accessor: 'updated_at',
    minWidth: 200,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
}]

export const NAME = (header: string = "name") => [{
    Header: header,
    accessor: "name",
    minWidth: 150,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
},]



