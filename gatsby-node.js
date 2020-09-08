/* eslint "no-console": "off" */

const fs = require('fs');
const path = require('path');
const dashify = require('dashify');
const _ = require('lodash');
const moment = require('moment');
const siteConfig = require('./data/SiteConfig');

const readJsonAsync = (filepath, callback) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        const result = JSON.parse(data);
        if (result) {
          resolve(result);
        } else {
          console.log('error');
          throw new Error('Json parse error');
        }
      }
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const indexPage = path.resolve('src/templates/index.jsx');
  const postPage = path.resolve('src/templates/post.jsx');
  const statePage = path.resolve('src/templates/state.jsx');
  const cityPage = path.resolve('src/templates/city.jsx');

  const categoryPage = path.resolve('src/templates/category.jsx');
  const breweryPage = path.resolve(`src/templates/page.jsx`);

  const breweries = await readJsonAsync(path.resolve(`src/data.json`));
  const sets = _.groupBy(breweries, 'state');

  const stateSet = new Set();
  const citySet = new Set();

  breweries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  breweries.forEach((brewery) => {
    if (
      brewery.country !== 'United States' ||
      brewery.brewery_type === 'planning'
    ) {
      return;
    }
    if (!brewery.state || !brewery.city) {
      return;
    }

    const slug = `/${dashify(brewery.state)}/${dashify(brewery.city)}/${dashify(
      brewery.name
    )}/`;
    brewery.slug = slug;
    createPage({
      path: slug,
      component: breweryPage,
      context: {
        brewery,
        state: brewery.state,
        city: brewery.city,
      },
    });
  });

  _.forOwn(sets, (cities, state) => {
    createPage({
      path: `/${dashify(state)}/`,
      component: statePage,
      context: {
        state,
      },
    });
  });

  _.forOwn(sets, (cities, state) => {
    cities.forEach((data) => {
      const { city } = data;

      if (!city) {
        return;
      }

      createPage({
        path: `/${dashify(state)}/${dashify(city)}/`,
        component: cityPage,
        context: {
          state,
          city,
        },
      });
    });
  });
};
