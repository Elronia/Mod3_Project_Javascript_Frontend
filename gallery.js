const paintingsUrl = "http://localhost:3000/paintings"
const painterUrl = "http://localhost:3000/painters"
const loginUrl = "http://localhost:3000/login"
//Stable elements
const pageContainer = document.querySelector("div#page-container")
const gallery = document.querySelector("#gallery")
const favorites = document.querySelector("#favorites")
const artists = document.querySelector("#artists")




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
            pageContainer.style.flexWrap = "nowrap"
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
function logIn(){  
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
        //fetch request for Login
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                username: "user"
            }
        })
        .then(res => res.json())
        .then(user => console.log(user))
    })
  }

//gallery Event Listener
gallery.addEventListener("click", () => {
    pageContainer.innerText = ""
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

logIn()
















 // imageElement.addEventListener("click", () =>{
    //     console.log(paintingsArr)
    //     //converting html collection to js array
    //     const htmlArray = Array.from(imgBox.children)
    //     htmlArray.forEach( child => child.remove())

    //     imgBox.innerText = `${paintingsArr[0].painter.name}\n${paintingsArr[0].painter.nationality}\n${paintingsArr[0].painter.years}`
    // })