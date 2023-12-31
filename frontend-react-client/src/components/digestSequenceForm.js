import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DigestContext } from './ContextProvider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const DigestSequenceForm = () => {
  const navigate = useNavigate();
  const {incompleteDigestInState, setIncompleteDigestInState} = useContext(
    DigestContext
  );

  console.log('[DigestSequenceForm] State to complete:', incompleteDigestInState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setIncompleteDigestInState({
  //     ...incompleteDigestInState,
  //     [name]: value
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncompleteDigestInState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postDigestSequence = async () => {
    try {
      const response = await fetch('/api/get-digest-with-sources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(incompleteDigestInState)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const incompleteDigestWithSources = await response.json();
      console.log('[DigestSequenceForm] Digest with sources:', incompleteDigestWithSources);
      setIncompleteDigestInState(incompleteDigestWithSources);

      navigate('/finalize-digest-sources');

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className='mx-4'>
      <h1 className='text-left font-bold text-xl mt-8'>Create a Digest</h1>
      <form>
        <FormControl fullWidth margin="normal">
          <TextField
            id="digestName"
            name="digestName"
            label="Give it a name!"
            placeholder="For example, 'My Daily Digest'"
            value={incompleteDigestInState.digestName}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="digestDescription"
            name="digestDescription"
            label="What are you interested in?"
            placeholder="For instance, 'Female electronic worker's in the time of the French Revolution life stories.'"
            multiline
            rows={4}
            value={incompleteDigestInState.digestDescription}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="frequency-label">How often do you want to receive it?</InputLabel>
          <Select
            labelId="frequency-label"
            label="How frequently would you like to receive it?"
            id="contentFrequency"
            name="contentFrequency"
            value={incompleteDigestInState.contentFrequency}
            onChange={handleInputChange}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="biweekly">Biweekly</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {incompleteDigestInState.contentFrequency === 'other' && (
            <TextField
              sx={{ marginY: 1 }}
              id="customFrequency"
              name="customFrequency"
              placeholder="Specify frequency"
              value={incompleteDigestInState.customFrequency}
              onChange={handleInputChange}
            />
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="narration-label">Narration Style</InputLabel>
          <Select
            labelId="narration-label"
            label="Narration Style"
            id="narrationStyle"
            name="narrationStyle"
            value={incompleteDigestInState.narrationStyle}
            onChange={handleInputChange}
          >
            <MenuItem value="easyLanguage">Easy Language</MenuItem>
            <MenuItem value="scientific">Scientific</MenuItem>
            <MenuItem value="funMode">Fun Mode</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {incompleteDigestInState.narrationStyle === 'other' && (
            <TextField
              sx={{ marginY: 1 }}
              id="customNarrationStyle"
              name="customNarrationStyle"
              placeholder="Specify narration style"
              value={incompleteDigestInState.customNarrationStyle}
              onChange={handleInputChange}
            />
          )}
        </FormControl>
      </form>

      <Box sx={{ display: 'flex', justifyContent: 'right', margin: 4, }}>
        <Button variant="contained" endIcon={<ArrowForwardIosIcon/>} onClick={postDigestSequence}>
          Send
        </Button>
      </Box>
    </div>
  );
};

export default DigestSequenceForm;
