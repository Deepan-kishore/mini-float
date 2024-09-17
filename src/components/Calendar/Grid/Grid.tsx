import { forwardRef, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { drawGrid } from "@/utils/drawGrid/drawGrid";
import { boxHeight, canvasWrapperId, leftColumnWidth, outsideWrapperId } from "@/constants";
import { Loader, Tiles } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { resizeCanvas } from "@/utils/resizeCanvas";
import { getCanvasWidth } from "@/utils/getCanvasWidth";
import { GridProps } from "./types";
import { StyledCanvas, StyledInnerWrapper, StyledSpan, StyledWrapper } from "./styles";
import dayjs from "dayjs";
import { getDateFromCoordinates } from "@/utils/getTileProperties";
import { getDatesRange } from "@/utils/getDatesRange";
import { createPortal } from "react-dom";
import AddEventModal from "./AddEvent";
import { DataContext } from "@/context/DataContext";

const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { zoom, rows, data, onTileClick },
  ref
) {
  const { handleScrollNext, handleScrollPrev, date, isLoading, cols, startDate } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refRight = useRef<HTMLSpanElement>(null);
  const refLeft = useRef<HTMLSpanElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | dayjs.Dayjs>(null);
  const [eventDetails, setEventDetails] = useState({
    id:'',
    startDate: dayjs(),
    endDate: dayjs(),
    title: '',
    subtitle: '',
    description: '',
    color: '#000000',
  });
  const theme = useTheme();
  const dataContextConsumer = useContext(DataContext);

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = getCanvasWidth();
      const height = rows * boxHeight + 1;
      resizeCanvas(ctx, width, height);
      drawGrid(ctx, zoom, rows, cols, startDate, theme);
    },
    [cols, startDate, rows, zoom, theme]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const onResize = () => handleResize(ctx);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [handleResize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    handleResize(ctx);
  }, [date, rows, zoom, handleResize]);

  useEffect(() => {
    if (!refRight.current) return;
    const observerRight = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? handleScrollNext() : null),
      { root: document.getElementById(outsideWrapperId) }
    );
    observerRight.observe(refRight.current);

    return () => observerRight.disconnect();
  }, [handleScrollNext]);

  useEffect(() => {
    if (!refLeft.current) return;
    const observerLeft = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? handleScrollPrev() : null),
      {
        root: document.getElementById(outsideWrapperId),
        rootMargin: `0px 0px 0px -${leftColumnWidth}px`
      }
    );
    observerLeft.observe(refLeft.current);

    return () => observerLeft.disconnect();
  }, [handleScrollPrev]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log("data", data);
  
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    const datesRange = getDatesRange(date, zoom);
    const clickedDate = getDateFromCoordinates(x, y, zoom, datesRange.startDate);
  
    // Calculate the row index based on the y-coordinate
    const rowIndex = Math.floor(y / boxHeight);
  
    // Find the corresponding data ID from the dataset
    const dataId = data[rowIndex]?.id;
  
    console.log("Clicked Row Index:", rowIndex);
    console.log("Data ID:", dataId);
  
    setEventDetails((prev) => ({
      ...prev,
      startDate: clickedDate,
      endDate: clickedDate,
      id: dataId,
    }));
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (dataContextConsumer) {
      dataContextConsumer.createData(eventDetails);
    }
    resetEventDetails();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    resetEventDetails();
    setIsModalOpen(false);
  };

  const resetEventDetails = () => {
    setEventDetails({
      id:'',
      startDate: dayjs(),
      endDate: dayjs(),
      title: '',
      subtitle: '',
      description: '',
      color: '#000000',
    });
  };

  return (
    <StyledWrapper id={canvasWrapperId}>
      <StyledInnerWrapper ref={ref}>
        <StyledSpan position="left" ref={refLeft} />
        <Loader isLoading={isLoading} position="left" />
        <StyledCanvas ref={canvasRef} onClick={handleCanvasClick} />
        <Tiles data={data} zoom={zoom} onTileClick={onTileClick} />
        <StyledSpan ref={refRight} position="right" />
        <Loader isLoading={isLoading} position="right" />
      </StyledInnerWrapper>

      {createPortal(
       
          <AddEventModal
            data={{ eventDetails, setEventDetails }}
            isModalOpen={isModalOpen}
            handleClose={handleCancel}
            handleSave={handleSave}
          />
        ,
        document.body
      )}
    </StyledWrapper>
  );
});

export default Grid;