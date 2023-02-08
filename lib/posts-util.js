import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.resolve(process.cwd(), 'posts')

function getPostFiles() {
  return fs.readdirSync(postsDirectory)
}

function getPostData(postIdentifire) {
  const postSlug = postIdentifire.replace(/\.md$/, '')
  const filePath = path.join(postsDirectory, `${postSlug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const postData = {
    slug: postSlug,
    ...data,
    content
  }
  return postData
}

function getAllPosts() {
  const postFiles = getPostFiles()

  const allPosts = postFiles.map((postFile) => {
    const postData = getPostData(postFile)
    delete postData.content
    return postData
  })

  allPosts.sort((postA, postB) => {
    return new Date(postB.date) - new Date(postA.date)
  })

  return allPosts
}

function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.isFeatured)
}

export { getAllPosts, getFeaturedPosts, getPostData, getPostFiles }
