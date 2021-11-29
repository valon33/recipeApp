import React from "react";

const PageTitle = ({ description, logo }) => {
  return (
    <div className="page__description">
      <h3 className="page__description--title">{description}</h3>
      <div className="page__description--hr">
        <hr />
      </div>
      {logo && <div className="page__description--logo">{logo}</div>}
    </div>
  );
};

export default PageTitle;
