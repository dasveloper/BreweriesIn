import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import CityList from "../components/CityList/CityList";
import { Link } from "gatsby";
import dashify from 'dashify';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BreweryListing from "../components/BreweryListing/BreweryListing";

import config from "../../data/SiteConfig";

export default class StateTemplate extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    const citySet = new Set();
    breweries.forEach((brewery) => {
      const { postal_code, city } = brewery.node.context;

      if (city) {
        citySet.add(city);
      }
    });
    return (
      <Layout>
       <Helmet title={`Breweries in "${this.props.pageContext.state}" | ${config.siteTitle}`} /> 
        <article>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <h1>{`All breweries in ${this.props.pageContext.state}`}</h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>

                {
                  breweries.map(brewery => (

                    <BreweryListing key={brewery.node.id} brewery={brewery.node.context} />

                  ))
                }
              </Col>

              <Col xs={12} md={4} >
                <aside style={{ display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ margin: '.5rem 0' }}>{`Breweries in ${this.props.pageContext.state} cities`}</h2>
                  {Array.from(citySet).map((city) => {
                    return <Link style={{ fontSize: '1rem', margin: '.25rem 0', color: '#393939' }} to={`/${dashify(city)}/`}>{`${city} breweries`}</Link>;
                  })}
                </aside>
              </Col>

            </Row>

          </Grid>
        </article>

      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query StatePage($state: String) {
    allSitePage(filter: {context: {state: {eq: $state}}}) {

      edges {
        node {
          id
          context {
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
            metadata{
              description
            }
          }
        }
      }
    }
  }
`




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
