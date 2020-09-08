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
          {/* <meta name="description" content={config.siteDescription} /> */}
          <html lang="en" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"
          />
        </Helmet>
        {children}
        <div class="bg-white">
          <div class="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
              <div class="px-5 py-2">
                Something missing?{' '}
                <a
                  href="mailto:help@nearbybreweries.com"
                  class="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Contact Us
                </a>
              </div>
            </nav>
            <div class="mt-8">
              <p class="text-center text-base leading-6 text-gray-400">
                &copy; 2020 Nearby Breweries. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
