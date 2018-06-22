import App, { Container } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width" />
        </Head>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
