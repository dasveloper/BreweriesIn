import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import CityList from "../components/CityList/CityList";
import { Link } from "gatsby";
import dashify from 'dashify';

import BreweryList from "../components/BreweryList/BreweryList";
import config from "../../data/SiteConfig";

export default class StateTemplate extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    const zipSet = new Set();
    const citySet = new Set();

    breweries.forEach((brewery) => {
      const { postal_code, city } = brewery.node.context;
      
      if (city) {
        citySet.add(city);
      }
    });
    return (
      <Layout>
        <div className="tag-container">
          {/* <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} /> */}
          <BreweryList breweries={breweries} />
          {Array.from(citySet).map((city) => {
            return <Link to={`/${dashify(city)}/`}>{city}</Link>;
          })}
       
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
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
            state
            metadata{
              image
            }
              
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
