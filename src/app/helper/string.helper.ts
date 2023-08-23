import moment from "moment";

/** String Helper Title Case  */
export function toTitleCase(str: string) {
  let stringData = str.replace(/_/g, ' ');
  return stringData.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
export function removeTagHtml(str: string) {
  let regex = "/(<([^>]+)>)/ig"
  return str.replace(regex, "");
}

export function truncate(str: string, max: number) {
  return str && str?.length > max ? str.substr(0, max - 1) + '…' : str;
}
export function sortArray(data: any = []) {
  let datas = data.sort(function (x: any, y: any) {
    return x - y
  });
  return datas;
}

export function removeTags(str: any) {
  if ((str === null) || (str === ''))
    return false;
  else
    str = str.toString();
  return str.replace(/(<([^>]+)>)/ig, '');
}

export function isBase64(str: any) {
  if (str === '' || str.trim() === '') { return false; }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

export function httpImage(data: any = "") {
  let image = data;
  if (data && data != null && data != "" && typeof data == "string") {
    image = `${process.env.API_CDN_SERVICE}${data}?t=${moment().unix()}`
  }
  return image || "-";
}

export function replaceAll(str: string, mapObj: any) {
  if (!str) return str;

  if (typeof str !== 'string') {
    str = String(str);
  }

  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');

  return str.replace(re, function (matched: any) {
    return mapObj[matched.toLowerCase()];
  });
}

export function stringTrim(str: string) {
  return str.trim()
}
