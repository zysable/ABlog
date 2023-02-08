import FeaturedPosts from '@/components/home-page/featured-posts'
import Hero from '@/components/home-page/hero'
import { getFeaturedPosts } from '@/lib/posts-util'
import Head from 'next/head'
import { Fragment } from 'react'

function HomePage({ featuredPosts }) {
  return (
    <Fragment>
      <Head>
        <title>Name's Blog</title>
        <meta
          name="description"
          content="I post about programing and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  )
}

export default HomePage

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      featuredPosts
    }
  }
}
