/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const navBar = css`
  display: flex;

  top: 0;
  width: 100vw;
  background-color: #ac92a6;
  padding-top: 50px;
  margin: 0 auto;
  margin-left: 0;
  z-index: 2;

  a {
    margin: auto;
    text-decoration: none;
    position: bottom;
    color: #fff;
    font-family: 'Chivo', sans-serif;
    font-weight: 400;
  }
  div {
    font-family: 'Chivo', sans-serif;
    color: #d5c7bc;
    font-size: xx-large;
    position: bottom;
    margin: auto;
  }
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <title> Sharp Knives</title>
        <link rel="logo" href="/logo.svg" />
      </Head>

      <header>
        <nav css={navBar}>
          <Image src="/logoSharpKnives.svg" width={80} height={80} alt="logo" />

          <Link href="./">
            <a>Sharp Knives</a>
          </Link>

          <Link href="/recipes">
            <a>Recipes</a>
          </Link>

          <Link href="/about">
            <a> About </a>
          </Link>

          <Link href="/register">
            <a> Register </a>
          </Link>

          <Link href="/login">
            <a> Login </a>
          </Link>
        </nav>
      </header>
      {props.children}
    </>
  );
}
