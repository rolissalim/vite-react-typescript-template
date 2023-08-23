export const setErrorManul = (errors: any, setError: any) => {
    Object.keys(errors)?.map((item: any) => {
        setError(item, { type: 'manual', message: errors?.[item]?.[0] });
    })
}