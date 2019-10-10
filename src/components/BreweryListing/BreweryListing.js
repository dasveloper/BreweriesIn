import React from 'react';
import { Link } from "gatsby";
const set = {};
export const BreweryListing = ({brewery}) => {
    const { slug, name, brewery_type } = brewery;

    return (
        <Link to={`/${slug}`} >
            <h1>{name}</h1>
            <p>{brewery_type}</p>
        </Link>
    )
}