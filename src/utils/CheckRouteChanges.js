import React from 'react';
import { withRouter } from 'react-router-dom';

// Scroll to top on each router navigation
// See: https://reacttraining.com/react-router/web/guides/scroll-restoration
class CheckRouteChanges extends React.Component {
  constructor(props) {
    super(props);
    this.updateHandler = props.updateHandler;
  }

  componentDidUpdate(prevProps) {
    if (this.updateHandler)
      this.updateHandler(this.props, prevProps);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(CheckRouteChanges);
