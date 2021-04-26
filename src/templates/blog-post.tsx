import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import "katex/dist/katex.min.css"

import Layout from '../components/layout'
import SEO from '../components/seo'

type MarkdownRemark = {
  id: string
  html: string
  tableOfContents: string
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
}

type NavPost = {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    date: string
    description: string
  }
}

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  markdownRemark: MarkdownRemark
  previous: NavPost
  next: NavPost
}

type BlogPostPageContext = {
  id: string
  previousPostId: string
  nextPostId: string
}

const BlogPostTemplate: React.FC<PageProps<DataProps, BlogPostPageContext>> = ({
  data,
  location,
}) => {
  const {
    markdownRemark: post,
    previous,
    next
  } = data

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <p>标签：{post.frontmatter.tags.join(' ')}</p>
        </header>
        <details>
          <summary>点击展开目录</summary>
          <section
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          />
        </details>
        <hr />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <footer>
          感谢阅读
        </footer>
      </article>
      <nav className='blog-post-na'>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to="/" rel='prev'>
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to="/" rel='next'>
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      tableOfContents
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`
