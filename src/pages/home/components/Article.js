import { padStart } from "lodash";
import PropTypes from "prop-types";

function Article({ elements }) {
  const publishDate = new Date(elements.getIn(["date", "value"], ""));
  const mainImgUrl = elements.getIn(
    ["mainImage", "value", "leadImage", "renditions", "card", "url"],
    ""
  );

  return (
    <article className="article article-full">
      <div className="header">
        <h1 className="title">{elements.getIn(["heading", "value"], "")}</h1>
        <h2 className="author">{elements.getIn(["author", "value"], "")}</h2>
        <div className="publish-date">
          {`${padStart(publishDate.getDay(), 2, "0")}.${padStart(
            publishDate.getMonth(),
            2,
            "0"
          )}.${publishDate.getFullYear()}`}
        </div>
      </div>
      <article className="content">
        {mainImgUrl.length > 0 && (
          <picture className="main-picture pure-g">
            <div className="pure-u-5-5">
              <img
                className="pure-img-responsive"
                src={`https://content-eu-4.content-cms.com/${mainImgUrl}`}
                alt={elements.getIn(["mainImage", "value", "leadImage", "asset", "altText"], "")}
              />
            </div>
          </picture>
        )}
        {elements.getIn(["body", "values"], []).map((content, i) => (
          <article key={i} dangerouslySetInnerHTML={{ __html: content }} />
        ))}
      </article>
    </article>
  );
}

Article.propTypes = {
  elements: PropTypes.object.isRequired,
};

export default Article;
