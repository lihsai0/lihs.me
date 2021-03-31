import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Snake from '../components/Snake'

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Lihs Home" />
    <h1>你好，World</h1>
    <a href="/blog/">Go to blog</a>
    <Snake />

  </Layout>
)

export default IndexPage
