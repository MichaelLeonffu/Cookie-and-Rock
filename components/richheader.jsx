import Head from 'next/head'
import React from 'react';

/**
 * Defines preset <head> using 'next/head' as a starting point
 * Normal (vanilla tags)
 * @param {String} title reused in meta
 * @param {String} author default: "Michael Leonffu"
 * 
 * Meta tags (og):
 * @param {String} site_name default: "Cookie and Rock"
 * @param {String} description default: "The best place to..."
 * @param {String} image_url default: "...cookieandrock-logo-text.png"
 * @param {String} theme_color default: "#50bbed"
 * @param {String} og_type default: "website"
 * 
 * @example
 * RichHeader({site_name: "Cookie and Rock"})
 */
export default function RichHeader(params) {

  const data = {
    /* defaults */
    author: "Michael Leonffu",
    title: "Cookie and Rock",
    site_name: "Cookie and Rock",
    description: "The best place to find cookies and rocks.",
    image_url: "https://cookieandrock.dev/static/annali/test-og/cookieandrock-logo-text.png",
    theme_color: "#50bbed",
    og_type: "website",

    ...params
  }

  return (
    <Head>
      <title>{data.title}</title>
      <meta name="author" content={data.author} key="name_author" />
      <meta name="description" content={data.description} key="name_description" />
      <link rel="icon" type="image/png" href="/favicon.ico" key="favicon" />

      {/* Fixed */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={data.og_type} key="og_type" />

      {/* discord large image embed */}
      <meta property="og:title" content={data.title} key="title" />
      <meta property="og:site_name" content={data.site_name} key="site_name" />
      <meta property="og:description" content={data.description} key="og_description" />
      <meta property="og:image" content={data.image_url} key="image" />
      <meta name="theme-color" content={data.theme_color} key="theme-color" />
      <meta name="twitter:card" content="summary_large_image" key="misc-card" />

      {/* Saved for later */}
      {/* <meta property="og:type" content="object" />
      <meta property="og:url" content="https://github.com/MichaelLeonffu/Cookie-and-Rock" />
      <meta name="viewport" content="width=device-width" />
      <meta name="twitter:image:src" content="https://" />
      <meta name="twitter:site" content="@" />
      <meta name="twitter:title" content="MichaelLeonffu/Cookie-and-Rock" />
      <meta name="twitter:description" content="Cookie and Rock service./> */}
    </Head>
  )
}