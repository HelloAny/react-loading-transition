import React from "react";
import PropTypes from "prop-types";
import { LoadContextProvider } from "./loadContext";

export default class LoadTransition extends React.Component {
  constructor(props) {
    super(props);
    if (!props.loadNode) {
      console.warn("loadNode attribute is empty!");
    }
    this.state = {
      LoadNode: props.loadNode,
      isLoad: false
    };
    LoadTransition.doMotion = this.doMotion.bind(this);
  }
  doMotion = (loadState) => {
    this.asyncAnimation(loadState, this.state.isLoad);
  };

  asyncAnimation = (nextStatus, prevStatus) => {
    if (!nextStatus && prevStatus) {
      setTimeout(() => {
        this.setState({
          isLoad: nextStatus
        });
      }, this.props.delay);
    } else if (nextStatus && !prevStatus) {
      this.setState({
        isLoad: nextStatus
      });
    }
  };

  render() {
    const providerObj = {
      isload: this.state.isLoad,
      appear: this.props.appear
    };
    const { LoadNode } = this.state;
    return (
      <main>
        {LoadNode && (
          <LoadNode {...providerObj} />
        )}
        <LoadContextProvider value={providerObj}>
          {this.props.children}
        </LoadContextProvider>
      </main>
    );
  }
}

LoadTransition.defaultProps = {
  LoadNode: null,
  appear: false,
  delay: 0
};

LoadTransition.propTypes = {
  /**
   * Provide an animated custom loading node
   * which will return a page animation by default
   * For example
   */
  loadNode: PropTypes.elementType,
  /**
   * Control whether to make an animation transition when entering the page for the first time
   */
  appear: PropTypes.bool,
  /**
   * Provides animation time control
   */
  delay: PropTypes.number
};
