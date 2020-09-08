import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import './index.css';

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"
          />
        </Helmet>
        {children}
      </div>
    );
  }
}
