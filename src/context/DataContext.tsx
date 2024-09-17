// src/context/DataContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ConfigFormValues, SchedulerProjectData } from '@/types/global';
import { createMockData } from '@/mock/appMock';
import { ParsedDatesRange } from '@/utils/getDatesRange';

dayjs.extend(isBetween);
const date =  new Date().setDate(new Date().getDate() + 3)
export const mockedSchedulerData = [
  {
    id: "ec16e066-c562-4618-a417-102a87c48049",
    label: {
      id: "ec16e066-c562-4618-a417-102a87c48049",
      icon: "https://picsum.photos/24",
      title: "Deepan Kishore",
      subtitle: "Senior Developer",
      department: "Development",
      permission: "Admin",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date(),
        endDate: new Date("2024-10-03T10:28:22.649Z"),
        occupancy: 3600,
        title: "Project A",
        subtitle: "Subtitle A",
        description: "array indexing Salad West Account",
        bgColor: "rgb(254,165,177)",
      },
    ],
  },
  {
    id: "b2d6e5f4-8c6d-4b3a-9f3a-2d8e5f4b3a9f",
    label: {
      id: "b2d6e5f4-8c6d-4b3a-9f3a-2d8e5f4b3a9f",
      icon: "https://picsum.photos/24",
      title: "Jane Doe",
      subtitle: "Project Manager",
      department: "Management",
      permission: "User",
    },
    data: [
      {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        startDate: new Date(),
        endDate:  date,
        occupancy: 7200,
        title: "Project B",
        subtitle: "Subtitle B",
        description: "Managing the new project launch",
        bgColor: "rgb(135,206,250)",
      },
    ],
  },
  {
    id: "c3d4e5f6-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    label: {
      id: "c3d4e5f6-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
      icon: "https://picsum.photos/24",
      title: "John Smith",
      subtitle: "QA Engineer",
      department: "Quality Assurance",
      permission: "User",
    },
    data: [
      {
        id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        startDate: new Date("2024-10-03T10:00:00.000Z"),
        endDate: new Date("2024-10-05T16:00:00.000Z"),
        occupancy: 4800,
        title: "Project C",
        subtitle: "Subtitle C",
        description: "Testing the new features",
        bgColor: "rgb(144,238,144)",
      },
    ],
  },
  {
    id: "d4e5f6g7-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    label: {
      id: "d4e5f6g7-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
      icon: "https://picsum.photos/24",
      title: "Alice Johnson",
      subtitle: "UI/UX Designer",
      department: "Design",
      permission: "User",
    },
    data: [
      {
        id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
        startDate: new Date("2024-10-04T11:00:00.000Z"),
        endDate: new Date("2024-10-06T15:00:00.000Z"),
        occupancy: 6000,
        title: "Project D",
        subtitle: "Subtitle D",
        description: "Designing the new user interface",
        bgColor: "rgb(255,182,193)",
      },
    ],
  },
];

export type DataContextType = {
  dataset: typeof mockedSchedulerData;
  createData: (datum: {
    id: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    title: string;
    subtitle: string;
    description: string;
    color: string;
  }) => void;
  readData: () => SchedulerProjectData[];
  updateData: (id: string, updatedDatum: {
    id: string;
    startDate?: dayjs.Dayjs;
    endDate?: dayjs.Dayjs;
    title?: string;
    subtitle?: string;
    description?: string;
    color?: string;
  }) => void;
  deleteData: (id: string) => void;
  createLabel: (label: { icon: string; title: string; subtitle: string }) => void;
  readLabel: () => { icon: string; title: string; subtitle: string };
  updateLabel: (id: string, updatedLabel: { icon?: string; title?: string; subtitle?: string }) => void;
  deleteLabel: (id: string) => void;
  labeldataset: {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    department?: string;
    permission?: string;
  }[];
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataset, setDataset] = useState<typeof mockedSchedulerData>(mockedSchedulerData);
  console.log("dataset",dataset);

  const [labeldataset, setLabel] = useState<{
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    department?: string;
    permission?: string;
  }[]>(()=>dataset.map((item) => item.label));
  console.log("labeldataset",labeldataset);
  

