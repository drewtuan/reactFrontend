/* eslint-disable react-refresh/only-export-components */
// DataContext.js
import { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useAppointmentContext = () => {
  return useContext(DataContext);
};

// eslint-disable-next-line react/prop-types
export const Provider = ({ children }) => {

  const [data, setData] = useState(null);

  const updateData = (newData) => {
    setData(newData);
  };

  // Provider component that will contain the global data that can be passed to whatever child components (like our React pages) are inside.
  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
