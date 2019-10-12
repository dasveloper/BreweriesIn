import React from 'react';
import { Link } from "gatsby";
import dashify from 'dashify';



const BreweryListing = ({ brewery }) => {
    const { name, slug, brewery_type, city, state, metadata, email, phone } = brewery;
    if (!slug) return null;
    if (metadata) console.log(metadata)
    return <section>
        <Link to={slug}>
            <h4>{name}</h4>
            <div>
           
               

            </div>

            <div>
                {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
                {brewery_type && <p>{`Type: ${brewery_type}`}</p>}

            </div>

        </Link>
    </section>
}

export default BreweryListing;

