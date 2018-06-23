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
  'copyWithin',
];

// ironically: mutate
data.forEach(_ => {
  _.mutates = mutators.includes(_.method);
});

const filterMethods = ({ filter, methods }) => {
  return [
    methods.find(_ => filter === _.method.replace(/\(\)/g, '').toLowerCase()),
  ];
};

const Page = ({ methods }) => (
  <>
    <Head>
      {methods.length === 1 ? (
        <title>{methods[0].mutates ? '!mutates' : 'no mutation'}</title>
      ) : (
        <title>Does it mutate?</title>
      )}
    </Head>

    <h1>Does it mutate 😱</h1>
    {methods.map(_ => {
      return <Method key={_.method} {..._} />;
    })}
  </>
);

Page.getInitialProps = ({ query }) => {
  let methods = data;

  if (query.method) {
    const filter = query.method;
    methods = filterMethods({ methods, filter });
  }

  return {
    methods,
  };
};

export default Page;
