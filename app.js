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
        ps: 20,
        q: 'monkey'
    });

    fetch(url).then(function(apiRes) {
        return apiRes.json();
    }).then(function(jsonRes) {
        console.log(jsonRes.artObjects);
        artApp.displayArt(jsonRes.artObjects);
    });
};

// create method that takes api data and displays onto page
artApp.displayArt = function(artArray) {
    artArray.forEach(function(artwork) {
        // console.log(artwork);

        // save data in variables
        const artworkTitle = artwork.title;
        const artworkImgSrc = artwork.webImage.url;
        const altText = artwork.longTitle;
        const artist = artwork.principalOrFirstMaker;

        // console.log(artworkTitle, artworkImgSrc, altText, artist);

        // create elements, add necessary classes/data, appendChild)

        // create li in which this info will be added
        const artworkLi = document.createElement('li');
        artworkLi.classList.add('piece');

        // create h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;

        // create img to hold artwork img
        const artworkImg = document.createElement('img');
        // img element node has src and alt properties. set value
        artworkImg.alt = altText;
        artworkImg.src = artworkImgSrc;

        // create p to hold artist name
        const artworkP = document.createElement('p');
        artworkP.classList.add('artist');
        artworkP.textContent = artist;


        // apppending things into the li
        // artworkLi.appendChild(heading);
        // artworkLi.appendChild(artworkImg);
        // artworkLi.appendChild(artworkP);
        artworkLi.append(heading, artworkImg, artworkP)

        // appending the li to ul
        const artworkUl = document.getElementById('artwork');
        artworkUl.appendChild(artworkLi);
        console.log(artworkLi);
    });
}

// make and init method
artApp.init = function() {
    // call method to get art data
    artApp.getArt();
};

// call the init(at end of code)
artApp.init();