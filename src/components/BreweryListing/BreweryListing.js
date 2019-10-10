import React from 'react';
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby"
import LazyLoad from 'react-lazyload';
// const set = {};
// export const BreweryListing = (props) => {
//     console.log(props);
//     return <p/>
//     const { slug, name, brewery_type } = brewery;
// console.log(data)
//     return (
//         <Link to={`/${slug}`} >
//             <h1>{name}</h1>
//             <p>{brewery_type}</p>
//         </Link>
//     )
// }
const BreweryListing = ({ brewery }) => {
    const { slug, name, brewery_type, metadata } = brewery;
  
    return <div>
        <header>
            <p>{brewery.name}</p>
            <div style={{ width: 125, height: 125, background: '#e0e0e0' }}>
                {/* {image && <StaticQuery
                    query={graphql`
            query {
                file(relativePath: { eq: "images/"+image }) {
                childImageSharp {
                    # Specify the image processing specifications right in the query.
                    # Makes it trivial to update as your page's design changes.
                    fluid {
                    ...GatsbyImageSharpFluid
                    }
                }
                }
            }
                `}
                    render={data => (

                        <Img
                            fluid={data.file.childImageSharp.fluid}
                            alt="Gatsby Docs are awesome"
                        />

                    )}
                />} */}
                      <LazyLoad once offset={100}>

                {metadata && metadata.image &&<img style={{maxWidth: '100%'}} src={`/images/${metadata.image}`}/>}
                </LazyLoad>
            </div>
        </header>
    </div>
}

export default BreweryListing;

