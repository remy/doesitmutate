// remove next.js custom stuff
// https://github.com/zeit/next.js/issues/3155#issuecomment-338708632
import { Main } from 'next/document';

class MyMain extends Main {
  render() {
    const { html, errorHtml } = this.context._documentProps;

    return (
      <>
        <div id="__next" dangerouslySetInnerHTML={{ __html: html }} />
        {process.env.NODE_ENV !== 'production' && (
          <div
            id="__next-error"
            dangerouslySetInnerHTML={{ __html: errorHtml }}
          />
        )}
      </>
    );
  }
}

export default MyMain;
