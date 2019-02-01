import React from 'react';
import PropTypes from 'prop-types';

const ScSelect = ({ value, options, onChange }) => (
  <select value={value} onChange={onChange}>
  	{ 
  		options.map((row, i) => 
  			<option key={i} value={ row.value }>{ row.label }</option>
  		) 
  	}
  </select>
)

ScSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default ScSelect