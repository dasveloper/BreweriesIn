/* eslint "no-console": "off" */

const fs = require('fs');
const path = require('path');
const dashify = require('dashify');

const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

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
                  console.log("error");
                  throw new Error("Json parse error");
              }
          }
      });
  });
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;


  const postPage = path.resolve("src/templates/post.jsx");
  const statePage = path.resolve("src/templates/state.jsx");
  const cityPage = path.resolve("src/templates/city.jsx");

  const categoryPage = path.resolve("src/templates/category.jsx");
  const breweryPage = path.resolve(`src/templates/page.jsx`)



  const breweries = await readJsonAsync(path.resolve(`src/data.json`));
  const stateSet = new Set();
  const citySet = new Set();

  breweries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  breweries.forEach((brewery) => {
    if (brewery.country !== "United States" || brewery.brewery_type === "planning"){
      return;
    }
    let slug = '';
    if (brewery.state){
      stateSet.add(brewery.state);
      slug+=`/${dashify(brewery.state)}/`;
    }

    if (brewery.city){
      citySet.add(brewery.city);
      slug+=`/${dashify(brewery.city)}/`;

    }
    slug+=`/${dashify(brewery.name)}/`;

    createPage({
        path: slug,
        component: breweryPage,
        context: brewery,
    })
  });
  
   return;
  stateSet.forEach(state => {
    createPage({
      path: `/${dashify(state)}/`,
      component: statePage,
      context: {
        state
      }
    });
  });
  citySet.forEach(city => {
    createPage({
      path: `/${dashify(city)}/`,
      component: cityPage,
      context: {
        city
      }
    });
  });

};
