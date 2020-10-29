import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { isString, isArray } from "../helper/is";
import { LoadContextConsumer, LoadContext } from "./loadContext";
import LoadTransition from "./loadTransition"

export default class LoadMotion extends React.Component {
  constructor(props) {
    super(props);
    let initialFrom = null,
      initialCome = null;
    /**
     * Modify the status of the component when it exits. In general projects
     * I will use the delayed appearance of the component as the default transition condition
     */
    (props.from && !isString(props.from)) || !props.from
      ? null
      : props.from.split(" ");
    initialCome =
      (props.come && !isString(props.come)) || !props.come
        ? null
        : props.come.split(" ");
    this.state = {
      status: this.props.in,
      from: isArray(initialFrom)
        ? initialFrom.filter(item => item)
        : initialFrom,
      come: isArray(initialCome)
        ? initialCome.filter(item => item)
        : initialCome
    };
  }
  componentDidUpdate() {
    this._forceShow(this.props.timeout, this.props.in);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.in !== this.state.status || nextState.status !== this.state.status) {
      return true
    }
    if (nextProps.in && this.state.status) {
      LoadTransition.doMotion(false)
      return false
    }
    return false;
  }

  /**
   * Control component switching and action effects
   * @param {number} timeout
   * @param {bool} nextState
   * @param {node} nodeDOM
   */
  _forceShow = (timeout, nextState) => {
    const { status, come, from } = this.state;
    if (
      (!come || !from) &&
      ((nextState && !status) || (!nextState && status))
    ) {
      setTimeout(() => {
        this.setState({ status: nextState });
      }, timeout);
    } else if (isArray(come) && isArray(from) && nextState && !status) {
      this.setState({ status: nextState }, () => {
        const maybedom = this.props.nodeRef
          ? this.props.nodeRef
          : ReactDOM.findDOMNode(this);
        from.forEach((item) => maybedom.classList.add(item));
        setTimeout(() => {
          from.forEach((item) => maybedom.classList.remove(item));
          come.forEach((item) => maybedom.classList.add(item));
        }, timeout);
      });
    } else if (isArray(come) && isArray(from) && !nextState && status) {
      setTimeout(() => {
        this.setState({ status: nextState });
      }, timeout);
    }
  };

  render() {
    if (!this.state.status) {
      return null;
    }
    return (
      <LoadContextConsumer>
        {(value) =>
          React.cloneElement(React.Children.only(this.props.children), {
            ...value
          })
        }
      </LoadContextConsumer>
    );
  }
}


LoadMotion.defaultProps = {
  in: true,
  from: null,
  timeout: 0,
  nodeRef: null,
  come: null
};

LoadMotion.propTypes = {
  /**
   * Control whether to hide or switch display
   * usually combined with react-router for display control
   * The default is true
   */
  in: PropTypes.bool,
  /**
   * Used for the animation when the component jumps to control the display rotation of the two components
   * When classNames does not exist, the default page jump program will be executed
   *
   * Default:
   * ```css
   * .loading-transition-exit{
   *   opacity: 0;
   *   position: absolute;
   * }
   * ```
   */
  from: PropTypes.string,
  come: PropTypes.string,
  /**
   * Page jump delay, you can control the value to complete the animation loading
   */
  timeout: PropTypes.number,
  /**
   * Bind the default animation execution node, if there is no binding node, it is the default child node
   */
  nodeRef: PropTypes.node
};
