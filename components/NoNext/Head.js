// remove next.js custom stuff
// https://github.com/zeit/next.js/issues/3155#issuecomment-338708632
import React from 'react';
import { Head } from 'next/document';

class StaticHead extends Head {
  render() {
    const { head, styles } = this.context._documentProps;

    return (
      <head {...this.props}>
        {(head || []).map((h, i) => React.cloneElement(h, { key: h.key || i }))}
        {styles || null}
        {this.props.children}
      </head>
    );
  }
}

const MyHead = process.env.NODE_ENV === 'production' ? StaticHead : Head;

export default MyHead;
