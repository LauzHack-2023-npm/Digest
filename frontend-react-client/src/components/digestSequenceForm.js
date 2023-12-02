import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, TextField, Button, Box } from '@mui/material';

const DigestSequenceForm = () => {
    const [formData, setFormData] = useState({
        digestName: '',
        interestDescription: '',
        contentFrequency: 'Weekly',
        customFrequency: '',
        narrationStyle: 'scientific',
        customNarrationStyle: '',
        selectedSources: {
            wikipedia: false,
            news: false,
            archive: false,
        },
        customSources: ['', '', ''],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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

    const handleCustomSourceChange = (index, value) => {
        const newCustomSources = [...formData.customSources];
        newCustomSources[index] = value;
        setFormData({
            ...formData,
            customSources: newCustomSources,
        });
    };

    return (
        <form>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="digestName">Name of Your Digest</InputLabel>
                <Input
                    id="digestName"
                    name="digestName"
                    value={formData.digestName}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="interestDescription">Describe Your Interest</InputLabel>
                <Input
                    id="interestDescription"
                    name="interestDescription"
                    placeholder="Describe your interest"
                    value={formData.interestDescription}
                    onChange={handleInputChange}
                />
                <p>Example: "female electronic worker's life stories in the time of the French Revolution"</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="contentFrequency">How Often Do You Want the Content to be Generated?</InputLabel>
                <Select
                    id="contentFrequency"
                    name="contentFrequency"
                    value={formData.contentFrequency}
                    onChange={handleInputChange}
                >
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Biweekly">Biweekly</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                {formData.contentFrequency === 'Other' && (
                    <TextField
                        id="customFrequency"
                        name="customFrequency"
                        placeholder="Specify frequency"
                        value={formData.customFrequency}
                        onChange={handleInputChange}
                    />
                )}
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="narrationStyle">Narration Style</InputLabel>
                <Select
                    id="narrationStyle"
                    name="narrationStyle"
                    value={formData.narrationStyle}
                    onChange={handleInputChange}
                >
                    <MenuItem value="scientific">Scientific</MenuItem>
                    <MenuItem value="easyLanguage">Easy Language</MenuItem>
                    <MenuItem value="funMode">Fun Mode</MenuItem>
                </Select>
                {(formData.narrationStyle === 'easyLanguage' || formData.narrationStyle === 'funMode') && (
                    <TextField
                        id="customNarrationStyle"
                        name="customNarrationStyle"
                        placeholder="Specify narration style"
                        value={formData.customNarrationStyle}
                        onChange={handleInputChange}
                    />
                )}
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="usedSources">Used Sources</InputLabel>
                <Select
                    id="usedSources"
                    name="usedSources"
                    multiple
                    value={Object.keys(formData.selectedSources).filter(source => formData.selectedSources[source])}
                    onChange={() => {}}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {Object.keys(formData.selectedSources).map((source) => (
                        <MenuItem key={source} value={source}>
                            <Checkbox
                                checked={formData.selectedSources[source]}
                                onChange={() => handleCheckboxChange(source)}
                            />
                            <ListItemText primary={source} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {Object.keys(formData.selectedSources).filter(source => formData.selectedSources[source]).map((source, index) => (
                <FormControl fullWidth margin="normal" key={index}>
                    <InputLabel htmlFor={`customSource${index + 1}`}>Custom Source {index + 1}</InputLabel>
                    <TextField
                        id={`customSource${index + 1}`}
                        name={`customSource${index + 1}`}
                        placeholder={`Enter custom source ${index + 1}`}
                        value={formData.customSources[index]}
                        onChange={(e) => handleCustomSourceChange(index, e.target.value)}
                    />
                </FormControl>
            ))}
        </form>
    );
};

export default DigestSequenceForm;
