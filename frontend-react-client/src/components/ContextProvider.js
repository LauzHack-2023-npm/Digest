import React, { createContext, useState, useEffect } from 'react';

// Create the context object
export const DigestContext = createContext();

// Create the ContextProvider component
export const ContextProvider = ({ children }) => {
  // Define the state for DigestSequence
  const [digestSequences, setDigestSequences] = useState([]);
  const [incompleteDigestInState, setIncompleteDigestInState] = useState({
    digestName: '',
    digestDescription: '',
    contentFrequency: '',
    customFrequency: '',
    narrationStyle: '',
    customNarrationStyle: '',
    createdAt: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    sources: [],
    episodes: [],
  });

  useEffect(() => {
    // Fetch the dummy digest sequences from the backend
    fetch('/api/get-dummy-digest-sequences')
      .then(response => response.json())
      .then(data => {
        setDigestSequences(data);
        console.log("Fetched dummy digest sequences:", data);
      })
      .catch(error => console.error(error));
  }, []);

  // Provide the state value and setter function to the child components
  return (
    <DigestContext.Provider value={{ digestSequences, setDigestSequences, incompleteDigestInState, setIncompleteDigestInState }}>
      {children}
    </DigestContext.Provider>
  );
};
