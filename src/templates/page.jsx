import React from 'react';
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import CityList from "../components/CityList/CityList";
import { Link } from "gatsby";
import dashify from 'dashify';
import { Grid, Row, Col } from 'react-flexbox-grid';


import config from "../../data/SiteConfig";

const formatAddress = (street, city, state, postal_code) => {
    let address = "";
    address += `${street}, ` || "";
    address += `${city} ` || "";
    address += `${state}, ` || "";
    address += `${postal_code}` || "";


    return address;
}
export default (data) => {
    const { name, slug, brewery_type, website_url, street, city, state, postal_code, metadata, email, phone } = data.pageContext;
    if (!slug) return null;

    return (
        <article>
       <Helmet title={`${name} | ${config.siteTitle}`} /> 

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.8rem', margin: '.5rem 0' }}>{name}</h1>
                {brewery_type && <span style={{ textTransform: 'uppercase', marginLeft: 10, background: '#e0e0e0', fontSize: '.75rem', padding: '.1rem .5rem', borderRadius: '1rem' }}>{`${brewery_type}`}</span>}
            </div>
            <p style={{ fontSize: '1.2rem', margin: '.25rem 0', color: '#696969' }}>

                {formatAddress(street, city, state, postal_code)}

            </p>

            <div>
                {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}

            </div>
            <a target="_blank" rel="nofollow noreferrer" href={website_url}>{website_url}</a>
        </article>
    );
};

