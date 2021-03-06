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

export default class CityTemplate extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    // const citySet = new Set();
    // breweries.forEach((breweryContext) => {
    //   const { brewery } = breweryContext.node.context;

    //   if (!brewery) {
    //     return;
    //   }
    //   const { postal_code, city } = brewery;

    //   if (city) {
    //     citySet.add(city);
    //   }
    // });
    return (
      <Layout>
        <Helmet>
          <title>{`Breweries in ${this.props.pageContext.city} | ${config.siteTitle}`}</title>

          <meta
            name="description"
            content={`Directory of all breweries located in ${this.props.pageContext.city}`}
          />
        </Helmet>
        <article>
          <Grid fluid className="bg-gray-100 p-10">
            <Row center="xs">
              <Col xs={12} lg={8}>
                <Row start="xs">
                  <Col xs={12}>
                    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                      <h1 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        {`All breweries in ${this.props.pageContext.city}, ${this.props.pageContext.state}`}
                      </h1>
                      <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                        A collection of all the breweries you can visit in{' '}
                        {this.props.pageContext.city}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row start="xs">
                  <Col xs={12}>
                    <div class="px-4 py-5 sm:px-6">
                      <div class="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul>
                          {breweries.map((brewery) => (
                            <BreweryListing
                              key={brewery.node.id}
                              brewery={brewery.node.context.brewery}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </article>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CityPage($city: String) {
    allSitePage(filter: { context: { city: { eq: $city } } }) {
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

// export const pageQuery = graphql`
//   query TagPage($tag: String) {
//     allMarkdownRemark(
//       limit: 1000
//       sort: { fields: [fields___date], order: DESC }
//       filter: { frontmatter: { tags: { in: [$tag] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//             date
//           }
//           excerpt
//           timeToRead
//           frontmatter {
//             title
//             tags
//             cover
//             date
//           }
//         }
//       }
//     }
//   }
// `;
