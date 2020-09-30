const paintingsUrl = "http://localhost:3000/paintings"
const paintersUrl = "http://localhost:3000/painters"
const loginUrl = "http://localhost:3000/login"
const favoritesUrl = "http://localhost:3000/favorites"
//Stable elements
const pageContainer = document.querySelector("div#page-container")
const gallery = document.querySelector("#gallery")
const favorites = document.querySelector("#favorites")
const artists = document.querySelector("#artists")
const loggedIn = document.querySelector("#logged-in")
const navBar = document.querySelector("ul")





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

    //Add Event Listener to See Full Size Button
    fullSizeButton.addEventListener("click", () => {
        pageContainer.innerText = ""
        dispayPaintingShow(paintingObject)
    })

    //Add Event Listener to Favorite button
    favoriteButton.addEventListener("click", () => {
        addFavorite(paintingObject)
    })
    
}

//Display list of painters when user clicks on Artist
function displayPainters() {
    //clear out pageContainer
    // document.body.querySelector("div#page-container").remove()
    //fecth request to get array of painters
    fetch(paintersUrl)
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
                    displayArtist(painterObj)

                })
                
            })
            ulDiv.append(ul)
            
            artistNameDiv.append(ulDiv, artistPictureDiv)
            pageContainer.append(artistNameDiv)
            pageContainer.style.justifyContent = "flex-start"
        })
}

function dispayPaintingShow(paintingObj){
    //alread have access to the painting from the argument
    const paintingDiv = document.createElement("div")
    const paintingImage = document.createElement("img")
    paintingImage.className = "artist-image-resize"
    const paintingName = document.createElement("p")
    const yearMade = document.createElement("p")

    paintingImage.src = paintingObj.image
    paintingName.innerText = paintingObj.name
    yearMade.innerText = paintingObj.year

    const painterDiv = document.createElement("div")
    const painterImage = document.createElement("img")
    const painterName = document.createElement("p")
    const painterNationality = document.createElement("p")
    const genre = document.createElement("p")

    const learnMore = document.createElement("button")
    
    painterImage.src = paintingObj.painter.portrait
    painterName.innerText = paintingObj.painter.name
    painterNationality.innerText = paintingObj.painter.nationality
    genre.innerText = paintingObj.painter.genre

    //append everything to page
    paintingDiv.append(paintingImage,paintingName,yearMade)
    painterDiv.append(painterImage,painterName,painterNationality,genre)
    pageContainer.append(painterDiv,paintingDiv)


    
}

//function for display artists show page

function displayArtist(painterObj){
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
            localStorage.setItem('user_id', user.id)
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
    //creates a form to use to log in

    pageContainer.innerText = ""
    //create a form
    const form = document.createElement("form");
    form.id = "login-form"
    //create input element
    const label = document.createElement("label")
    label.for = "username"
    label.innerText = "Enter Username:"
    const input = document.createElement("input");
    input.type = "text";
    input.name = "username";
    input.id = "username";
    //create a button
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.text = "Log In"
    submit.value = "Submit";
    const spacer1 = document.createElement("br")
    const spacer2 = document.createElement("br")
    // add all elements to the form
    form.append(label,spacer1,input,spacer2,submit);
  // add the form inside the body
    pageContainer.append(form);


    // Event Listener for form
    form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        const user = evt.target.username.value
        //fetch request for Login
        logIn(user)
        pageContainer.innerText = ""

        //add a log out button
        const logOutBtn = document.createElement("li")
        logOutBtn.innerText = "Log Out"

        //add class from css file that makes logoutBtn ook like a button
        logOutBtn.className = "logOutBtn move-right"

        //add event listener to let user log out
        logOutBtn.addEventListener("click", ()=>{
            logOut(logOutBtn)
        })

        //append log out button to navbar
        navBar.append(logOutBtn)

        removeLogInForm()
        displayGallery()
    })
  }


  // Log out functionality
  function logOut(btn){
    //need to get rid of log out button that was appended during log in
    //and switch the text back to Not logged in yet like it was at the beginning
    //also need to clear out localStorage
    btn.remove()
    loggedIn.innerText = "Not Logged in Yet"
    localStorage.clear()
    displayLogInForm()
  }


//Display favorites
function displayFavorites(user_id) {
    fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(res => res.json())
        .then(user => {
            createFavorites(user.paintings)     
        })
}

//helper function for display favorites
function createFavorites(favoritePaintingsArr){
    //create div element
    const favoriteDiv = document.createElement("div")

    //iterate over favoriteArr to append html of favorite to div
    favoritePaintingsArr.forEach( painting => {
        //p tag for title of painting
        const pTag = document.createElement("p")
        pTag.innerText = painting.name

        //image tag for painting
        const imageElement = document.createElement("img") 
        imageElement.src = painting.image
        imageElement.className = "artist-image-resize"

        //delete button for favorite
        const deleteBtn = document.createElement("button")
        deleteBtn.className = "delete-btn"
        deleteBtn.innerText = "Delete"

        //Event Listener for Delete Button
        deleteBtn.addEventListener("click", () =>{
            const deleteRoute = `${favoritesUrl}/${painting.id}`
            fetch(deleteRoute, {
                method:"DELETE"
            })
            .then(res => res.json())
            .then(deletedPainting => {
                //delete painting from front end
                pTag.remove()
                imageElement.remove()
                deleteBtn.remove()
            })
        })

        //append to div
        favoriteDiv.append(imageElement,pTag,deleteBtn)
        
        //append new div to page container
        pageContainer.append(favoriteDiv)
    })
}

// Function to add favorite
function addFavorite(paintingObj){
    fetch(favoritesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
                painting_id: paintingObj.id, 
                user_id: localStorage.user_id
            })
    })
    .then(res => res.text())
    .then(favorites => {
        alert(`Added ${paintingObj.name} to Favorites!`)
        
    })
}

// function deleteFavorite(){
//     fetch(`${favoritesUrl}/`)
// }


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

//favorites Event Listener
favorites.addEventListener("click", () => {
    //clear out page container to make room for user favorites div
    pageContainer.innerText = ""
    displayFavorites()
})












//==========================render starting page=========================

displayLogInForm()
