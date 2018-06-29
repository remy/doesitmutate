import Head from 'next/head';
import { Component } from 'react';
import Method from '../components/Method';
// source: https://github.com/duckduckgo/zeroclickinfo-fathead/tree/master/lib/fathead/mdnjs
import data from '../array-methods.json';

const mutators = [
  'sort',
  'shift',
  'unshift',
  'pop',
  'push',
  'splice',
  'reverse',
  'fill',
  'copywithin',
];

// ironically: mutate
data.forEach(_ => {
  _.clean = _.method.replace(/\(\)/g, '').toLowerCase();
  _.mutates = mutators.includes(_.clean);
});

const filterMethods = ({ filter, methods }) => {
  return [methods.find(_ => filter === _.clean)];
};

const filterType = ({ mutates, methods }) => {
  return methods.filter(_ => mutates ? _.mutates : !_.mutates);
};

const Page = ({ methods, type }) => (
  <>
    <Head>
      {methods.length === 1 ? (
        <title>{methods[0].mutates ? '!mutates' : 'no mutation'}</title>
      ) : (
        <title>Does it mutate?</title>
      )}
    </Head>

    <h1>Does it mutate 😱</h1>

    {methods.length > 1 && (
      <div className="btn-grp">
        <style jsx>{`
          div {
            display: flex;
            justify-content: flex-end;
            margin: 0 30px;
          }
          a {
            text-decoration: none;
          }
        `}</style>
        <a className={`btn ${type === 'mutates' && 'yes'}`} href="/mutates">Mutates</a>
        <a className={`btn ${!type && 'maybe'}`} href="/">Both</a>
        <a className={`btn ${type === 'clean' && 'no'}`} href="/clean">No mutation</a>
      </div>
    )}
    {methods.map(_ => {
      return <Method key={_.method} {..._} />;
    })}
  </>
);

Page.getInitialProps = ({ query = {} }) => {
  let methods = data;
  let type = '';

  if (query.method) {
    const filter = query.method;
    methods = filterMethods({ methods, filter });
  } else if (query.filter) {
    type = query.filter;
    const mutates = query.filter === 'mutates';
    methods = filterType({ methods, mutates });
  }

  return {
    methods,
    type,
  };
};

export default Page;
