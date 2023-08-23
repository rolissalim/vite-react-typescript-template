export const paramsImages = (data: any) => {

    let qParamsField: any = [];

    if (data?.image1) {
        qParamsField.push(data?.image1)
    }
    if (data?.image2) {
        qParamsField.push(data?.image2)
    }
    if (data?.image3) {
        qParamsField.push(data?.image3)
    }
    data.images=qParamsField
    delete data?.image1
    delete data?.image2
    delete data?.image3
};