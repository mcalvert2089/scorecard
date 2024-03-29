import React from 'react'
import PropTypes from 'prop-types'


class ScSelect extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
          <div className="relative">
            <select name={ this.props.name } value={ this.props.value } defaultValue={ this.props.selected } onChange={ this.props.onChange } disabled={ this.props.disabled }>
              <option value="">-</option>
              { 
                this.props.options.map(function(row, i) {
                  return <option key={i} value={ row.value }>{ row.label }</option>
                }.bind(this)
              ) 
            }
          </select>
          <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      )
    }
}

export default ScSelect