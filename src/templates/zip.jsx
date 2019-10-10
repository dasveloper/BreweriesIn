import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import CityList from "../components/CityList/CityList";
import { Link } from "gatsby";

import BreweryList from "../components/BreweryList/BreweryList";
import config from "../../data/SiteConfig";
import kebabCase from "kebab-case";

export default class ZipTemplate extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    const stateSet = new Set();
    const citySet = new Set();

    breweries.forEach((brewery) => {
      const { city, state } = brewery.node.context;
      if (state) {
        stateSet.add(state);
      }
      if (city) {
        citySet.add(city);
      }
    });

    return (
      <Layout>
        <div className="tag-container">
          {/* <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} /> */}
         
          {Array.from(stateSet).map((state) => {
          return <Link to={`/${kebabCase(state)}/`}>{state}</Link>;
        })} 
          <BreweryList breweries={breweries} />
          {Array.from(citySet).map((city) => {
          return <Link to={`/${kebabCase(city)}/`}>{city}</Link>;
        }) }

        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ZipPage($zip: String) {
    allSitePage(filter: {context: {postal_code: {eq: $zip}}}) {
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


