import React from 'react';
import { Link } from 'gatsby';
import dashify from 'dashify';

const formatAddress = (street, city, state, postal_code) => {
  let address = '';
  address += `${street}, ` || '';
  address += `${city} ` || '';
  address += `${state}, ` || '';
  address += `${postal_code}` || '';

  return address;
};

const BreweryListing = ({ brewery }) => {
  if (!brewery) {
    return null;
  }
  const {
    name,
    slug,
    brewery_type,
    website_url,
    street,
    city,
    state,
    postal_code,
    metadata,
    email,
    phone,
  } = brewery;
  if (!slug) return null;
  return (
    <li class="border-t border-gray-200">
      <Link
        class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        style={{ textDecoration: 'none', color: '#393939' }}
        to={slug}
      >
        <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
              <h2>{name} </h2>
              <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                {brewery_type && (
                  <span className="capitalize">{`${brewery_type} brewery`}</span>
                )}
              </p>
            </div>
          </div>
          <div class="mt-2 sm:flex sm:justify-between">
            <div class="sm:flex">
              {phone && (
                <div class="mr-6 flex items-center text-sm leading-5 text-gray-500">
                  <svg
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {phone}
                </div>
              )}
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <address
                  style={{
                    fontStyle: 'normal',
                  }}
                >
                  {formatAddress(street, city, state, postal_code)}
                </address>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
    // <section
    //   style={{ border: '1px solid #e0e0e0', margin: '10px 0', padding: 10 }}
    // >
    //   <Link style={{ textDecoration: 'none', color: '#393939' }} to={slug}>
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <h4 style={{ fontSize: '1.2rem', margin: '.5rem 0' }}>{name}</h4>

    //     </div>
    //     <p style={{ fontSize: '1rem', margin: '.25rem 0', color: '#696969' }}>
    //       {formatAddress(street, city, state, postal_code)}
    //     </p>

    //     <div>
    //       {phone && (
    //         <p>
    //           Phone: <a href={`tel:${phone}`}>{phone}</a>
    //         </p>
    //       )}
    //     </div>
    //     <a target="_blank" rel="nofollow noreferrer" href={website_url}>
    //       {website_url}
    //     </a>
    //   </Link>
    // </section>
  );
};

export default BreweryListing;