const [isUpdatingFromLabel, setIsUpdatingFromLabel] = useState(false);
const [isUpdatingFromDataset, setIsUpdatingFromDataset] = useState(false);

useEffect(() => {
  if (!isUpdatingFromLabel) {
    const labels = dataset.map((item) => ({
      ...item.label,
      id: item.id,
    }));
    setIsUpdatingFromDataset(true);
    setLabel(labels);
  } else {
    setIsUpdatingFromLabel(false);
  }
}, [dataset]);

useEffect(() => {
  if (!isUpdatingFromDataset) {
    setDataset((prev) => {
      const updatedDataset = labeldataset.map((label) => {
        const existingItem = prev.find((item) => item.id === label.id);
        if (existingItem) {
          return {
            ...existingItem,
            label,
          };
        } else {
          return {
            id: label.id,
            label,
            data: [],
          };
        }
      });
      return updatedDataset;
    });
    setIsUpdatingFromLabel(true);
  } else {
    setIsUpdatingFromDataset(false);
  }
}, [labeldataset]);
  const createData = (datum: {
    id: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    title: string;
    subtitle: string;
    description: string;
    color: string;
  }) => {
    const newData = {
      id: datum.id,
      startDate: dayjs(datum.startDate).toDate(),
      endDate: dayjs(datum.endDate).toDate(),
      occupancy: 3600,
      title: datum.title,
      subtitle: datum.subtitle,
      description: datum.description,
      bgColor: datum.color,
    };

    const selectedData = dataset.find((item) => item.id === datum.id);
  setDataset((prev) => {
    if (selectedData) {
      return prev.map((item) => {
        if (item.id === datum.id) {
          return {
            ...item,
            data: [...item.data, newData],
          };
        }
        return item;
      });
    } else {
      return [
        ...prev,
        // {
        //   id: datum.id,
        //   label: readLabel(),
        //   data: [newData],
        // },
      ];  
    }
  }
  );
  };

  const readData = () => {
    return dataset[0].data;
  };

  const updateData = (id: string| undefined, updatedDatum: {
    id:string;
    startDate?: dayjs.Dayjs;
    endDate?: dayjs.Dayjs;
    title?: string;
    subtitle?: string;
    description?: string;
    color?: string;
  }) => {

    console.log("updatedDatum",id,updatedDatum);
    
    setDataset((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            data: item.data.map((dataItem) =>
              dataItem.id === updatedDatum.id
                ? updatedDatum
                : dataItem
            ),
          };
        }
        return item;
      });
    });
  };

  const deleteData = (id: string) => {
    setDataset((prev) => [
      {
        ...prev[0],
        data: prev[0].data.filter((item) => item.id !== id),
      },
    ]);
  };

  const createLabel = (label: { icon: string; title: string; subtitle: string }) => {
    const newLabel = { id: Math.random().toString(), ...label };
    setLabel((prev) => [...prev, newLabel]);
  };

  const readLabel = () => {
    return dataset[0].label;
  };

  const updateLabel = (id: string, updatedLabel: { icon?: string; title?: string; subtitle?: string }) => {
    setLabel((prev) =>
      prev.map((label) =>
        label.id === id
          ? {
              ...label,
              ...updatedLabel,
            }
          : label
      )
    );
  };

  const deleteLabel = (id: string) => {
    setLabel((prev) => prev.filter((label) => label.id !== id));
  };

  return (
    <DataContext.Provider value={{ labeldataset, dataset, createData, readData, updateData, deleteData, createLabel, readLabel, updateLabel, deleteLabel }}>
      {children}
    </DataContext.Provider>
  );
};