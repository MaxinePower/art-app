// create an app object
const artApp = {};

// save reusable data in namespace (apikey)
artApp.apiKey = 'DLnkZoO3';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';


// make a namespaced api call
artApp.getArt = function(usersChosenAnimal) {
    // imgonly: true, returns only things for which an img is available
    const url = new URL(artApp.apiUrl)
    url.search = new URLSearchParams({
        key: this.apiKey,
        imgonly: true,
        ps: 20,
        q: usersChosenAnimal
    });

    fetch(url).then(function(apiRes) {
        return apiRes.json();
    }).then(function(jsonRes) {
        artApp.displayArt(jsonRes.artObjects);
    });
};

// create method that takes api data and displays onto page
artApp.displayArt = function(artArray) {
    const artworkUl = document.getElementById('artwork');
    artworkUl.innerHTML = '';
    artArray.forEach(function(artwork) {
        // save data in variables
        const artworkTitle = artwork.title;
        const artworkImgSrc = artwork.webImage.url;
        const altText = artwork.longTitle;
        const artist = artwork.principalOrFirstMaker;

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
        
        artworkUl.appendChild(artworkLi);
    });
}

// create a method to change the header to fit the selected animal
artApp.updateH1 = function(selectedAnimal) {
    document.querySelector('.selected-animal').textContent = selectedAnimal;
};


// creating a method that sets up our event listener
artApp.eventListenerSetup = function() {
    // 1st event listener 
    // when user selects an animal use that as query in the api call
    const selectEl = document.getElementById('animalOptions');
    selectEl.addEventListener('change', function(e) {
        // call method to get art data
        // artApp.getArt(e.explicitOriginalTarget.value);
        // OR
        artApp.updateH1(this.value);
        artApp.getArt(this.value);
    });
}

// make and init method
artApp.init = function() {
    // call event listener method
    artApp.eventListenerSetup();

    // calling the get art method so we start by seeing art on the page
    artApp.getArt('bear');
};

// call the init(at end of code)
artApp.init();