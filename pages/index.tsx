import Head from 'next/head';
import { useQuery } from '@apollo/client';
import type { GetStaticProps } from 'next';

import QUERY_PAGES from './queryPages.graphql';

import { addApolloState, initializeApollo } from '../apollo';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_PAGES);
  // check for errors
  if (error) {
    return <p>:( an error happened</p>;
  }

  // if all good return data
  return (
    <div className={styles.container}>
      <Head>
        <title>Pages GraphQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello</h1>
      {/* let the user know we are fetching the countries */}
      {loading && <p>loading...</p>}
      <ul>
        {data?.nodePages.nodes.map((node) => (
          <li key={node.id}>
            <a href={node.path}>{node.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();

  await client.query({
    query: QUERY_PAGES,
  });

  return addApolloState(client, {
    props: {},
  });
};
