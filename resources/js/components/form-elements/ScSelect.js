import React from 'react'
import PropTypes from 'prop-types'


class ScSelect extends React.Component {
    constructor (props) {
        super(props);

    }

    render () {
        return (
          <div className="relative">
            <select name={ this.props.name } className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" value={ this.props.value } onChange={ this.props.onChange }>
              <option value=""></option>
            { 
              this.props.options.map((row, i) => 
                <option key={i} value={ row.value }>{ row.label }</option>
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