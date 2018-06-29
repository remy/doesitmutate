export default ({ children }) => (
  <>
    <main>
      <style global jsx>{`
        * {
          font-family: sans-serif;
          color: #212121;
        }

        a {
          color: rgb(33, 150, 243);
        }

        body,
        html {
          margin: 0;
          padding: 0;
          font-size: 1rem;
          line-height: 1.4rem;
        }

        body {
          padding: 10px;
          max-width: 58rem;
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          line-height: 2em;
        }

        h2 {
          margin-top: 0;
          line-height: 1.6em;
        }

        h2 span {
          display: none;
        }

        h3 {
          margin-top: 2em;
        }

        footer {
          padding: 0 20px;
        }

        .method {
          padding-top: 10px;
          padding-bottom: 40px;
          margin: 40px 10px;
          position: relative;
        }

        .method:last-child {
          border-bottom: 0;
        }

        code,
        pre {
          font-family: ubuntu mono, monospace;
          background: rgb(245, 245, 245);
          border-radius: 2px;
        }

        pre {
          overflow: auto;
          padding: 10px;
        }

        .btn-grp > .btn:first-child:not(:last-child) {
          border-bottom-right-radius: 0;
          border-top-right-radius: 0;
        }

        .btn-grp > .btn:not(:last-child):not(:first-child) {
          border-radius: 0;
        }

        .btn-grp > .btn:last-child:not(:first-child) {
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }

        .btn {
          --yes: rgb(233, 30, 99);
          --maybe: rgb(33, 33, 33);
          --no: rgb(76, 175, 80);
          color: rgb(186, 186, 186);
          text-transform: lowercase;
          border-width: 3px;
          border-style: solid;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 90%;
          background: rgb(255, 255, 255);
          font-weight: bold;
          margin: 10px 0 0;
        }

        .mutates {
          position: absolute;
          top: 0;
          right: 20px;
        }

        .yes {
          color: var(--yes);
          border-color: var(--yes);
        }
        .maybe {
          color: var(--maybe);
          border-color: var(--maybe);
        }
        .no {
          color: var(--no);
          border-color: var(--no);
        }
      `}</style>
      {children}
    </main>
    <footer>
      <p>
        Made by <a href="https://twitter.com/rem">@rem</a>
      </p>
    </footer>
  </>
);
