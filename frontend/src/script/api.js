fetch('https://api.spotify.com/v1/artists/{1dfeR4HaWDbWqFHLkxsg1d}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer BQBKaQ2IVun-XsNCYNxM3szLeBw5n-LtOcWO7TEfDMwc3dSLcTU6GmPTSMEed2RPDznqLjqmELdRtKXSGEvunB4i5Rosa_V4q7WHthb2PRPlJJ9JN7I'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

