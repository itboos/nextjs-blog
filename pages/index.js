import Head from "next/head";
import Layout, {siteTitle} from "../components/layout";
import utilStyles from "../styles/utils.module.css";
// import {getSortedPostsData} from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getHackerNewsPosts(query = "redux") {
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}`
  );
  return res.json();
}

/* 静态站点生成函数 */
export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  const posts = await getHackerNewsPosts("Nextjs");
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
      posts: dealedPosts,
      testData: "this is a data by custom send...",
    },
  };
}
/* SSR 服务端渲染数据获取函数 */
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }

// export default function Home({allPostsData, testData}) {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>喜欢打网球、摄影和游泳～</p>
//         <p>
//           (This is a sample website - you’ll be building a site like this in{" "}
//           <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
//         </p>
//       </section>
//       <h3>{testData}</h3>
//       {/* Add this <section> tag below the existing <section> tag */}
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({id, date, title}) => (
//             <li className={utilStyles.listItem} key={id}>
//               {title}
//               <br />
//               {id}
//               <br />
//               {date}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   );
// }

export default function Home({posts, testData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p>updated at 2023.04.17 in develop branch </p>
      <section className={utilStyles.headingMd}>
        <p>喜欢打网球、摄影和游泳～</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h1 className="title">Posts catalogs</h1>
        <ul>
          <li>
            <Link href="/posts/first-post">first-post</Link>
          </li>
          <li>
            <Link href="/posts/second-post">second-post</Link>
          </li>
        </ul>
        <h2 className="title">Dynamic Routes</h2>
        <ul>
          <li>
            <Link href="/posts/pre-rendering">pre-rendering</Link>
          </li>
          <li>
            <Link href="/posts/ssg-ssr">ssg-ssr</Link>
          </li>
        </ul>
      </section>
      <h3>{testData}</h3>
      {/* Add this <section> tag below the existing <section> tag */}
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
              author: {author} - created_at: {<Date dateString={created_at} />}
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
