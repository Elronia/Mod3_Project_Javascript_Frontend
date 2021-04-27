const paintingsUrl = "https://interactive-art-gallery.herokuapp.com/paintings"
const paintersUrl = "https://interactive-art-gallery.herokuapp.com/painters"
const loginUrl = "https://interactive-art-gallery.herokuapp.com/login"
const favoritesUrl = "https://interactive-art-gallery.herokuapp.com/favorites"
const usersUrl = "https://interactive-art-gallery.herokuapp.com/users"
//Stable elements
const pageContainer = document.querySelector("div#page-container")
const gallery = document.querySelector("#gallery")
const favorites = document.querySelector("#favorites")
const artists = document.querySelector("#artists")
const loggedIn = document.querySelector("#logged-in")
const changeUsername = document.querySelector("#change-username")
const navBar = document.querySelector("ul")
let globalPainter = {}





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
    imageElement.className = "big-on-hover"

    //create full-size and favorite buttons
    const buttonDiv = document.createElement("div")
    buttonDiv.className = "side-by-side"
    const favorite = document.createElement("span")
    favorite.innerHTML = "<i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i>"
    favorite.className = "heart"
    const paintingName = document.createElement("p")
    paintingName.className = "fav"
    paintingName.innerText = paintingObject.name
    paintingName.append(favorite)

    //append unstable elements to pageContainer
    buttonDiv.append(paintingName)
    imageDiv.append(imageElement, buttonDiv)
    pageContainer.append(imageDiv)

    //Add Event Listener to See painting
    imageElement.addEventListener("click", () => {
        pageContainer.innerText = ""
        dispayPaintingShow(paintingObject)
        // console.log(paintingObject)

        globalPainter = paintingObject.painter
    })


    //Add Event Listener to Favorite button
    favorite.addEventListener("click", () => {
        favorite.innerHTML = "<i class=\"fa fa-heart\" aria-hidden=\"true\"></i>"
        favorite.style.color = "#b58d20"
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
                    pageContainer.style.justifyContent = "center"
                    pageContainer.style.flexDirection = "column"
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
    paintingImage.className = "stretch-painting"
    const paintingName = document.createElement("p")
    const yearMade = document.createElement("p")

    paintingImage.src = paintingObj.image
    paintingName.innerText = paintingObj.name
    yearMade.innerText = paintingObj.year

    const nameAndYear = document.createElement("p")
    nameAndYear.innerText = `"${paintingName.innerText}", ${yearMade.innerText}`
    nameAndYear.className = "center-text-under-painting"

    const painterDiv = document.createElement("div")
    const painterImage = document.createElement("img")
    painterImage.className = "alternative"
    const painterName = document.createElement("p")
    const painterNationality = document.createElement("p")
    const genre = document.createElement("p")

    
    painterImage.src = paintingObj.painter.portrait
    painterName.innerText = paintingObj.painter.name
    painterNationality.innerText = paintingObj.painter.nationality
    genre.innerText = paintingObj.painter.genre

    //favorite button to be put under painting
    const favButton = document.createElement("button")
    favButton.innerText = "Favorite 🤍"
    favButton.className = "fav-btn"


    //append everything to page
    paintingDiv.append(paintingImage,nameAndYear,favButton)
    painterDiv.append(painterImage,painterName,painterNationality,genre)
    pageContainer.append(painterDiv,paintingDiv)

    //event listener for painter image to lead back to their info
    painterImage.addEventListener("click", () =>{
        displayArtist(globalPainter)
    })

    //event listener to allow user to favorite a painting
    favButton.addEventListener("click", () => {
        addFavorite(paintingObj)
    })

    
}

//function for display artists show page

function displayArtist(painterObj){
    //styling for artist show page

    pageContainer.innerText = ""
    //painter portrait and painterInfo will go side by side
    const painterPortrait = document.createElement("img")
    painterPortrait.className = "alternative"

    //everything for painterInfo goes here
    painterInfo = document.createElement("div")

    //class to add bigger font to all children of painterInfo
    painterInfo.className = "painter-info"
    const painterName = document.createElement("p")
    const painterYears = document.createElement("p")
    const painterGenre = document.createElement("p")
    const painterNationality = document.createElement("p")
    const painterBio = document.createElement("p")
    painterBio.className = "painter-bio"

    painterInfo.append(painterName,painterYears,painterGenre,painterNationality)
    //I need a div to wrap painterInfo and portrait in
    const portraitAndInfo = document.createElement("div")
    portraitAndInfo.append(painterPortrait,painterInfo,painterBio)
    // portraitAndInfo.className = "portrait-and-info"

    //assigning the variables created above with data from db
    painterPortrait.src = painterObj.portrait
    painterName.innerText = painterObj.name
    painterYears.innerText = painterObj.years
    painterGenre.innerText = painterObj.genre
    painterNationality.innerText = painterObj.nationality
    painterBio.innerText = painterObj.bio
    //append to painter description div

    pageContainer.append(portraitAndInfo)
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
    label.innerText = "Username:"
    const input = document.createElement("input");
    input.required = true;
    input.type = "text";
    input.name = "username";
    input.id = "username";
    input.placeholder = "Enter Username..."
    //create a button
    const submit = document.createElement("input");
    submit.className = "submit-button";
    submit.type = "submit";
    submit.text = "Log In"
    submit.value = "Log in";
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
            //fixes issue in which form renders too wide when logging out from artist show
            pageContainer.style.justifyContent = "center"
            pageContainer.style.flexDirection = "row"
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
    
    loggedIn.innerText = "Not Logged in"
    localStorage.clear()
    displayLogInForm()
  }


//Display favorites
function displayFavorites(user_id) {
    fetch(`https://interactive-art-gallery.herokuapp.com/users/${localStorage.user_id}`)
        .then(res => res.json())
        .then(user => {
            createFavorites(user.paintings,user.favorites)    
        })
}

//helper function for display favorites
function createFavorites(favoritePaintingsArr,favoriteIdArr){
    //title of favorites page
    // const title = document.createElement("h1")
    // title.innerText = "Your Favorite Paintings"
    // title.className = "fav-title"

    //append title to page container before forEach loop
    // pageContainer.append(title)

    //iterate over favoriteArr to append html of favorite to div
    favoritePaintingsArr.forEach( painting => {
        //create div element
        const favoriteDiv = document.createElement("div")
        favoriteDiv.className = "favorited-painting"

        //p tag for title of painting
        const pTag = document.createElement("p")
        pTag.className = "center-text-under-painting"
        pTag.innerText = painting.name

        //image tag for painting
        const imageElement = document.createElement("img") 
        imageElement.src = painting.image
        imageElement.className = "artist-image-resize"

        //delete button for favorite
        const deleteBtn = document.createElement("button")
        deleteBtn.className = "delete-btn"
        deleteBtn.innerText = "Delete From Favorites"

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
                favoriteDiv.remove()
                
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
    .then(res => res.json())
    .then(favorites => {
        alert(`Added ${paintingObj.name} to Favorites!`)
        
    })
}

// function deleteFavorite(){
//     fetch(`${favoritesUrl}/`)
// }

//Functions that allow the user to update their username

function displayUpdateForm(){
    pageContainer.innerText = ""
    //create a form
    const updateForm = document.createElement("form");
    updateForm.id = "update-form"
    //create input element
    const label = document.createElement("label")
    label.for = "username"
    label.innerText = "New Username:"
    const input = document.createElement("input");
    input.required = true;
    input.type = "text";
    input.name = "new username";
    input.id = "new-username";
    input.placeholder = "Enter New Username..."
    //create a button
    const update = document.createElement("input");
    update.className = "update-button";
    update.type = "submit";
    update.text = "Change My Username"
    update.value = "Change My Username";
    const spacer1 = document.createElement("br")
    const spacer2 = document.createElement("br")
    // add all elements to the form
    updateForm.append(label,spacer1,input,spacer2,update);
  // add the form inside the body
    pageContainer.append(updateForm);

    //add event listener to update button
    updateForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        console.log("I hit it")
        //udpate in the backend with updateUsername()
        //redirect back to the displayGallery()
        const user = evt.target["new username"].value

        //fetch request for update
        updateUsername(user)
        pageContainer.innerText = ""

        displayGallery()
        
    })
}

function updateUsername(formData){
    const updateRoute = `${usersUrl}/${localStorage.user_id}`
    fetch(updateRoute, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body:JSON.stringify({
            username:formData
        })
    })
    .then( res => res.json())
    .then(updatedUser => {
        loggedIn.innerText = updatedUser.username
    })
}


