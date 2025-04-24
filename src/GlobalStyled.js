import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`
    ${reset}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        color: inherit;
        /* outline: 1px solid red; */
    } 

    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    li,
    blockquote,
    dl,
    dd {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    padding: 0;
    }

    ul,
    ol {
    list-style: none;
    }

    blockquote,
    q {
    quotes: none;
    }

    blockquote::before,
    blockquote::after,
    q::before,
    q::after {
    content: "";
    content: none;
    }

    table {
    border-collapse: collapse;
    border-spacing: 0;
    font-weight: inherit;
    }

    th {
    font-weight: inherit;
    }

    a {
    text-decoration: none;
    color: inherit;
    }

    em,
    i,
    address {
    font-style: normal;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    }

    button,
    input {
    overflow: visible;
    }

    button,
    select {
    text-transform: none;
    }

    button::-moz-focus-inner,
    input::-moz-focus-inner {
    padding: 0;
    border: 0;
    }

    button,
    input[type="button"],
    input[type="reset"],
    input[type="submit"] {
    cursor: pointer;
    background: none;
    }

    :focus-visible {
    outline: none;
    }

    body {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
    font-weight: inherit;

    line-height: 1;
    word-break: keep-all;
    }

`;
