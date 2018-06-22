import { Component } from 'react';
import fetch from 'isomorphic-unfetch';

const API =
  'https://raw.githubusercontent.com/mdn/interactive-examples/master/live-examples/js-examples/array/array-';

export default class Method extends Component {
  state = { example: 'Loading…' };

  async componentDidMount() {
    let method = this.props.method;
    method = method.replace(/\(\)/g, '').toLowerCase();

    if (method === 'reduceright') {
      method = 'reduce-right';
    }

    const res = await fetch(`${API}${method}.html`);

    if (res.status === 404) {
      return this.setState({ example: 'Not available' });
    }

    const text = await res.text();

    this.setState({ example: text.trim() });
  }

  render() {
    const { sample, method, mutates, url } = this.props;
    const { example } = this.state;
    return (
      <div id={method.replace(/\(\)/g, '').toLowerCase()} className="method">
        <h2>Array.prototype.{method}</h2>
        <p className={`mutates ${mutates ? 'yes' : 'no'}`}>
          {mutates ? 'Mutates' : 'No mutation'}
        </p>
        <h3>Description</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: sample,
          }}
        />
        <p>
          <style jsx>{`
            p {
              overflow: hidden;
              text-overflow: ellipsis;
            }
          `}</style>
          <a href={url}>{url}</a>
        </p>
        <h3>Example</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: example,
          }}
        />
      </div>
    );
  }
}
