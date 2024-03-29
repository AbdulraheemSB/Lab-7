let xhrButton = document.getElementById("searchbtn");
let input = document.getElementsByTagName("input")[0];
let searchResults = document.getElementById("searchResults");
let searchFetchPromiseButton = document.getElementById("searchFetchPromise");
let searchFetchAsyncAwaitButton = document.getElementById("searchFetchAsyncAwait");


const apiKey = "XkJYXzkvnuFvDd9Y9sjQGVwamW87NyvV";

xhrButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingXHR(q);
})


searchFetchPromiseButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingFetch(q);
})



searchFetchAsyncAwait.addEventListener("click", function(){

  let q = input.value;
  getImagesUsingFetchAsyncAwait(q);

})





function getImagesUsingXHR(q) {
  let images = [];
 
  let xhr = new XMLHttpRequest();
  let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status === 200) {
      let respText = xhr.responseText;
      let respObj = JSON.parse(respText);

      for (let item of respObj.data) {
        images.push(item.images.downsized_medium.url);
      }
      generateImgElements(images);
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
}


function getImagesUsingFetch(term){

  let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + term;

  let images = [];
  fetch(url)
  .then ((response) => {
    
   return response.json();

  })
  
  .then((respObj)=>{

    for (let item of respObj.data) {
      images.push(item.images.downsized_medium.url);
    }
    generateImgElements(images);

  })

  .catch((e) => {
    console.log("error", e);

  }
  
  )

}


 async function getImagesUsingFetchAsyncAwait(q){

  let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;

  let images = [];
  let response = await fetch(url);
  let responseObj = await response.json();

  for (let item of responseObj.data) {
    images.push(item.images.downsized_medium.url);
  }
  generateImgElements(images);

 }



  function generateImgElements(imageURLs) {
   for (let imageUrl of imageURLs) {
    let imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    searchResults.appendChild(imgElement);
   }
}
