import PostContent from '@/components/posts/post-detail/post-content'
import { getPostData, getPostFiles } from '@/lib/posts-util'
import Head from 'next/head'
import { Fragment } from 'react'

function PostDetailPage({ postData }) {
  return (
    <Fragment>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={`${postData.excerpt}`} />
      </Head>
      <PostContent post={postData} />
    </Fragment>
  )
}

export default PostDetailPage

export function getStaticPaths() {
  const postFiles = getPostFiles()
  const paths = postFiles.map((postFile) => {
    const slug = postFile.replace(/\.md$/, '')
    return { params: { slug } }
  })

  return {
    paths,
    fallback: false
  }
}

export function getStaticProps(context) {
  const { slug } = context.params
  const postData = getPostData(slug)
  return {
    props: {
      postData
    }
  }
}
