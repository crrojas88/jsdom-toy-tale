let addToy = false;
const URL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  // grabbing the form so we can add an event listener
  const form = document.querySelector('.add-toy-form')
  
  // create an event listener for when a new toy is submitted, and pass addNewToy helper function
  form.addEventListener("submit", addNewToy)


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});

function getToys() {
  fetch(URL)
  .then(response => (response.json()))
  .then(allToys => iterateToys(allToys))
}

function iterateToys(toyObj) {
  for (toy of toyObj) {
    // console.log(toy)
    newToyCard(toy)
  }
}

function newToyCard(toy) {
  // grab parent div
  const parentDiv = document.querySelector("#toy-collection")
  // create child div for toy card
  const div = document.createElement('div')
  // give child div a class
  div.className = "card"
  div.setAttribute("data-id", toy.id)
  // create h2 element
  const toyH2 = document.createElement('h2')
  // fill h2 with toy name
  toyH2.innerText = toy.name
  // create img element
  const toyImg = document.createElement('img')
  // set src for toyImg
  toyImg.src = toy.image 
  // set class for toyImg
  toyImg.className = "toy-avatar"
  // create p element for toy card
  const p = document.createElement('p')
  // fill p element with number of likes
  p.innerText = `${toy.likes} Likes`
  // create button element
  const likeBtn = document.createElement('button')
  // set classname for button
  likeBtn.className = 'like-btn'
  // give button a name
  likeBtn.innerText = 'Like'
  // listen for an event when you click like
  likeBtn.addEventListener("click", addLike)

  // append all elements to child div
  div.append(toyH2, toyImg, p, likeBtn)
  //  append child div to parent div
  parentDiv.appendChild(div)
}

function addNewToy(e) {
  // prevent page from reloading
  e.preventDefault()
  // debugger
  let body = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }

  fetch(URL, configObj)
  .then(response => response.json())
  .then(newToyObj => newToyCard(newToyObj))
}

function addLike(e) {
  

  const id = e.target.parentNode.dataset.id  
  // const div = e.target.parentNode
  // const likeCount = div.querySelector('p')
  // console.log(likeCount)
  const likeCount = e.target.previousElementSibling
  likeCount.innerText = `${+toy.likes++} Likes`

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": + likeCount.innerText+1
    })
  }

  fetch(URL + `/${id}`, configObj)
// +likeCount.innerText++
}