//========================Event Listeners=================================

//gallery Event Listener
gallery.addEventListener("click", () => {
    if (localStorage.user_id){
        pageContainer.innerText = ""
        pageContainer.style.justifyContent = "center"
        pageContainer.style.flexDirection = "row"
        displayGallery()
    }
    else{
        alert("Please Log in to view this page")
    }
})

//artists Event Listener
artists.addEventListener("click", () => {
   if(localStorage.user_id){
    pageContainer.innerText = ""
    pageContainer.style.justifyContent = "flex-start"
    displayPainters()
   }else{
    alert("Please Log in to view this page")
   }
})

//favorites Event Listener
favorites.addEventListener("click", () => {
    if(localStorage.user_id){
        //clear out page container to make room for user favorites div
        pageContainer.innerText = ""
        pageContainer.style.flexDirection = "row"
        pageContainer.style.justifyContent = "flex-start"
        displayFavorites()
    }
    else{
        alert("Please Log in to view this page")
    }
})

//change username Event Listener
changeUsername.addEventListener("click", () => {
    if(localStorage.user_id){
        pageContainer.style.flexDirection = "row"
        pageContainer.style.justifyContent = "center"
        displayUpdateForm()
    }
    else{
        alert("Please Log in to view this page")
    }
})












//==========================render starting page=========================


//first page that is rendered to user
displayLogInForm()

