import axios from 'axios';

function fetchBaseURL() {
    return fetch('./config.json')
      .then(response => response.json())
      .then(data => {
        return data.BidAppServerBaseURL;
      });
  }

  export async function API() {
    console.log('test')
    if(axios.defaults.instance) {
       return axios.defaults.instance;
    }
    console.log(process.env.PUBLIC_URL)
    let baseurl = await fetchBaseURL();
    axios.defaults.baseURL = baseurl;
    console.log(baseurl)
  
    let instance = axios.create();
  
    // Process the response and get return value
    
  
    axios.defaults.instance = instance;
  
    return instance;
  }