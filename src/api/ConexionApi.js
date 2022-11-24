const axios = require('axios');
const data = JSON.stringify({
  "user": "mlepin",
  "password": "Java#@#8"
});

const config = {
  method: 'get',
  url: 'http://150.100.253.61:8181/cxf/usuarios/services/validatepass',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then( ({data})=> {
  console.log(JSON.stringify(data));
})
.catch( (error)=> {
  console.log(error);
});