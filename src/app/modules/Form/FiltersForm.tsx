import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getObjectKeys, objectKeyChanger } from '@app/helper/object.helper';
import { get, pick, size } from 'lodash';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { setActiveFilters } from '@app/store/reducers/ui';
import moment from 'moment';

interface IFiltersForm {
    children?: any;
    setError: any;
    setValue: any;
    dataParams: any;
    fields?: any;
    onLoading?: any;
    customLabel?: any;
    overrideType?: any;
}

function FiltersForm({
    children,
    setValue,
    dataParams,
    fields = {},
    overrideType,
}: IFiltersForm) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = qs.parse(location.search);

    useEffect(() => {
        if (dataParams) {
            let params: any = Object.fromEntries(Object.entries(dataParams).filter(value => value[1]))
            const qParams = objectKeyChanger(params, 'id_', '__');

            navigate({
                search: '?' + qs.stringify(qParams),
            });

        }
    }, [dataParams]);

    /** INIT FILTERS QUERY PARAMS */
    useEffect(() => {
        if (location?.search && queryParams) {
            initDataForm(queryParams);
        }

    }, [location?.search]);

    /** INIT DATA FORM EDIT OR NEW DATA */
    const initDataForm = (data: any = undefined) => {
        const valueData = data ? pick(objectKeyChanger(data, '__', 'id_'), getObjectKeys(fields)) : fields;
        Object.keys(valueData).map((field: any) => {
            const overrideCheck = get(overrideType, field);
            let v = overrideCheck == 'string' ? `${valueData[field]}` : valueData[field];
            v = overrideCheck == 'int' ? parseInt(valueData[field]) : v;
            v = overrideCheck == 'float' ? parseFloat(valueData[field]) : v;
            v = overrideCheck == 'date' ? moment(valueData[field], 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD[T]HH:mm') : v;
            setValue(field, v);
        });
        const f: any = Object.keys(valueData)
            ?.filter((key: any) => valueData[key])
            .reduce((cur, key) => {
                const overrideCheck = get(overrideType, key);

                let val: any = valueData[key]
                if (overrideCheck == 'date') val = moment(valueData[key]).format('YYYY-MM-DD HH:mm')

                return Object.assign(cur, { [key]: val });
            }, {});

        const active = { filters: f, count: size(f) };
        dispatch(setActiveFilters(active));
    };

    // useEffect(() => {
    //     return () => {
    //         dispatch(setActiveFilters({ filters: {}, count: 0 }))
    //     }
    // }, [])


    return (
        <>
            {children}
        </>
    );
}

export default FiltersForm;
