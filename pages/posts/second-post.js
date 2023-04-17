import Head from "next/head";
import Layout, {siteTitle} from "../../components/layout";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
// import {getSortedPostsData} from "../lib/posts";

export async function getHackerNewsPosts(query = "redux") {
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}`
  );
  return res.json();
}

function Profile({posts}) {
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

/* SSR 服务端渲染数据获取函数 */
export async function getServerSideProps(context) {
  // console.log("SSR:", context);
  const posts = await getHackerNewsPosts("Vite");
  const dealedPosts = posts.hits.map((post) => {
    const {title, url, author, created_at, objectID} = post;
    return {
      title,
      url,
      author,
      created_at,
      objectID,
    };
  });
  return {
    props: {
      // props for your component
      posts: dealedPosts,
    },
  };
}

export default function Home({posts}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>Second Post</h1>
      <h3>here is Vite posts on hacker news, using SSR...</h3>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <Profile posts={posts} />
    </Layout>
  );
}
