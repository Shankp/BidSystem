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

    instance.interceptors.request.use((config) => {

      // Debug Info
      // console.log(localStorage.getItem('token'));
      // console.log(localStorage.getItem('loggedInData'));
      //
  
      var authTicket = sessionStorage.getItem('token');
      console.log(authTicket)
      if(authTicket != null){
        config.headers = { 'authorization': 'Bearer '+authTicket };
      }
      return config
      }, 
      error => {
      return Promise.reject(error)
    });
  
    // Process the response and get return value
    
  
    axios.defaults.instance = instance;
  
    return instance;
  }