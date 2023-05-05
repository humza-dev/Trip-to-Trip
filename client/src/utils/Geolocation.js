const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'X-RapidAPI-Key': 'b4fd7b8f62msh2d364260a33bbc1p181840jsn8990a4feaf76',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};


export default options