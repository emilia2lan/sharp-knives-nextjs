import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const iconBar = css`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  border-top: 0.5px solid #0099cc;
  min-height: 50px;

  div {
    flex-direction: row;
    margin-top: 15px;
    a {
      margin: 10px;
    }
  }
`;

export default function Footer() {
  return (
    <footer css={iconBar}>
      <div>
        <Link href="https://github.com/emilia2lan">
          <a>
            <GitHubIcon
              color="disabled"
              style={{
                maxWidth: '30px',
              }}
            />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/emilia-tulan/">
          <a>
            <LinkedInIcon
              color="disabled"
              style={{
                maxWidth: '30px',
              }}
            />
          </a>
        </Link>{' '}
        <Link href="https://mail.google.com/mail/?view=cm&source=mailto&to=emilia.tulan@gmail.com">
          <a>
            <MailOutlineIcon
              color="disabled"
              style={{
                maxWidth: '30px',
              }}
            />
          </a>
        </Link>
      </div>
      <span>
        {' '}
        &#169;Copyright 2021. All rights reserved. Powered by Sharp Knives.
      </span>
    </footer>
  );
}
