// note: export from './Head' is better, but I was faffing with .babelrc and gave up!
import Head from './Head';
import Main from './Main';
import NextScript from './NextScript';
import Document from 'next/document';

export default Document;
export { Head, Main, NextScript };
