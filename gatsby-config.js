module.exports = {
  siteMetadata: {
    title: `Lihs.me`,
    description: `A part of good time in life.`,
    author: `@lihs`,
  },
  plugins: [
    // ## 构建相关
    /*
    * 真正支持 TS 类型检查
    * https://www.gatsbyjs.com/plugins/gatsby-plugin-ts/
    * */
    {
      resolve: `gatsby-plugin-ts`,
      options: {
        tsLoader: {
          logLevel: `warn`,
        },
        forkTsCheckerPlugin: {
          eslint: true,
        },
        codegen: false,
      },
    },

    /*
    * manifest 文件生成，PWA 说明文件的一部分
    * 允许用户将网站作为应用添加到主屏幕上
    * https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
    * */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

    /*
    * this (optional) plugin enables Progressive Web App + Offline functionality
    * To learn more, visit: https://gatsby.dev/offline
    * https://www.gatsbyjs.com/plugins/gatsby-plugin-offline/
    * note: this plugin should be *after* gatsby-plugin-manifest
    * */
    // `gatsby-plugin-offline`,

    // ## GraphQL 数据源相关
    /*
    * 本地文件的读取，可供 GraphQL 使用
    * https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
    * */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    /*
    * 为 GraphQL 提供了访问图片的能力
    * https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/
    * */
    `gatsby-transformer-sharp`,

    // ## 页面元素相关
    /*
    * 添加 HTML <head> 内的常用元素，进而做到 SEO 等
    * 示例见 src/components/seo.js
    * https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/
    * */
    `gatsby-plugin-react-helmet`,

    /*
    * 用于处理图片，其本质上是使用了 https://github.com/lovell/sharp 这个库
    * https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/
    * */
    `gatsby-plugin-sharp`,
  ],
}
