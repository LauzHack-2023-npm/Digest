import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
} from '@mui/material';
import { DigestContext } from './ContextProvider';

const DigestSourcesForm = () => {
  const { digestSequences, setDigestSequences, incompleteDigestInState, setIncompleteDigestInState } = useContext(DigestContext);
  const navigate = useNavigate();
  console.log('[DigestSourcesForm] State to select sources for:', incompleteDigestInState)
  
  const [availableSources, setAvailableSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState(incompleteDigestInState.sources);

  // const postSources = async () => {
  //   const digestWithSources = incompleteDigestInState;
  //   digestWithSources.sources = selectedSources;

  //   try {
  //     const response = await fetch('/api/generate-digest-content', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(digestWithSources),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const completeDigest = await response.json();
  //     console.log('[DigestSourcesForm] Complete digest:', completeDigest);
  //     // updating context
  //     setDigestSequences([...digestSequences, completeDigest]);
  //     // redirect home
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };


  const postSources = async () => {
    const digestWithSources = incompleteDigestInState;
    digestWithSources.sources = selectedSources;

    try {
      // Initiate the POST request but don't await it
      const postRequest = fetch('/api/generate-digest-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(digestWithSources),
      });

      // Navigate to the home page immediately
      navigate('/');

      // Wait for the POST request to complete
      const response = await postRequest;

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const completeDigest = await response.json();
      console.log('[DigestSourcesForm] Complete digest:', completeDigest);
      // updating context
      setDigestSequences([completeDigest, ...digestSequences]);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  const getAvailableSources = async () => {
    try {
      const response = await fetch('/api/get-available-sources');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const sources = await response.json();
      console.log('Available sources:', sources);
      setAvailableSources(sources);
    } catch (error) {
      console.error('Error fetching available sources:', error);
    }
  };

  
  useEffect(() => {
    getAvailableSources();
  }, []);


  const handleCheckboxChange = (source) => {
    const existingSource = selectedSources.find(
      (item) => item.name === source.name
    );

    let updatedSources;
    if (existingSource) {
      // If the source is already present, remove it
      updatedSources = selectedSources.filter(
        (item) => item.name !== source.name
      );
    } else {
      // If the source is not present, add it
      updatedSources = [...selectedSources, source];
    }
    setSelectedSources(updatedSources);
  };

  return (
    <>
      <form>
        <FormControl fullWidth margin="normal">
          <p>Used sources</p>
          
          {availableSources.map((source, idx) => (
            <MenuItem key={source.name} value={source.name}>
              <Checkbox
                checked={selectedSources.some((item) => item.name === source.name)}
                onChange={() => handleCheckboxChange(source)}
              />
              {source.name}
            </MenuItem>
          ))}
          {/* {[1, 2, 3].map((index) =>
            showCustomSources >= index ? (
              <MenuItem key={index}>
                <Button value={index} onClick={() => removeCustomSource(index)}>
                  <DeleteIcon />
                </Button>
                <TextField
                  id={`custom-source-${index}`}
                  name={`custom-source-${index}`}
                  label="Custom source"
                  placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"
                  onChange={handleInputChange}
                />
              </MenuItem>
            ) : null
          )} */}
          {/* {showCustomSources < 3 ? (
            <MenuItem>
              <Button sx={{ justifySelf: 'left' }} onClick={addCustomSource}>
                <AddIcon sx={{ marginRight: 1 }} />
                Add custom source
              </Button>
            </MenuItem>
          ) : null} */}
        </FormControl>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 4 }}>
        <Button onClick={postSources} variant="outlined">
          Generate Digest
        </Button>
      </Box>
    </>
  );
};

export default DigestSourcesForm;
