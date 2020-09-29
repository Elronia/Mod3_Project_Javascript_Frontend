const paintingsUrl = "http://localhost:3000/paintings"
const painterUrl = "http://localhost:3000/painters"
const loginUrl = "http://localhost:3000/login"
//Stable elements
const pageContainer = document.querySelector("div#page-container")
const gallery = document.querySelector("#gallery")
const favorites = document.querySelector("#favorites")
const artists = document.querySelector("#artists")
const loggedIn = document.querySelector("#logged-in")





//========================DOM Manipulation=================================

//function to be executed on click of Art galery link
function displayGallery(){
    fetch(paintingsUrl)
    .then(res => res.json())
    .then(paintingsArr => {
        paintingsArr.forEach( painting => {
            turnObjectToImage(painting)
        })

    })

}
//helper function to create an image from a painting object from fetch request
function turnObjectToImage(paintingObject){
    const image = paintingObject.image
    const imageDiv = document.createElement("div")
    imageDiv.className = "artist-page-images"

    //create img tag with styling
    const imageElement = document.createElement("img")
    imageElement.src = image
    imageElement.style.height = "500px"
    imageElement.style.maxWidth = "auto"

    //create full-size and favorite buttons
    const buttonDiv = document.createElement("div")
    buttonDiv.className = "btn-side-by-side"
    const fullSizeButton = document.createElement("button")
    fullSizeButton.innerText = "see full size"
    const favoriteButton = document.createElement("button")
    favoriteButton.innerText = "favorite ♥️"

    //append unstable elements to pageContainer
    buttonDiv.append(fullSizeButton, favoriteButton)
    imageDiv.append(imageElement, buttonDiv)
    pageContainer.append(imageDiv)
}

//Display list of painters when user clicks on Artist
function displayPainters() {
    //clear out pageContainer
    // document.body.querySelector("div#page-container").remove()
    //fecth request to get array of painters
    fetch(painterUrl)
        .then(res => res.json())
        .then(painters => {
            //use for each to create unstable list elements
            const artistNameDiv = document.createElement("div")

            const artistPictureDiv = document.createElement("div")
            const painterImageUl = document.createElement("ul")
            artistPictureDiv.append(painterImageUl)

            const ulDiv = document.createElement("div")
            const ul = document.createElement("ul")
            painters.forEach((painterObj) => {
                //generates painter images on the side of li with painter names
                const painterImageLi = generatePainterImages(painterObj)
                painterImageUl.append(painterImageLi)


                const li = document.createElement("li") 
                li.innerText = painterObj.name 
                li.style.display = "block"
                li.className = "artist-page-li"
                ul.append(li)
                // Event Listener for artist Li
                li.addEventListener("click", () => {

                    //styling for artist show page

                    pageContainer.innerText = ""
                    const painterPortrait = document.createElement("img")
                    painterPortrait.className = "artist-image-resize"
                    const painterName = document.createElement("p")
                    const painterYears = document.createElement("p")
                    const painterGenre = document.createElement("p")
                    const painterNationality = document.createElement("p")
                    const painterBio = document.createElement("p")
                    //putting info into a variable we just created
                    painterPortrait.src = painterObj.portrait
                    painterName.innerText = painterObj.name
                    painterYears.innerText = painterObj.years
                    painterGenre.innerText = painterObj.genre
                    painterNationality.innerText = painterObj.nationality
                    painterBio.innerText = painterObj.bio
                    //append to page container
                    pageContainer.append(painterPortrait, painterName, painterYears, painterGenre, painterNationality, painterBio)
                })
                
            })
            ulDiv.append(ul)
            
            artistNameDiv.append(ulDiv, artistPictureDiv)
            pageContainer.append(artistNameDiv)
            pageContainer.style.justifyContent = "flex-start"
        })
}



//helper function for displayPainters
function generatePainterImages(painterObj){
    const painterImageLi = document.createElement("li")
    painterImageLi.style.display = "none"
    const painterImage = document.createElement("img")
    painterImage.style.width = "auto"
    painterImage.style.height = "250px"

    painterImage.src = painterObj.portrait

    painterImageLi.append(painterImage)
    return painterImageLi
}

//Login function


//dispayLogInForm form helper function
function logIn(formData){
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
        username:formData
        })
    })
    .then(res => res.json())
    .then(user => {
        if (user.id){
            loggedIn.innerText = user.username
        }
        else{
            alert("something went wrong")
        }
    })
}

//displayLogInForm helper that removes the log in form

function removeLogInForm(){
    const logInInputs = document.body.querySelectorAll("input")
    logInInputs.forEach( input => input.remove())
}

function displayLogInForm(){  
    pageContainer.innerText = ""
    //create a form
    const form = document.createElement("form");
    //create input element
    const input = document.createElement("input");
    input.type = "text";
    input.name = "username";
    input.id = "username";
    //create a button
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    // add all elements to the form
    form.append(input,submit);
  // add the form inside the body
  document.getElementsByTagName('body')[0].append(form); //pure javascript
    // Event Listener for form
    form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        const user = evt.target.username.value
        console.log(user)
        //fetch request for Login
        logIn(user)
        pageContainer.innerText = ""
        removeLogInForm()
        displayGallery()
    })
  }


  // Log out functionality





//========================Event Listeners=================================

//gallery Event Listener
gallery.addEventListener("click", () => {
    pageContainer.innerText = ""
    pageContainer.style.justifyContent = "center"
    displayGallery()
})

//artists Event Listener
artists.addEventListener("click", () => {
    pageContainer.innerText = ""
    displayPainters()
})

// //favorites Event Listener
// favorites.addEventListener("click", () => {
//     pageContainer.innerText = ""
//     displayFavorites()
// })













displayLogInForm()
