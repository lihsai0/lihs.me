import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

type AllMarkdownRemark = {
  edges: {
    node: {
      id: string
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
  }[]
}

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: AllMarkdownRemark
}

type BlogListPageContext  = {
  numPosts: number
  numPages: number
  currentPage: number
  limit: number
  skip: number
}

const BlogPostTemplate: React.FC<PageProps<DataProps, BlogListPageContext>> = ({
  data,
  location,
  pageContext,
}) => {
  const {
    site,
    allMarkdownRemark,
  } = data
  const {
    numPosts,
    currentPage,
    numPages,
  } = pageContext

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  return (
    <Layout location={location}>
      <SEO
        title={site.siteMetadata.title}
        description={site.siteMetadata.title}
      />
      <p>共 {numPosts} 篇文章</p>
      <ul
        style={{
          listStyle: `none`,
          padding: 0,
          margin: 0,
        }}
      >
        {
          allMarkdownRemark.edges.map(edge => (
            <li key={edge.node.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
              <Link style={{ textDecoration: `none` }} to={edge.node.fields.slug}>
                <h1 style={{ color: `#333333` }}>{edge.node.frontmatter.title}</h1>
                <p style={{ color: `#999999` }}>
                  <time style={{ color: `#555555` }} dateTime={edge.node.frontmatter.date}>{edge.node.frontmatter.date}</time>
                  &nbsp;{edge.node.frontmatter.description || edge.node.excerpt}
                </p>
                <p style={{ color: `#333333` }}>标签：{edge.node.frontmatter.tags.join(' ')}</p>
              </Link>
            </li>
          ))
        }
      </ul>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            margin: 0,
          }}
        >
          {
            !isFirst && (
              <li>
                <Link to="/" rel='prev'>
                  ← 上一页
                </Link>
              </li>
            )
          }
          <li>
            第 {currentPage}/{numPages} 页
          </li>
          {
            !isLast && (
              <li>
                <Link to="/" rel='next'>
                  下一页 →
                </Link>
              </li>
            )
          }
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostList(
    $skip: Int!
    $limit: Int!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
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
      }
    }
  }
`
