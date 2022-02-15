// create an app object
const artApp = {};

// save reusable data in namespace (apikey)
artApp.apiKey = 'DLnkZoO3';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

// make a namespaced api call
artApp.getArt = function() {
    // imgonly: true, returns only things for which an img is available
    const url = new URL(artApp.apiUrl)
    url.search = new URLSearchParams({
        key: this.apiKey,
        imgonly: true,
        ps: 50,
        q: 'monkey'
    });

    fetch(url).then(function(apiRes) {
        return apiRes.json();
    }).then(function(jsonRes) {
        console.log(jsonRes.artObjects);
    });
    // take that data and put ot on the page
};

// make and init method
artApp.init = function() {
    // call method to get art data
    artApp.getArt();
};

// call the init(at end of code)
artApp.init();