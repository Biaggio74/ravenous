const clientId = "S2-_kULZhiC4EHlAHWapMw";
const secret = "saMXmP3bBzftdhnm913AGLiOti3R3S3dYReLWC48hGfEeqJ2jgKKvzRykH3Pnv8g";

let accessToken = '';

// add fetch() polyfill to support older browsers
// to do so run npm install whatwg-fetch --save This will add it ot the package.json file

//NOTES
// Step 23 not clear. arrow function without parameters
// Step 26 chain the then() to the first return statement, I understood to the very first return, so Yelp.getAccessToken
//Step 30, ...business.map(...=> () ) usese () for function instead of {}

export const Yelp = {
  getAccessToken() {
    if (accessToken !== '') {
      return new Promise(resolve => resolve(accessToken));
    };
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'}).then(response => {
      return response.json();
    }).then(jsonResponse => {accessToken = jsonResponse.access_token});
  },
  search(term,location,sortBy) {
    return Yelp.getAccessToken().then( () => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => (
          id: business.id,
          imageSrc: business.image_url,
          name: businesses.name,
          address: businesses.location.address1,
          city: businesses.location.city,
          state: businesses.location.state,
          zipCode: businesses.location.zip_code,
          //category: businesses.categories.map(cat => {cat.alias, cat.title}),
          rating: businesses.rating,
          reviewCount: businesses.review_count

        ));
      }
    });
  }
}
