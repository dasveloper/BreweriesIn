import React from "react";
// import { BreweryListing } from "../BreweryListing/BreweryListing";
class CityList extends React.Component {
  render() {
    const { cities } = this.props;


    return (
      <div>

        {Array.from(cities).map((city) => {
          return <Link to={`/${city}`}>{city}</Link>;
        })
        }

      </div >
    );
  }
}

export default CityList;
