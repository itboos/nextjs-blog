import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

/**
 *  https://github.com/vercel/swr
 *  https://swr.vercel.app/docs/getting-started
 * */

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Profile() {
  const {data, error} = useSWR(
    "https://hn.algolia.com/api/v1/search?query=redux",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const {hits = []} = data;

  const posts = hits.map((post) => {
    const {title, url, author, created_at, objectID} = post;
    return {
      title,
      url,
      author,
      created_at,
      objectID,
    };
  });
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {posts.map(({author, created_at, url, title, objectID}) => (
          <li className={utilStyles.listItem} key={objectID}>
            <a href={url} target="_blank">
              {title}
            </a>
            <br />
            <hr />
            author: {author} - created_at: {created_at}
            <br />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h3>here is Redux posts on hacker news...</h3>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <Profile />
    </Layout>
  );
}
