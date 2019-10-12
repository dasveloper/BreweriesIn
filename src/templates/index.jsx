
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

export default class IndexTemplate extends React.Component {
  render() {


    return (
      <Layout>
        {/* <Helmet title={`Breweries in "${state}" | ${config.siteTitle}`} /> */}
        <article>
Home
          <Grid fluid>

            <Row>
</Row>

          </Grid>
        </article>

      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexTemplate {
    allSitePage{

      edges {
        node {
          id
      
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
