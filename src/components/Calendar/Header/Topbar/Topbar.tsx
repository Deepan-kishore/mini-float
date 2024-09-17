import { useTheme } from "styled-components";
import { FC, MouseEventHandler, useContext, useEffect } from "react";
import { Icon, IconButton, Toggle } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
  NavigationWrapper,
  Wrapper,
  NavBtn,
  Today,
  Zoom,
  Filters,
  OptionsContainer
} from "./styles";
import { TopbarProps } from "./types";
import { AppContext, useAppContext } from "@/main";

const Topbar: FC<TopbarProps> = ({ width, showThemeToggle, toggleTheme }) => {
  const { topbar } = useLanguage();
  const handlers = useCalendar();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    zoomIn,
    zoomOut,
    isNextZoom,
    isPrevZoom,
    handleFilterData,
    onClearFilterData
  } = handlers;
  const { colors } = useTheme();
  const { filterButtonState = -1 } = config;

  const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    
    event.stopPropagation();
    onClearFilterData?.();
  };
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  const { topBarHandlers } = useAppContext();
const AppcontextRef = topBarHandlers?.current ?? {};
  useEffect(() => {
for(const key in handlers){
  if (handlers.hasOwnProperty(key)) {
    // handlers[key as keyof typeof AppcontextRef] = handlers[key as keyof typeof handlers];
AppcontextRef[key as keyof typeof AppcontextRef] = handlers[key as keyof typeof handlers];
  }
}

AppcontextRef.onClearFilterData = handleClearFilters;
    
// AppcontextRef?.current?.handleGoToday = handleGoToday;

    

    // Cleanup on unmount
    return () => {
      // topBarHandlers.current.someFunction = undefined;
      // topBarHandlers.current.anotherFunction = undefined;
    };
  }, [topBarHandlers,handlers]);

  useEffect(()=>{

  },[AppcontextRef,handlers])
  
  // useEffect(()=>{
  //   AppContextRef = {
  //     data,
  //     config,
  //     handleGoNext,
  //     handleGoPrev,
  //     handleGoToday,
  //     zoomIn,
  //     zoomOut,
  //     isNextZoom,
  //     isPrevZoom,
  //     handleFilterData,
  //     onClearFilterData
  //   };
  // },[])

  return <></>
  return (
    <Wrapper width={width}>
      <Filters>
        {filterButtonState >= 0 && (
          <IconButton
            variant={filterButtonState ? "filled" : "outlined"}
            iconName="filter"
            width="16"
            height="16"
            onClick={handleFilterData}>
            {topbar.filters}
            {!!filterButtonState && (
              <span onClick={handleClearFilters}>
                <Icon iconName="close" height="16" width="16" fill={colors.textSecondary} />
              </span>
            )}
          </IconButton>
        )}
      </Filters>
      <NavigationWrapper>
        <NavBtn disabled={!data?.length} onClick={handleGoPrev}>
          <Icon iconName="arrowLeft" height="15" fill={colors.textPrimary} />
          {topbar.prev}
        </NavBtn>
        <Today onClick={handleGoToday}>{topbar.today}</Today>
        <NavBtn disabled={!data?.length} onClick={handleGoNext}>
          {topbar.next}
          <Icon iconName="arrowRight" height="15" fill={colors.textPrimary} />
        </NavBtn>
      </NavigationWrapper>
      <OptionsContainer>
        {showThemeToggle && <Toggle toggleTheme={toggleTheme} />}
        <Zoom>
          {topbar.view}
          <IconButton
            isDisabled={!isPrevZoom}
            onClick={zoomOut}
            isFullRounded
            iconName="subtract"
            width="14"
          />
          <IconButton
            isDisabled={!isNextZoom}
            onClick={zoomIn}
            isFullRounded
            iconName="add"
            width="14"
          />
        </Zoom>
      </OptionsContainer>
    </Wrapper>
  );
};
export default Topbar;
