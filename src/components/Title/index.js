import { PureComponent } from 'react';
import T from 'prop-types';

class Title extends PureComponent {
  constructor() {
    super();

    this.isBrowser = typeof window !== 'undefined';
  }

  componentDidUpdate() {
    if (this.isBrowser) {
      window.document.title = this.props.text;
    }
  }

  render() {
    return null;
  }
}

Title.propTypes = {
  text: T.string,
};

export default Title;
