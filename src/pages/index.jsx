import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import CityList from '../components/CityList/CityList';
import { Link } from 'gatsby';
import dashify from 'dashify';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BreweryListing from '../components/BreweryListing/BreweryListing';

import config from '../../data/SiteConfig';

class Index extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    const stateSet = new Set();
    const citySet = new Set();

    breweries.forEach((brewery) => {
      const { postal_code, state, city } = brewery.node.context.brewery || {};

      if (state) {
        stateSet.add(state);
      }
      if (city) {
        citySet.add(city);
      }
    });
    return (
      <Layout>
        <Helmet
          title={`Breweries in the united states | ${config.siteTitle}`}
        />

        <Grid fluid className="bg-gray-100 p-10">
          <Row>
            <Col xs={12}>
              <div class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
                <div class="relative h-full max-w-screen-xl mx-auto">
                  <svg
                    class="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                    width="404"
                    height="784"
                    fill="none"
                    viewBox="0 0 404 784"
                  >
                    <defs>
                      <pattern
                        id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          class="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="404"
                      height="784"
                      fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                    />
                  </svg>
                  <svg
                    class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                    width="404"
                    height="784"
                    fill="none"
                    viewBox="0 0 404 784"
                  >
                    <defs>
                      <pattern
                        id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          class="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="404"
                      height="784"
                      fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
                    />
                  </svg>
                </div>
              </div>
              <div class="relative z-2 mt-1 mx-auto max-w-screen-xl px-4 sm:px-6 py-10">
                <div class="text-center">
                  <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                    Find all&nbsp;
                    <span class="text-indigo-600">nearby breweries</span>
                  </h2>
                  <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Nearby Breweries is a directory of all breweries in the
                    United States grouped by city and state to help you find
                    breweries near you.{' '}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <section className="mt-6 relative z-2 ">
                <div class="px-4 py-3 border-b border-gray-200 sm:px-6">
                  <h2 class="text-xl leading-4 tracking-tight font-extrabold text-gray-900 sm:text-2xl sm:leading-6">
                    Breweries by state
                  </h2>
                  <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Browse a collection of all breweries by the state their
                    located in.
                  </p>
                </div>

                <div class="bg-white overflow-hidden shadow sm:rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <Row>
                      {Array.from(stateSet).map((state) => {
                        return (
                          <Col xs={3}>
                            <Link
                              to={`/${dashify(state)}/`}
                            >{`${state} breweries`}</Link>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
              </section>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <section className="mt-6 relative z-2 ">
                <div class="px-4 py-3 border-b border-gray-200 sm:px-6">
                  <h2 class="text-xl leading-4 tracking-tight font-extrabold text-gray-900 sm:text-2xl sm:leading-6">
                    Breweries by city
                  </h2>
                  <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Browse a collection of all breweries by the cities their
                    located in.
                  </p>
                </div>

                <div class="bg-white overflow-hidden shadow sm:rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <Row>
                      {Array.from(citySet).map((city) => {
                        return (
                          <Col xs={3}>
                            <Link
                              to={`/${dashify(city)}/`}
                            >{`${city} breweries`}</Link>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Grid>
      </Layout>
    );
  }
}
export const pageQuery = graphql`
  query Index {
    allSitePage {
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

export default Index;
