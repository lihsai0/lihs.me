/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Header from './header'
import './layout.css'

type DataProps = {
  title?: string
  location?: Location
}

const Layout: React.FC<DataProps> = ({
  title,
  location,
  children,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const defaultTitle = data.site.siteMetadata?.title ?? `Title`

  const rootPath = `/`
  const isRootPath = location?.pathname === rootPath

  let header
  if (isRootPath) {
    header = <Header siteTitle={defaultTitle} />
  } else {
    header = <Header siteTitle={title ?? defaultTitle} />
  }

  return (
    <>
      {header}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`
          }}
        >
          <a href='https://beian.miit.gov.cn/'>津ICP备17007807号</a>
          <br />
          <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
            <img alt="知识共享许可协议" style={{ margin: 0 }} src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
          </a>
          <br />
          本站所有原创内容采用<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。
          <br />
          转载请注明出处！
          <br />
          Built with <a href='https://www.gatsbyjs.com'>Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
