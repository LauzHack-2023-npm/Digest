import React, {useContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, Checkbox, FormControl, ListItemText, MenuItem, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {DigestContext} from "./ContextProvider";

const ResourcesForm = () => {
    const {digestSequences, setDigestSequences} = useContext(DigestContext);
    const {state} = useLocation();
    const {digestSequence} = state;
    const navigate = useNavigate();

    const [showCustomSources, setShowCustomSources] = useState(0);
    const [selectedSources, setSelectedSources] = useState(digestSequence.sources)
    const [customSources, setCustomSources] = useState({
        'custom-source-1': '',
        'custom-source-2': '',
        'custom-source-3': ''
    })

    const addCustomSource = () => {
        if (showCustomSources < 3) {
            setShowCustomSources(showCustomSources + 1);
        }
    };

    const postSources = async () => {
        const body = {
            ...digestSequence,
            sources: selectedSources,
            customSources: customSources
        }

        try {
            const response = await fetch('/api/sources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        ...digestSequence,
                        sources: selectedSources,
                        customSources: customSources
                    }
                ),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            // updating context
            digestSequences.push(responseData)
            // redirect home
            navigate('/');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const removeCustomSource = (index) => {
        setCustomSources((prevSources) => {
            const updatedSources = {...prevSources};
            delete updatedSources[`custom-source-${index}`];
            const valuesArray = Object.values(updatedSources);

            const result = {
                'custom-source-1': '',
                'custom-source-2': '',
                'custom-source-3': ''
            }

            valuesArray.map((value, i) => {
                result[`custom-source-${i + 1}`] = value
            })

            setShowCustomSources((prevCount) => prevCount - 1);
            return result;
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCustomSources((prevSources) => ({
            ...prevSources,
            [name]: value
        }));
    };

    const handleCheckboxChange = (source) => {
        const existingSource = selectedSources.find(item => item.name === source.name);

        if (existingSource) {
            // If the source is already present, remove it
            const updatedSources = selectedSources.filter(item => item.name !== source.name);
            setSelectedSources(updatedSources);
        } else {
            // If the source is not present, add it
            const updatedSources = [...selectedSources, source];
            setSelectedSources(updatedSources);
        }
    };

    return (
        <>
            <form>
                <FormControl fullWidth margin="normal">
                    <p>Used sources</p>
                    {digestSequence.sources.map((source) => (
                        <MenuItem key={source} value={source}>
                            <Checkbox
                                checked={selectedSources.find(item => item.name === source.name)}
                                onChange={() => handleCheckboxChange(source)}
                            />
                            <ListItemText primary={source.name}/>
                        </MenuItem>
                    ))}
                    {showCustomSources > 0 ? <MenuItem>
                        <Button value={'1'} onClick={() => removeCustomSource(1)}>
                            <DeleteIcon/>
                        </Button>
                        <TextField
                            id="custom-source-1"
                            name="custom-source-1"
                            label="Custom source"
                            placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"
                            onChange={handleInputChange}
                        />
                    </MenuItem> : null}
                    {showCustomSources > 1 ? <MenuItem>
                        <Button value={'2'} onClick={() => removeCustomSource(2)}>
                            <DeleteIcon/>
                        </Button>
                        <TextField
                            id="custom-source-2"
                            name="custom-source-2"
                            label="Custom source"
                            placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"
                            onChange={handleInputChange}
                        />
                    </MenuItem> : null}
                    {showCustomSources > 2 ?
                        <MenuItem>
                            <Button value={'3'} onClick={() => removeCustomSource(3)}>
                                <DeleteIcon/>
                            </Button>
                            <TextField
                                id="custom-source-3"
                                name="custom-source-3"
                                label="Custom source"
                                placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"
                                onChange={handleInputChange}
                            />
                        </MenuItem> : null}
                    {showCustomSources < 3 ? <MenuItem>
                        <Button sx={{justifySelf: 'left'}} onClick={addCustomSource}>
                            <AddIcon sx={{marginRight: 1}}/>
                            Add custom source
                        </Button>
                    </MenuItem> : null}
                </FormControl>
            </form>
            <Box sx={{display: 'flex', justifyContent: 'center', marginY: 4}}>
                <Button onClick={postSources} variant="outlined">Generate Digest</Button>
            </Box>
        </>

    )
        ;
};

export default ResourcesForm;
