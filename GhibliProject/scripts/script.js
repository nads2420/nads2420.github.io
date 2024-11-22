let app = document.querySelector('#root')

const movie = {
  engName:" ",
  japName:" ",
  director: " ",
  producer: " ",
  releaseDate: " ",
  description: " ",
  rating:" "
};

//create ifo arrays
let movieTitles = []; 
let japMovieTitles = []; 
let movieTitlesSpacesRemoved = []; 
let movieDescription = [];
let directors =[];
let producers =[];
let releaseDates=[];
let ratings=[];
let movies=[];
let az = document.querySelector("#alpha"); //alphabetical button
let za = document.querySelector("#reverse");  //reverse button
let alphaMovies=[];
let reverMovies=[];
let movieImg = document.querySelector("#movieImg");
let movieImg1 = document.querySelector("#movieImg1");
let currentIndex = 0;
let movieAmt =0;
let movieIndex=0;
let etitle =movieTitles[currentIndex];

//create vars for searching
const searchButton = document.querySelector("#searchButton");
let searchField = document.querySelector("#searchterm");
const prefix = "nks8789-"; 
const searchKey = prefix + "movie";
const storedSearch = localStorage.getItem(searchKey);

let container = document.createElement('div');
let infoBox = document.createElement('div');
let prev = document.querySelector('#previous');
let next = document.querySelector('#next');
let displayTerm = " ";
infoBox.setAttribute('id', 'infoBox');
container.setAttribute('class', 'container');

//add click events
prev.addEventListener("click", PrevButtonFunction);
next.addEventListener("click", NextButtonFunction);
searchButton.addEventListener("click",searchButtonClicked)
//az.addEventListener("click", AlphabeticalList);
//za.addEventListener("click", ReverseList);


app.appendChild(container);
app.appendChild(infoBox);

searchField.onchange = e=>{ localStorage.setItem(searchKey, e.target.value); }; //changes movie value in storage
let engTitle = document.createElement('h1');
engTitle.style.fontSize = 40 +'px';
engTitle.style.textDecoration = "underline";
let japTitle = document.createElement('h1');
japTitle.style.fontSize = 35 +'px';
let p = document.createElement('p');
let infoP = document.createElement('p');

if (storedSearch){
  searchField.value = storedSearch;
  
}else{
  searchField.value = "Castle in the Sky"; // a default value if `nameField` is not found
}

//puts the movie title list order in alphabetical order
function AlphabeticalList()
{
  alphaMovies = movieTitles.sort(); //creates alphabetical order list
  movieTitlesSpacesRemoved = movieTitlesSpacesRemoved.sort();
  currentIndex = 0;
  movies[currentIndex].engName = alphaMovies[currentIndex];
  // forEach(movie)
  // movieDescription[] = movies[currentIndex].description;

 // etitle=movies[currentIndex].engName;
  Update();
 // console.log(currentIndex);
}
//reverse the movie title list order
function ReverseList()
{
  reverMovies = movieTitles.reverse();
  movieTitlesSpacesRemoved = movieTitlesSpacesRemoved.reverse();
 currentIndex =0;
  movies[currentIndex].engName = reverMovies[currentIndex];
  Update();
  //console.log(currentIndex);
}
//updates the info for a film
function Update() {

//movies[]
   movies[currentIndex].engName = movieTitles[currentIndex];
   engTitle.innerHTML = movies[currentIndex].engName;
   movies[currentIndex].japName = japMovieTitles[currentIndex];
  japTitle.innerHTML = movies[currentIndex].japName;

  movieImg.src= 'GhibliPics/' + movieTitlesSpacesRemoved[currentIndex] + '.jpg';
  movieImg1.src= 'GhibliPics/' + movieTitlesSpacesRemoved[currentIndex] + '1.jpg';
  p.innerHTML = `${movieDescription[currentIndex]}...`;
  infoP.innerHTML = `${'Director: ' + directors[currentIndex] +' Producer: ' + producers[currentIndex] + ' Release Date: ' +
  releaseDates[currentIndex] + ' Rating: ' + ratings[currentIndex]}`;
}
//user clicks the next button
function NextButtonFunction() {

  //update the counter index
if(currentIndex < movieAmt)
{
  currentIndex++;
 Update();
}
if(currentIndex==movieAmt)
{
  currentIndex=0;
  Update();
}
}
//finds movie from array
function searchButtonClicked(){
  let found = false;
  for(let i=0; i<movieTitles.length; i++)
  {
    if(movieTitles[i].toLowerCase() == searchField.value.toLowerCase())
    {
      currentIndex = i;
      Update();
      found = true;
      
    }
    
  }
  if(found == false)
  {searchField.value = "no results";}


}
// user clicks the prev button
function PrevButtonFunction() {
  
  //update the counter index
  if(currentIndex != 0)
  {
    currentIndex--;
    Update();
  }
  else
  {
    currentIndex=movieAmt;
    Update();
  }
}

let request = new XMLHttpRequest()
request.open('GET', 'https://ghibliapi.vercel.app/films', true)
request.onload = function () {

  // Begin accessing JSON data here
  let data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach((movie) => {
    
    //console.log(movies);
      //add titles to the movie list
      movieTitles.push(movie.title);
      japMovieTitles.push(movie.original_title);
     
      movieTitlesSpacesRemoved.push(movie.title.split(" ").join(""))
      movieDescription.push(movie.description.substring(0, 2000));
      directors.push(movie.director);
      producers.push(movie.producer);
      releaseDates.push(movie.release_date);
      ratings.push(movie.rt_score);
      movies.push(movie);
      movieAmt = movieTitles.length;
    })
     //movie titles amt
     //console.log(movieTitles.length);
    
     
    //  for (let m in movies) {
    //   // code to be executed
    //   //console.log(movies.length);
    //  movies[m].engName = movieTitles[m];
    //  console.log( movies[m].engName);
    // }
    }
    
    //add the movie info
    Update();

    //append time
     infoBox.appendChild(infoP);
    container.appendChild(engTitle);
    container.appendChild(japTitle);
    container.appendChild(movieImg);
    container.appendChild(p);
    

  }


request.send();



