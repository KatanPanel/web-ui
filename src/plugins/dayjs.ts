import dayjs from "dayjs";
import localizedFromat from "dayjs/plugin/localizedFormat";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(localizedFromat)
dayjs.extend(weekday)
dayjs.extend(isToday)
