import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import React, { Component, PropTypes } from 'react';

import { fetchUserInfo } from '../actions/auth'

export class Landing extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

Landing.propTypes = {
  user: PropTypes.object
};


const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = (dispatch) => {
  const actions = { fetchUserInfo }
  return bindActionCreators(actions, dispatch)
}

const DecoratedLanding = withRouter(Landing)
export default connect(mapStateToProps, mapDispatchToProps)(DecoratedLanding)
