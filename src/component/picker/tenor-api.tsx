// url Async requesting function
function httpGetAsync(theUrl: any, callback: any) {
  // create the request object
  const xmlHttp = new XMLHttpRequest()

  // set the state change callback to capture when the response comes in
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText)
    }
  }

  // open as a GET call, pass in the url and set async = True
  xmlHttp.open('GET', theUrl, true)

  // call send with no params as they were passed in on the url string
  xmlHttp.send(null)
}

// function to call the trending and category endpoints
async function SearchGif(
  tenorAccessKey = '',
  query = '',
  page = '',
  perPage = 30,
  whenResult = (_e: any) => {}
) {
  const lmt = perPage

  // test search term
  const searchTerm = query

  // using default locale of en_US
  let searchUrl

  if (!query || query.length === 0) {
    searchUrl =
      'https://g.tenor.com/v1/trending?key=' +
      tenorAccessKey +
      '&limit=' +
      lmt +
      '&pos=' +
      page
  } else {
    searchUrl =
      'https://g.tenor.com/v1/search?q=' +
      searchTerm +
      '&key=' +
      tenorAccessKey +
      '&limit=' +
      lmt +
      '&pos=' +
      page
  }

  httpGetAsync(searchUrl, (response: any) => {
    const json = JSON.parse(response)
    whenResult(json)
  })

  // data will be loaded by each call's callback
}

export default SearchGif
