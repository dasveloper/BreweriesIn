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

class Index extends React.Component {
  render() {
    const breweries = this.props.data.allSitePage.edges;
    // const { tag } = this.props.pageContext;
    // const postEdges = this.props.data.allMarkdownRemark.edges;
    const stateSet = new Set();
    const citySet = new Set();

    breweries.forEach((brewery) => {
      const { postal_code, state, city } = brewery.node.context;

      if (state) {
        stateSet.add(state);
      }
      if (city) {
        citySet.add(city);
      }
    });
    return (
      <Layout>
        <Helmet title={`Breweries in the united states | ${config.siteTitle}`} />


        <Grid fluid>
          <Row>
            <Col xs={12} >
              <h1>Find all nearby breweries</h1>
              <p>Nearby Breweries is a directory of all breweries in the United States grouped by city and state to help you find breweries near you.</p>
            </Col>
          </Row>

          <h2>Breweries by state</h2>
          <Row>



            {Array.from(stateSet).map((state) => {
              return (<Col  xs={3} >
                <Link to={`/${dashify(state)}/`}>{`${state} breweries`}</Link>
              </Col>)
            })}
          </Row>
          <h2>Breweries by city</h2>

          <Row>

            {Array.from(citySet).map((city) => {
              return (<Col  xs={3} >
                <Link to={`/${dashify(city)}/`}>{`${city} breweries`}</Link>
              </Col>)
            })}
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

export default Index;

