import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useNavigate } from 'react-router-dom';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';

const DigestSequenceForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        digestName: '',
        digestDescription: '',
        contentFrequency: 'weekly',
        customFrequency: '',
        narrationStyle: 'scientific',
        customNarrationStyle: '',
    });

    const [showCustomSources, setShowCustomSources] = useState(0);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (source) => {
        setFormData({
            ...formData,
            selectedSources: {
                ...formData.selectedSources,
                [source]: !formData.selectedSources[source],
            },
        });
    };

    const addCustomSource = () => {
        if (showCustomSources < 3) {
            setShowCustomSources(showCustomSources + 1);
        }
    };

    const postDigestSequence = async () => {
        try {
            const response = await fetch('/api/digest-sequence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            navigate('/set-resources',{ state: { digestSequence: responseData } });


        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (<>
        <form>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="digestName"></InputLabel>
                <TextField
                    label="Name of Your Digest"
                    id="digestName"
                    name="digestName"
                    value={formData.digestName}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="digestDescription"></InputLabel>
                <TextField
                    id="digestDescription"
                    name="digestDescription"
                    label="Describe your interest"
                    placeholder="e.g., Female electronic worker's in the time of the French Revolution life stories"
                    multiline
                    rows={4}
                    value={formData.digestDescription}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="frequency-label">Frequency</InputLabel>
                <Select
                    labelId="frequency-label"
                    label="Frequency"
                    id="contentFrequency"
                    name="contentFrequency"
                    value={formData.contentFrequency}
                    onChange={handleInputChange}
                >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="biweekly">Biweekly</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                {formData.contentFrequency === 'other' && (
                    <TextField sx={{marginY: 1}}
                        id="customFrequency"
                        name="customFrequency"
                        placeholder="Specify frequency"
                        value={formData.customFrequency}
                        onChange={handleInputChange}
                    />
                )}
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="narration-label">Narration</InputLabel>
                <Select
                    labelId="narration-label"
                    label="Narration"
                    id="narrationStyle"
                    name="narrationStyle"
                    value={formData.narrationStyle}
                    onChange={handleInputChange}
                >
                    <MenuItem value="scientific">Scientific</MenuItem>
                    <MenuItem value="easyLanguage">Easy Language</MenuItem>
                    <MenuItem value="funMode">Fun Mode</MenuItem>
                    <MenuItem value="other">Other</MenuItem>

                </Select>
                {(formData.narrationStyle === 'other') && (
                    <TextField sx={{marginY: 1}}
                        id="customNarrationStyle"
                        name="customNarrationStyle"
                        placeholder="Specify narration style"
                        value={formData.customNarrationStyle}
                        onChange={handleInputChange}
                    />
                )}
            </FormControl>
        </form>
            <Box sx={{display: 'flex', justifyContent: 'center', marginY: 4}}>
                <Button onClick={postDigestSequence} variant="outlined">Next</Button>
            </Box>

        </>
    );
};

export default DigestSequenceForm;
