/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

async function createPostListPages(graphql, reporter, createPage) {
  const allBlogPostCountResult = await graphql(
    `
      {
        allMarkdownRemark {
          totalCount
        }
      }
    `
  )

  if (allBlogPostCountResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create blog-list pages
  const numPosts = allBlogPostCountResult.data.allMarkdownRemark.totalCount
  const postsPerPage = 6
  const numPages = Math.ceil(numPosts / postsPerPage)
  for (let i = 0; i < numPages; i++) {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        /**
         * @see BlogListPageContext
         * */
        numPosts,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  }
}


async function createPostPages(graphql, reporter, createPage) {
  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // Get all markdown blog posts sorted by date
  const allBlogPostResult = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 10000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (allBlogPostResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      allBlogPostResult.errors
    )
    return
  }

  const posts = allBlogPostResult.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        /**
         * @see BlogPostPageContext
         * */
        id: post.id,
        previousPostId,
        nextPostId
      }
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  await createPostListPages(graphql, reporter, createPage)

  await createPostPages(graphql, reporter, createPage)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: `/blog${slug}`
    })
  }
}
