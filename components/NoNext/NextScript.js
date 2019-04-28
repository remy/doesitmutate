// remove next.js custom stuff
// https://github.com/zeit/next.js/issues/3155#issuecomment-338708632
import { NextScript } from 'next/document';

class StaticNextScript extends NextScript {
  render() {
    return null;
  }
}

const MyNextScript =
  process.env.NODE_ENV === 'production' ? StaticNextScript : NextScript;

export default MyNextScript;
