import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import CityList from "../components/CityList/CityList";
import { Link } from "gatsby";
import _ from "lodash";

import BreweryList from "../components/BreweryList/BreweryList";
import config from "../../data/SiteConfig";

export default class CityTemplate extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    const stateSet = new Set();
    const zipSet = new Set();

    breweries.forEach((brewery) => {
      const { postal_code, state } = brewery.node.context;
      if (state) {
        stateSet.add(state);
      }
      if (postal_code) {
        zipSet.add(postal_code);
      }
    });

    return (
      <Layout>
        <div className="tag-container">
          {/* <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} /> */}
         
          {Array.from(stateSet).map((state) => {
          return <Link to={`/${_.kebabCase(state)}/`}>{state}</Link>;
        })} 
          <BreweryList breweries={breweries} />
          {Array.from(zipSet).map((zip) => {
          return <Link to={`/${_.kebabCase(zip)}/`}>{zip}</Link>;
        }) }

        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CityPage($city: String) {
    allSitePage(filter: {context: {city: {eq: $city}}}) {
      edges {
        node {
          id
          context {
            state
            name
            slug
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
          }
        }
      }
    }
  }
`


