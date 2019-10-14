import React from 'react';
import { Link } from "gatsby";
import dashify from 'dashify';


const formatAddress = (street, city, state, postal_code) => {
    let address = "";
    address += `${street}, ` || "";
    address += `${city} ` || "";
    address += `${state}, ` || "";
    address += `${postal_code}` || "";


    return address;
}

const BreweryListing = ({ brewery }) => {
    const { name, slug, brewery_type, website_url, street, city, state, postal_code, metadata, email, phone } = brewery;
    if (!slug) return null;
    return <section style={{ border: '1px solid #e0e0e0', margin: '10px 0', padding: 10 }}>
        <Link style={{ textDecoration: 'none', color: '#393939' }} to={slug}>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <h4 style={{ fontSize: '1.2rem', margin: '.5rem 0' }}>{name}</h4>
                {brewery_type && <span style={{textTransform: 'uppercase',marginLeft: 10, background: '#e0e0e0', fontSize: '.75rem', padding: '.1rem .5rem', borderRadius: '1rem'}}>{`${brewery_type}`}</span>}
            </div>
            <p style={{ fontSize: '1rem', margin: '.25rem 0', color: '#696969' }}>

                {formatAddress(street, city, state, postal_code)}

            </p>

            <div>
                {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}

            </div>
            <a target="_blank" rel="nofollow noreferrer" href={website_url}>{website_url}</a>
        </Link>
    </section>
}

export default BreweryListing;

