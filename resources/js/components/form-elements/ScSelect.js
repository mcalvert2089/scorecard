import React from 'react'
import PropTypes from 'prop-types'


class ScSelect extends React.Component {
    constructor (props) {
        super(props);

    }

    render () {
        return (
          <select name={ this.props.name } value={ this.props.value } onChange={ this.props.onChange }>
          { 
            this.props.options.map((row, i) => 
              <option key={i} value={ row.value }>{ row.label }</option>
            ) 
          }
        </select>
      )
    }
}

export default ScSelect