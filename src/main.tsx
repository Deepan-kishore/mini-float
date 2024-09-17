import React, { createContext, useContext, useRef } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes";
import "./styles.css";
import { SchedulerData } from "./types/global";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DataProvider } from "./context/DataContext";


type AppContextType = {
  topBarHandlers: React.MutableRefObject<{
    data: SchedulerData | undefined;
    config?: () => void;
    handleGoNext?: () => void;
    handleGoPrev?: () => void;
    handleGoToday?: () => void;
    zoomIn?: () => void;
    zoomOut?: () => void;
    isNextZoom: boolean;
    isPrevZoom: boolean;
    handleFilterData?: () => void;
    onClearFilterData?: (e) => void;
    zoom?: number;
  }>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  // if (!context) {
  //   throw new Error('useAppContext must be used within an AppProvider');
  // }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const topBarHandlers = useRef({
    data: undefined,
    config: undefined,
    handleGoNext: undefined,
    handleGoPrev: undefined,
    handleGoToday: undefined,
    zoomIn: undefined,
    zoomOut: undefined,
    isNextZoom: false,
    isPrevZoom: false,
    handleFilterData: undefined,
    onClearFilterData: undefined
  });

  return (
    <AppContext.Provider value={{ topBarHandlers }}>
      {children}
    </AppContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
        <DataProvider>

    <AppProvider>
      <RouterProvider router={AppRouter} />
    </AppProvider>
    </DataProvider>
  </React.StrictMode>
);