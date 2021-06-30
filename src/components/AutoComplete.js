import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

const AutoComplete = ({ heading, data, handleChange, currentValue, handleSelect }) => {
	return (
		<div style={{ width: 400 }}>
			<Autocomplete
				id={heading}
				options={data}
				getOptionLabel={(option) => option.label}
                // eslint-disable-next-line
				renderInput={(params) => <TextField {...params} variant="standard" label={heading} variant="outlined" />}
				onInputChange={(e, newValue) => {
					handleChange(newValue);
				}}
				onChange={(e, newValue) => {
					handleSelect(newValue);
				}}
				value={currentValue}
				disableClearable={true}
			/>
		</div>
	);
};

AutoComplete.propTypes = {
	heading: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired
		})
	),
	handleChange: PropTypes.func.isRequired,
	handleSelect: PropTypes.func.isRequired
};

export default AutoComplete;
