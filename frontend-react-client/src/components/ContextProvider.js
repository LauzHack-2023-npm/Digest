import React, { createContext, useState, useEffect } from 'react';

// Create the context object
export const DigestContext = createContext();

// Create the ContextProvider component
export const ContextProvider = ({ children }) => {
  // Define the state for DigestSequence
  const [digestSequences, setDigestSequences] = useState([]);

  // digestSequences is an array containing objects with the following structure:
  // { ... TODO

  useEffect(() => {
    console.log("Fetching dummy digest sequences from the backend")
    // Fetch the dummy digest sequences from the backend
    fetch('/api/get-dummy-digest-sequences')
      .then(response => response.json())
      .then(data => setDigestSequences(data))
      .catch(error => console.error(error));
  }, []);

  // Provide the state value and setter function to the child components
  return (
    <DigestContext.Provider value={{ digestSequences, setDigestSequences }}>
      {children}
    </DigestContext.Provider>
  );
};
