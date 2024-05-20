import React, { createContext, useContext } from 'react';

const FormDataContext = createContext(null);

export const FormDataProvider = ({ children, value }) => (
  <FormDataContext.Provider value={value}>
    {children}
  </FormDataContext.Provider>
);

export const useFormDataContext = () => useContext(FormDataContext);
