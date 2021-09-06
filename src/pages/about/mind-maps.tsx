import React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'


const MindmapsPage: React.FC = () => {
  const mindMaps = [
    {
      name: 'Hadoop',
      link: 'https://my.mindnode.com/xq3ezfurf9BFsoe2NAj8mq4e7FPkfoj91CDHTyLj'
    },
    {
      name: 'PySpark',
      link: 'https://my.mindnode.com/ykf1q3UbRNXnkWV8JQDQqd51YDfF9pPJxwNU99wD'
    },
    {
      name: 'Rust',
      link: 'https://my.mindnode.com/dwE5vZg1bXqAnoAVVzEWVRTtdVnJQ6KcVtSfdMqh'
    },
    {
      name: 'iOS',
      link: 'https://my.mindnode.com/grhECJDt75ynfVv1iEwfujnnMnfSw27RsNtyLmGq'
    },
    {
      name: 'Python3 ML Base',
      link: 'https://my.mindnode.com/n63P1hkvm4KqKYZX2SurVsEKyxGscj6tqJnqQmN1'
    },
  ]
  return (
    <Layout>
      <SEO title='思维导图分享' />
      <h1>思维导图分享</h1>
      <ul>
        { mindMaps.map(mindmap => (<li><a href={mindmap.link}>{mindmap.name}</a></li>)) }
      </ul>
    </Layout>
  )
}

export default MindmapsPage
