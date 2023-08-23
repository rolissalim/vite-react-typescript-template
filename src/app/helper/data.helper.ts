export function isJson(str: any) {
  let extract: any
  try {
    extract = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return (extract) ? true : false;
}

/**
 *
 * @param {*} str data string json
 * @returns
 */
export function stringToJSON(str: string) {
  let result: string;

  try {
    result = JSON.parse(str);
  } catch (e) {
    result = "";
  }

  return result;
}
/**
 *
 * @param {*} str data string json
 * @returns
 */
export function JSONtoString(json: any) {
  let result = "";

  try {
    result = JSON.stringify(json);
  } catch (e) {
    result = "false";
  }

  return result;
}


export function checkImageUpload(data: any) {
  let result: any = []
  result = data?.filter((item: any) => {
    return typeof item?.src != "string"
  })

  return result;
}
export function defaultImage(type: string = "no-image") {
  let result: any = ""
  switch (type) {
    case "avatar":
      result = "/static/image/no-image.svg"
      break;
    default:
      result = "/static/image/no-image.svg"
      break;
  }

  return result;
}
export function arrayFilter(data: any, fieldSearch: string, search: string) {
  let result: any = null
  result = data?.filter((element: any) => {
    return element[fieldSearch] == search
  })

  return result;
}


export function removeUselessData(data: any) {
  Object.keys((data: any, key: any) => {
    if (data[key] != null) {
      delete data[key]
    }
  })


  return data
}

export function transformArrayToString(data: any, field: any) {
  let partai: any = []
  if (data) {
    data?.map((item: any) => {
      partai.push(item?.[field])
    });
  }
  return partai.join(',')
}


export function transformArrayToSelectOptions(data: any, id: string, value: string, selectLabel: string = "id", selectValue: string = "name") {
  let ids: any = []
  let datas: any = []
  if (data) {

    if (data?.length > 0) {
      datas = data?.map((item: any) => {
        ids.push(item[id])
        return { [selectLabel]: item[id], [selectValue]: item[value] }
      });
    }
  }

  return { data: datas, ids: ids }
}

export function sumData(data: any) {
  let total = 0;
  if (data) {
    data?.forEach((item: any) => {
      total += item.value
    });
  }
  return total
}



export function arrayObjectToSingleArray(data: any, field: any) {
  return data.map((a: any) => a?.[field]);

}

export function transformArrayToList(data: any, field: any) {
  let datas: any = []
  if (data) {
    data?.map((item: any) => {
      datas.push(item?.[field])
    });
  }
  return datas.join(', ')
}
