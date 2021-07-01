import React from "react"
import { graphql } from "gatsby"
import SEO from "react-seo-component"
import { Box, Heading, Stack, Avatar, Text, Divider } from "@chakra-ui/core"
import Layout from "../components/layout"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import footnotes from 'remark-footnotes'
import "katex/dist/katex.min.css"
import rehypeRaw from 'rehype-raw'
import gfm from "remark-gfm"

// 底部
import Footer from "../components/FooterComponents/Footer"

import ReactMarkdown from "react-markdown"

const Article = ({ location, data }) => {
  const post = data.strapiArticles
  const { siteMetadata } = data.site

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter
          style={twilight}
          language={language}
          children={value}
        />
      )
    },
    image: ({ src, alt }) => {
      return (
        <Box textAlign="center">
          <Zoom>
            {console.log(src)}
            <img src={src} alt={alt} />
          </Zoom>
        </Box>
      )
    },
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        titleTemplate={siteMetadata.title}
        description={post.summary}
        image={
          "https://www.ethereum.cn" + post.cover.childImageSharp.resize.src
        }
        pathname={"https://www.ethereum.cn" + location.pathname}
        article={true}
        siteLanguage={siteMetadata.siteLanguage}
        siteLocale={siteMetadata.siteLocale}
        twitterUsername={siteMetadata.twitterUsername}
        author={post.author}
        publishedDate={post.publishDate}
        modifiedDate={new Date(Date.now()).toISOString()}
      />

      <Box
        w="100%"
        maxW={800}
        mx="auto"
        px="30px"
        pt={["65px", "65px", "70px", "14vh"]}
        mb={["10vh", "10vh", "15vh", "20vh"]}
        mt="2rem"
      >
        <Heading
          lineHeight="7vh"
          fontWeight="700"
          fontFamily="NotoSansSC-Medium"
          color="#fff"
        >
          {post.title}
        </Heading>

        <Text
          fontSize="1rem"
          color="#a8a9a6"
          mt="4vh"
          mb="4vh"
          lineHeight="3.25vh"
        >
          {post.summary}
        </Text>
        <Divider />

        <Stack isInline mt="1.5rem" mb="2rem">
          <Avatar
            w="25px"
            h="25px"
            name={post.author}
            src={post.authorImg.childImageSharp.fixed.src}
          />
          <Text
            lineHeight="25px"
            fontSize="0.8rem"
            color="#fff"
            cursor="pointer"
          >
            {post.author}
            &nbsp; &nbsp; &nbsp; &nbsp;
            {post.publishDate}
          </Text>
        </Stack>

        <ReactMarkdown
          remarkPlugins={[remarkMath,footnotes,gfm]}
          rehypePlugins={[rehypeKatex,rehypeRaw]}
          renderers={renderers}
          children={post.content}
          className="content"
          escapeHtml={true}
        />

        <Divider />
      </Box>
      {/* <Footer /> */}
    </Layout>
  )
}

export default Article

export const query = graphql`
  query Article($id: String!) {
    strapiArticles(id: { eq: $id }) {
      title
      summary
      publishDate
      author
      authorImg {
        childImageSharp {
          fixed {
            src
          }
        }
      }
      content
      cover {
        childImageSharp {
          resize {
            src
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
        keywords
        siteLanguage
        siteLocale
        siteUrl
        twitterUsername
      }
    }
  }
`
