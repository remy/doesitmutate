const Method = ({ sample, method, mutates, url, clean, example }) => (
  <div id={clean} className="method">
    <h2>
      <style jsx>{`
        a {
          color: inherit;
        }
      `}</style>
      <span>Array.prototype</span>.<a href={`/${clean}`}>{method}</a>
    </h2>
    <p className={`mutates ${mutates ? 'yes' : 'no'}`}>
      {mutates ? 'Mutates' : 'No mutation'}
    </p>
    <h3>Description</h3>
    <div
      dangerouslySetInnerHTML={{
        __html: sample,
      }}
    />
    <p>
      <style jsx>{`
        p {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      <a href={url}>{url}</a>
    </p>
    <h3>Example</h3>
    <div
      dangerouslySetInnerHTML={{
        __html: example,
      }}
    />
  </div>
);

export default Method;
