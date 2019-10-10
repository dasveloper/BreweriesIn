import React from 'react';

export default (data) => {
    const {name, website_url} = data.pageContext;
    return (
        <div>
<h1>{name}</h1>
          <a rel="nofollow noopener noreferrer" target="_blank"href={website_url}>{website_url}</a>
        </div>
    );
};

