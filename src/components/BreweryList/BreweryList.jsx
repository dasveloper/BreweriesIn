import React from 'react';
import BreweryListing from '../BreweryListing/BreweryListing';
class BreweryList extends React.Component {
  render() {
    const { breweries } = this.props;

    return (
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {/* Your post list here. */
          breweries.map((brewery) => (
            <BreweryListing
              key={brewery.node.id}
              brewery={brewery.node.context}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default BreweryList;
