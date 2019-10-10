/* eslint "no-console": "off" */

const fs = require('fs');
const path = require('path');

const _ = require("lodash");
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
  const zipPage = path.resolve("src/templates/zip.jsx");

  const categoryPage = path.resolve("src/templates/category.jsx");
  const breweryPage = path.resolve(`src/templates/page.jsx`)



  const breweries = await readJsonAsync(path.resolve(`src/data.json`));
  const stateSet = new Set();
  const citySet = new Set();
  const zipSet = new Set();

  breweries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  breweries.forEach((brewery) => {
    if (brewery.country !== "United States" || brewery.brewery_type === "planning"){
      return;
    }
    if (brewery.state){
      stateSet.add(brewery.state);
    }
    if (brewery.postal_code){
      zipSet.add(brewery.postal_code);
    }
    if (brewery.city){
      citySet.add(brewery.city);
    }

    createPage({
        path: brewery.slug,
        component: breweryPage,
        context: brewery,
    })
  });
  stateSet.forEach(state => {
    createPage({
      path: `/${_.kebabCase(state)}/`,
      component: statePage,
      context: {
        state
      }
    });
  });
  citySet.forEach(city => {
    createPage({
      path: `/${_.kebabCase(city)}/`,
      component: cityPage,
      context: {
        city
      }
    });
  });
  zipSet.forEach(zip => {
    createPage({
      path: `/${_.kebabCase(zip)}/`,
      component: zipPage,
      context: {
        zip
      }
    });
  });
};