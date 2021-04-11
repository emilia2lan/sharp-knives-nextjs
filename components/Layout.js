import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const navBar = css`
  display: flex;
  top: 0;
  width: 100vw;
  background-color: #0099cc;
  padding-top: 5px;
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
          <Image src="/logoSharpKnives.svg" width={40} height={40} alt="logo" />

          <Link href="./">
            <a>Sharp Knives</a>
          </Link>

          <Link href="./recipes">
            <a>Recipes</a>
          </Link>

          <Link href="./about">
            <a> About </a>
          </Link>
          <div>
            {!props.isSessionValid ? (
              <>
                <Link href="./register">
                  <a> Register / </a>
                </Link>

                <Link href="./login">
                  <a> Login </a>
                </Link>
              </>
            ) : (
              <>
                <Link href={`./profile/${props.children.props.userId}`}>
                  <a> My profile / </a>
                </Link>
                <Link href="./logout">
                  <a> Logout </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      {props.children}
    </>
  );
}
