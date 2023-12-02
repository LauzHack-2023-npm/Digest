import React, {useState} from 'react';
import {
    FormControl,
    InputLabel,
    Input,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    TextField,
    Button,
    Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
            const response = await fetch('/api/time', {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json', // Adjust content type based on your API requirements
                // },
                // body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Optionally, you can handle the response here if needed
            const responseData = await response.json();
            console.log(responseData);

            // // You can reset the form data or perform other actions after a successful request
            // setFormData({
            //     digestName: '',
            //     interestDescription: '',
            //     contentFrequency: 'Weekly',
            //     customFrequency: '',
            //     narrationStyle: 'scientific',
            //     customNarrationStyle: '',
            //     selectedSources: {
            //         wikipedia: false,
            //         news: false,
            //         archive: false,
            //     },
            //     customSources: ['', '', ''],
            // });

            // Optionally, you can navigate to another page or perform other actions
            // after a successful request
        } catch (error) {
            console.error('Error sending data:', error);
            // Optionally, you can handle errors and display a message to the user
        }
    };


    return (<>
        <form>
            <FormControl fullWidth margin="normal">
                {/*<InputLabel htmlFor="digestName">Name of Your Digest</InputLabel>*/}
                {/*<Input*/}
                {/*    id="digestName"*/}
                {/*    name="digestName"*/}
                {/*    value={formData.digestName}*/}
                {/*    onChange={handleInputChange}*/}
                {/*/>*/}
                <InputLabel htmlFor="digestName"></InputLabel>
                <TextField
                    label="Name of Your Digest"
                    // placeholder="e.g., Female electronic worker's in the time of the French Revolution life stories"
                    id="digestName"
                    name="digestName"
                    value={formData.digestName}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="interestDescription"></InputLabel>
                <TextField
                    id="interestDescription"
                    name="interestDescription"
                    label="Describe your interest"
                    placeholder="e.g., Female electronic worker's in the time of the French Revolution life stories"
                    multiline
                    rows={4}
                    value={formData.interestDescription}
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
                    <TextField
                        id="customNarrationStyle"
                        name="customNarrationStyle"
                        placeholder="Specify narration style"
                        value={formData.customNarrationStyle}
                        onChange={handleInputChange}
                    />
                )}
            </FormControl>

            {/*<FormControl fullWidth margin="normal">*/}
            {/*    <p>Used sources</p>*/}
            {/*    {Object.keys(formData.selectedSources).map((source) => (*/}
            {/*        <MenuItem key={source} value={source}>*/}
            {/*            <Checkbox*/}
            {/*                checked={formData.selectedSources[source]}*/}
            {/*                onChange={() => handleCheckboxChange(source)}*/}
            {/*            />*/}
            {/*            <ListItemText primary={source}/>*/}
            {/*        </MenuItem>*/}
            {/*    ))}*/}
            {/*    {showCustomSources > 0 ? <MenuItem hidden={true}>*/}
            {/*        <Checkbox*/}
            {/*            // checked={formData.selectedSources[source]}*/}
            {/*            // onChange={() => handleCheckboxChange(source)}*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            id="custom-source-1"*/}
            {/*            name="custom-source-1"*/}
            {/*            label="Custom source"*/}
            {/*            placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"*/}
            {/*            value={formData.interestDescription}*/}
            {/*            onChange={handleInputChange}*/}
            {/*        />*/}
            {/*    </MenuItem> : null}*/}
            {/*    {showCustomSources > 1 ? <MenuItem>*/}
            {/*        <Checkbox*/}
            {/*            // checked={formData.selectedSources[source]}*/}
            {/*            // onChange={() => handleCheckboxChange(source)}*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            id="custom-source-2"*/}
            {/*            name="custom-source-2"*/}
            {/*            label="Custom source"*/}
            {/*            placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"*/}
            {/*            value={formData.interestDescription}*/}
            {/*            onChange={handleInputChange}*/}
            {/*        />*/}
            {/*    </MenuItem> : null}*/}
            {/*    {showCustomSources > 2 ?*/}
            {/*        <MenuItem>*/}
            {/*            <Checkbox*/}
            {/*                // checked={formData.selectedSources[source]}*/}
            {/*                // onChange={() => handleCheckboxChange(source)}*/}
            {/*            />*/}
            {/*        <TextField*/}
            {/*            id="custom-source-3"*/}
            {/*            name="custom-source-3"*/}
            {/*            label="Custom source"*/}
            {/*            placeholder="e.g., https://www.swisscom.ch/de/privatkunden/internet"*/}
            {/*            value={formData.interestDescription}*/}
            {/*            onChange={handleInputChange}*/}
            {/*        />*/}
            {/*    </MenuItem> : null}*/}
            {/*    {showCustomSources < 3 ? <MenuItem>*/}
            {/*        <Button sx={{justifySelf: 'left'}} onClick={addCustomSource}>*/}
            {/*            <AddIcon sx={{marginRight: 1}}/>*/}
            {/*            Add custom source*/}
            {/*        </Button>*/}
            {/*    </MenuItem> : null}*/}
            {/*</FormControl>*/}
        </form>
            <Box sx={{display: 'flex', justifyContent: 'center', marginY: 4}}>
                <Button onClick={postDigestSequence} variant="outlined">Next</Button>
            </Box>

        </>
    );
};

export default DigestSequenceForm;
