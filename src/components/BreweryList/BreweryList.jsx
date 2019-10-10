import React from "react";
import BreweryListing  from "../BreweryListing/BreweryListing";
class BreweryList extends React.Component {
  render() {
    const { breweries } = this.props;


    
    return (
      <div>
        {/* Your post list here. */
          breweries.map(brewery => (
            <BreweryListing key={brewery.node.id} brewery={brewery.node.context} />
          ))
        }
      </div>
    );
  }
}

export default BreweryList;
