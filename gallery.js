const paintingsUrl = "http://localhost:3000/paintings"
const painterUrl = "http://localhost:3000/painters"
//Stable elements
const pageContainer = document.querySelector("div#page-container")









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

    //create img tag with styling
    const imageElement = document.createElement("img")
    imageElement.src = image
    imageElement.style.height = "500px"
    imageElement.style.maxWidth = "400px"

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
    document.body.querySelector("div#page-container").remove()
    //fecth request to get array of painters
    fetch(painterUrl)
        .then(res => res.json())
        .then(painters => {
            //use for each to create unstable list elements
            const ul = document.createElement("ul")
            painters.forEach(painterObj => {
                const li = document.createElement("li") 
                li.innerText = painterObj.name 
                li.style.display = "block"
                li.className = "artist-page-li"
                ul.append(li)
            })
            document.body.append(ul)
        })
}

//displayGallery()
displayPainters()














 // imageElement.addEventListener("click", () =>{
    //     console.log(paintingsArr)
    //     //converting html collection to js array
    //     const htmlArray = Array.from(imgBox.children)
    //     htmlArray.forEach( child => child.remove())

    //     imgBox.innerText = `${paintingsArr[0].painter.name}\n${paintingsArr[0].painter.nationality}\n${paintingsArr[0].painter.years}`
    // })