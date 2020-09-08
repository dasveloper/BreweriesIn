import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import CityList from '../components/CityList/CityList';
import { Link } from 'gatsby';
import dashify from 'dashify';
import { Grid, Row, Col } from 'react-flexbox-grid';

import config from '../../data/SiteConfig';

const formatAddress = (street, city, state, postal_code) => {
  let address = '';
  address += `${street}, ` || '';
  address += `${city} ` || '';
  address += `${state}, ` || '';
  address += `${postal_code}` || '';

  return address;
};

export default class PageTemplate extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    console.log(breweries);

    const {
      name,
      slug,
      brewery_type,
      website_url,
      street,
      city,
      state,
      postal_code,
      metadata,
      email,
      phone,
    } = this.props.pageContext.brewery;
    if (!slug) return null;
    return (
      <article>
        <Helmet title={`${name} | ${config.siteTitle}`} />
        <Helmet>
          <title>{`${name} | ${config.siteTitle}`}</title>

          <meta
            name="description"
            content={`${name} address, phone number, website and other information.`}
          />
        </Helmet>
        <Grid fluid className="bg-gray-100 p-10">
          <Row center="xs">
            <Col xs={12} lg={8}>
              <Row start="xs">
                <Col xs={12}>
                  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                      <h1 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        {name}
                      </h1>
                      <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                        {brewery_type && (
                          <span className="capitalize">{`${brewery_type} brewery`}</span>
                        )}
                      </p>
                    </div>
                    <div class="px-4 py-5 sm:px-6">
                      <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
                        <div class="sm:col-span-1">
                          <dt class="text-sm leading-5 font-medium text-gray-500">
                            Address
                          </dt>
                          <dd class="mt-1 text-sm leading-5 text-gray-900">
                            <address
                              style={{
                                fontStyle: 'normal',
                              }}
                            >
                              {formatAddress(street, city, state, postal_code)}
                            </address>
                          </dd>
                        </div>
                        {phone && (
                          <div class="sm:col-span-1">
                            <dt class="text-sm leading-5 font-medium text-gray-500">
                              Phone
                            </dt>
                            <dd class="mt-1 text-sm leading-5 text-gray-900">
                              <a
                                style={{
                                  fontStyle: 'normal',
                                }}
                                href={`tel:${phone}`}
                              >
                                {phone}
                              </a>
                            </dd>
                          </div>
                        )}
                        {website_url && (
                          <div class="sm:col-span-1">
                            <dt class="text-sm leading-5 font-medium text-gray-500">
                              Website
                            </dt>
                            <dd class="mt-1 text-sm leading-5 text-gray-900">
                              <a
                                style={{
                                  fontStyle: 'normal',
                                }}
                                target="_blank"
                                rel="nofollow noreferrer"
                                href={website_url}
                              >
                                {website_url}
                              </a>
                            </dd>
                          </div>
                        )}

                        {metadata?.description && (
                          <div class="sm:col-span-2">
                            <dt class="text-sm leading-5 font-medium text-gray-500">
                              About {name}
                            </dt>
                            <dd class="mt-1 text-sm leading-5 text-gray-900">
                              {metadata?.description}
                            </dd>
                            <sub>From {name}'s website</sub>
                          </div>
                        )}
                        <div class="col-span-1 sm:col-span-2 mt-2 flex items-center justify-end text-sm leading-5 text-gray-500">
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>
                            Updated:&nbsp;
                            <time datetime="2020-09-08">Sep 9, 2020</time>
                          </span>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row start="xs">
                <Col xs={12}>
                  <aside className="mt-5">
                    <div class="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul>
                        {Array.from(breweries).map((brewery) => {
                          if (!brewery.node.context.brewery) {
                            return null;
                          }
                          return (
                            <li className="border-t border-gray-200">
                              <Link
                                class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                                to={brewery.node.context.brewery.slug}
                              >
                                <div class="px-4 py-4 flex items-center sm:px-6">
                                  <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                      <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
                                        {brewery.node.context.brewery.name}
                                        <span class="ml-1 font-normal text-gray-500">
                                          {brewery.node.context.brewery
                                            .brewery_type &&
                                            `${brewery.node.context.brewery.brewery_type} brewery`}
                                        </span>
                                      </div>
                                      <div class="mt-2 flex">
                                        <div class="flex items-center text-sm leading-5 text-gray-500">
                                          <svg
                                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                          </svg>
                                          <span>
                                            <address>
                                              {formatAddress(
                                                brewery.node.context.brewery
                                                  .street,
                                                brewery.node.context.brewery
                                                  .city,
                                                brewery.node.context.brewery
                                                  .state,
                                                brewery.node.context.brewery
                                                  .postal_code
                                              )}
                                            </address>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="ml-5 flex-shrink-0">
                                    <svg
                                      class="h-5 w-5 text-gray-400"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <div class="py-4 text-center text-sm leading-5 border-t border-gray-200">
                        <Link
                          to={`/${this.props.pageContext.state.toLowerCase()}`}
                          class="text-indigo-600 font-semibold hover:text-indigo-900"
                        >
                          {' '}
                          {`View all ${this.props.pageContext.state} breweries`}
                        </Link>
                      </div>
                    </div>
                  </aside>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </article>
    );
  }
}
export const pageQuery = graphql`
  query Page($state: String) {
    allSitePage(limit: 50, filter: { context: { state: { eq: $state } } }) {
      edges {
        node {
          id
          context {
            brewery {
              state
              name
              slug
              city
              latitude
              longitude
              street
              website_url
              postal_code
              phone
              country
              brewery_type
              metadata {
                description
              }
            }
          }
        }
      }
    }
  }
`;
