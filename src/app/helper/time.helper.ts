import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work

export function getAge(time: any) {
  moment.duration(moment().diff(time)).asYears();
  const result: any = moment.duration(moment().diff(time)).asYears() || '';
  return result != 'Invalid date' ? Math.floor(result) : '-';
}
export function timeFormat(time: any, format: string = "DD-MM-YYYY HH:mm") {
  const result = moment(time).locale("id").format(format) || '';
  return result != 'Invalid date' ? result : '-';
}

export function dateTimeFormat(time: any, format: string = 'DD MMM YYYY HH:mm') {
  const result = moment(time).locale("id").format(format) || '';
  return result != 'Invalid date' ? result : '-';
}
export function monthTimeFormat(time: any) {
  const result = moment(time).locale("id").format('MMM YYYY') || '';
  return result != 'Invalid date' ? result : '-';
}
export function yearTimeFormat(time: any) {
  const result = moment(time).locale("id").format('YYYY') || '';
  return result != 'Invalid date' ? result : '-';
}

export function timeFormatAlt(time: any) {
  const result = moment(time).locale("id").format('DD MMM YYYY') || '';
  return result != 'Invalid date' ? result : '-';
}

export function timeFormatAgo(time: any) {
  return moment(time).locale("id").fromNow();
}


export function timeFormSelect(count: any, addMinute: any) {
  let time = "2022-01-01 00:00:00";
  let optionsTimes: any = []
  for (let index = 0; index < count; index++) {

    let times = moment(time).add(addMinute * index, 'minutes').format("YYYY-MM-DD HH:mm")
    optionsTimes.push({
      label: moment(times).format("HH:mm"),
      value: moment(times).format("HH:mm")
    })

  }
  return optionsTimes
}


export function timeDiff(end_date: any, start_date: any, changeTo: string = "seconds") {
  let ms: any = moment(end_date).diff(moment(start_date));
  let duration = moment.duration(ms)
  let result: any = 0;


  switch (changeTo) {
    case "seconds":
      result = duration.asSeconds();
      break;
    case "minutes":
      result = duration.asMinutes();
      break;
    case "hours":
      result = duration.asHours();
      break;
    case "days":
      result = duration.asDays();
      break;

    default:
      break;
  }

  return result;
}

export function secondsToDHms(sum_seconds: number) {
  let days: any = Math.floor(sum_seconds / (3600 * 24));
  let hours: any = Math.floor((sum_seconds % (3600 * 24)) / 3600);
  let minutes: any = Math.floor(((sum_seconds % (3600 * 24)) % 3600) / 60);
  let seconds: any = Math.floor(((sum_seconds % (3600 * 24)) % 3600) % 60);
  if (((sum_seconds % (3600 * 24)) % 3600) < 60) {
    minutes = ((sum_seconds % (3600 * 24)) % 3600);
    seconds = 0;
  }


  // add 0 if value < 10; Example: 2 => 02
  if (days < 10) { days = "0" + days; }
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return days + ':' + hours + ':' + minutes + ':' + seconds;
}


export function changeSecondsTo(sum_seconds: number, changeTo: string = "DHms") {
  // const formatted = moment.utc(sum_seconds * 1000).format('HH:mm:ss');
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let result = "";

  switch (changeTo) {
    case "DHms":
      // seconds = duration.seconds();
      // minutes = duration.minutes();
      // hours = duration.hours();
      // days = duration.days();

      result = `${days}:${hours}:${minutes}:${seconds}`
      break;
    case "HH:mm:ss":
      result = moment.utc(sum_seconds * 1000).format('HH:mm:ss');
      break;
    default:
      break;
  }

  return result;
}

export function chartHoursCategories(start_date: any, end_date: any) {
  let interval = timeDiff(end_date, start_date, "hours")

  for (let i = 0; i < interval; i++) {

  }
}


export function chartDayCategories(start_date: any, end_date: any, format = "YYYY-MM-DD", formatLabel = "DD/MM/YYYY", formatAdd: any = "days") {
  let interval = timeDiff(end_date, start_date, formatAdd)
  let categoriesLabel: any = []
  let categoriesData: any = []
  for (let i = 0; i < interval; i++) {
    categoriesLabel.push(moment(start_date).add(i, formatAdd).format(formatLabel));
    categoriesData.push(moment(start_date).add(i, formatAdd).format(format));
  }

  return { categoriesData, categoriesLabel }
}

export function convertPeriod(period: string) {
  let date: any = {
    start_date: "",
    end_date: "",
  }
  switch (period) {
    case "t":
      date = {
        start_date: moment().format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
      }
      break;
    case "w":
      date = {
        start_date: moment().subtract(6, 'days').format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
      }
      break
    case "m":
      date = {
        start_date: moment().subtract(29, 'days').format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
      }
      break
    case "q":
      date = {
        start_date: moment().subtract(59, 'days').format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
      }
      break
    case "y":
      date = {
        start_date: moment().subtract(365, 'days').format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
      }
      break
    default:
      break
  }

  return date;
}



