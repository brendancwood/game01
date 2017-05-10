import React from 'react'

const ElementIf = (props) => {
  let element = null
  if (props.condition) {
    element = props.element
  }
  return element
}

ElementIf.propTypes = {
  condition: React.PropTypes.any.isRequired,
  element  : React.PropTypes.any
}

export default ElementIf
