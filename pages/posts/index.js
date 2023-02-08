import AllPosts from '@/components/posts/all-posts'
import { getAllPosts } from '@/lib/posts-util'
import Head from 'next/head'
import { Fragment } from 'react'

function AllPostsPage({ allPosts }) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts"
        />
      </Head>
      <AllPosts posts={allPosts} />
    </Fragment>
  )
}

export default AllPostsPage

export function getStaticProps() {
  const allPosts = getAllPosts()
  return {
    props: {
      allPosts
    }
  }
}