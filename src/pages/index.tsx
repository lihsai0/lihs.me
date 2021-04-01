import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Snake from '../components/Snake'

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Lihs Home" />
    <h1>你好，World</h1>
    <Link to="/blog/">
      <h1>Go to blog</h1>
    </Link>
    <Snake />

  </Layout>
)

export default IndexPage
