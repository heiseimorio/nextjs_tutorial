import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <br />
      {postData.id}
      <br />
      {/* {postData.date} */}
      <Date dateString={postData.date} />
      <br />
      {/* mdファイルの本文を表示させるinnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  // idとして取れる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}
