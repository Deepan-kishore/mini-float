// src/constants.ts
import { prefixId } from "./styles";

export const dayWidth = 120; // Adjusted for better fit
export const headerMonthHeight = 30; // Increased for better visibility
export const headerWeekHeight = 40; // Increased for better visibility
export const headerDayHeight = 50; // Increased for better visibility
export const headerHeight = headerDayHeight + headerWeekHeight + headerMonthHeight;
export const weekWidth = 100; // Adjusted for better fit
export const boxHeight = 80; // Increased for better visibility
export const leftColumnWidth = 250; // Adjusted for better fit
export const singleDayWidth = 14; // Adjusted for better fit
export const zoom2ColumnWidth = 60; // Adjusted for better fit
export const zoom2HeaderTopRowHeight = 30; // Increased for better visibility
export const zoom2HeaderMiddleRowHeight = 20; // Increased for better visibility
export const zoom2HeaderBottomRowHeight = 50; // Increased for better visibility
export const zoom2HeaderHeight =
  zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight + zoom2HeaderBottomRowHeight;
export const zoom2ButtonJump = 1;
export const weeksInYear = 52;
export const navHeight = 50; // Increased for better visibility
export const fonts = {
  topRow: "600 16px Inter", // Increased font size
  middleRow: "400 12px Inter", // Increased font size
  bottomRow: {
    name: "600 16px Inter", // Increased font size
    number: "600 12px Inter" // Increased font size
  }
};
export const screenWidthMultiplier = 3;
export const dayNameYoffset = 1.6;
export const dayNumYOffset = 4.5;
export const monthsInYear = 12;
export const hoursInDay = 24;
export const canvasHeaderWrapperId = "reactSchedulerCanvasHeaderWrapper";
export const canvasWrapperId = "reactSchedulerCanvasWrapper";
export const outsideWrapperId = prefixId;
export const tileYOffset = 4;
export const tileHeight = 70; // Increased for better visibility
export const formFieldsIds = {
  peopleCount: "peopleCount",
  projectsPerYear: "projectsPerYear",
  yearsCovered: "yearsCovered",
  startDate: "startDate",
  maxRecordsPerPage: "maxRecordsPerPage",
  isFullscreen: "isFullscreen"
};
export const businessDays = 5;
export const maxHoursPerWeek = 40;
export const maxHoursPerDay = 8;
export const topRowTextYPos = headerMonthHeight / 2 + 2;
export const middleRowTextYPos = headerWeekHeight / 2 + headerMonthHeight + 1;
export const buttonWeeksJump = 2;
export const minutesInHour = 60;