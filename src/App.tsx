// src/App.tsx
import React, { useContext, useState, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMockData } from './mock/appMock';
import { ParsedDatesRange } from './utils/getDatesRange';
import { ConfigFormValues, SchedulerProjectData } from './types/global';
import ConfigPanel from './components/ConfigPanel';
import { StyledSchedulerFrame } from './styles';
import { Scheduler } from '.';
import TileDetailsModal from './components/Tiles/Tile/TileDetailsModal';
import { DataContext, DataContextType } from './context/DataContext';

dayjs.extend(isBetween);

export function App() {
  const context = useContext<DataContextType | undefined>(DataContext);

  const dataset = context?.dataset;
  const {
    updateData,
    deleteData,
    createData,
    updateLabel,
    deleteLabel,
    createLabel,
  } = context || {};
  const [values, setValues] = useState<ConfigFormValues>({
    peopleCount: 15,
    projectsPerYear: 5,
    yearsCovered: 0,
    startDate: undefined,
    maxRecordsPerPage: 50,
    isFullscreen: true
  });

  const { peopleCount, projectsPerYear, yearsCovered, isFullscreen, maxRecordsPerPage } = values;
  const mocked = useMemo(
    () => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
    [peopleCount, projectsPerYear, yearsCovered]
  );

  const [range, setRange] = useState<ParsedDatesRange>({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  const filteredData = useMemo(
    () =>
      mocked.map((person) => (person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        )
      )),
    [mocked, range.endDate, range.startDate]
  );

  const handleFilterData = () => console.log(`Filters button was clicked.`);

  const [selectedTileData, setSelectedTileData] = useState<SchedulerProjectData | null>(null);
  const [selectedTileDataId, setSelectedTileDataId] = useState<string | undefined>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTileClick = (selecteddata: SchedulerProjectData) => {
    console.log("selected data", );
    const selectedId= context?.dataset.find(item=> item.data.find(d=> d.id === selecteddata.id))
    
    setSelectedTileDataId(selectedId?.id)
    setSelectedTileData(selecteddata);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTileData(null);
  };

  return (
    <div>
      {/* <ConfigPanel values={values} onSubmit={setValues} /> */}
      {context?.dataset !== null && (false ? (
        <Scheduler
          startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
          onRangeChange={handleRangeChange}
          data={dataset}
          isLoading={false}
          onTileClick={handleTileClick}
          onFilterData={handleFilterData}
          config={{ zoom: 1, maxRecordsPerPage: maxRecordsPerPage, showThemeToggle: true }}
          onItemClick={(data) => console.log("clicked: ", data)}
        />
      ) : (
        <StyledSchedulerFrame>
          <Scheduler
            startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
            onRangeChange={handleRangeChange}
            isLoading={false}
            data={dataset}
            onTileClick={handleTileClick}
            onFilterData={handleFilterData}
            config={{ zoom: 1, maxRecordsPerPage: maxRecordsPerPage, showThemeToggle: true }}
            onItemClick={(data) => console.log("clicked: ", data)}
          />
        </StyledSchedulerFrame>
      ))}
      {isModalOpen && <TileDetailsModal
        options={{
          updateData,
          deleteData,
          createData,
          updateLabel,
          deleteLabel,
          createLabel,
        }}
        selectedTileDataId={selectedTileDataId}
        show={isModalOpen}
        handleClose={handleCloseModal}
        tileData={selectedTileData}
      />}
    </div>
  );
}