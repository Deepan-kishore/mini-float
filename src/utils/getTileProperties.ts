import dayjs from "dayjs";
import { boxHeight, tileYOffset } from "@/constants";
import { Day, TileProperties } from "@/types/global";
import { getTileXAndWidth } from "./getTileXAndWidth";

export const getTileProperties = (
  row: number,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  resourceStartDate: Date,
  resourceEndDate: Date,
  zoom: number
): TileProperties => {
  const y = row * boxHeight + tileYOffset;
  const rangeStartHour = startDate.hour();
  const rangeEndHour = endDate.hour();
  let parsedResourceStartDate;
  let parsedResourceEndDate;
  let parsedStartDate;
  let parsedEndDate;

  switch (zoom) {
    case 2: {
      parsedResourceStartDate = dayjs(resourceStartDate);
      parsedResourceEndDate = dayjs(resourceEndDate);
      parsedStartDate = dayjs(startDate).hour(rangeStartHour).minute(0);
      parsedEndDate = dayjs(endDate).hour(rangeEndHour).minute(0);
      break;
    }
    default: {
      parsedResourceStartDate = dayjs(resourceStartDate).hour(0).minute(0);
      parsedResourceEndDate = dayjs(resourceEndDate).hour(23).minute(59);
      parsedStartDate = startDate;
      parsedEndDate = endDate;
      break;
    }
  }

 
  

  return {
    ...getTileXAndWidth(
      { startDate: parsedResourceStartDate, endDate: parsedResourceEndDate },
      { startDate: parsedStartDate, endDate: parsedEndDate },
      zoom
    ),
    y
  };
};


import { dayWidth, minutesInHour, singleDayWidth, zoom2ColumnWidth } from "@/constants";
// import { Day } from "@/types/global";

export const getDateFromCoordinates = (x: number, y: number, zoom: number, startDate: dayjs.Dayjs) => {
  let cellWidth: number;
  let timeUnit: dayjs.ManipulateType;

  switch (zoom) {
    case 0:
      cellWidth = singleDayWidth;
      timeUnit = "day";
      break;
    case 2:
      cellWidth = zoom2ColumnWidth;
      timeUnit = "minute";
      break;
    default:
      cellWidth = dayWidth;
      timeUnit = "day";
  }

  const dayIndex = Math.floor(x / cellWidth);
  const date = dayjs(startDate).add(dayIndex, timeUnit);

  return date;
};
