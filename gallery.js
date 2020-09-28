const paintingsUrl = "http://localhost:3000/paintings"
//Stable elements
const pageContainer = document.querySelector("div#page-container")
console.log(pageContainer)
// request to paintings index endpoint

fetch(paintingsUrl)
.then(res => res.json())
.then(paintingsArr => {
    paintingsArr.forEach( painting => {
        const image = painting.image
        const imageDiv = document.createElement("div")
        const imageElement = document.createElement("img")
        imageElement.src = image
        imageElement.style.height = "400px"
        imageElement.style.maxWidth = "85%"

        const buttonDiv = document.createElement("div")
        buttonDiv.className = "btn-side-by-side"
        const fullSizeButton = document.createElement("button")
        fullSizeButton.innerText = "see full size"
        const favoriteButton = document.createElement("button")
        favoriteButton.innerText = "favorite ♥️"
        buttonDiv.append(fullSizeButton, favoriteButton)

        imageDiv.append(imageElement,buttonDiv)
        pageContainer.append(imageDiv)
    })

    // imageElement.addEventListener("click", () =>{
    //     console.log(paintingsArr)
    //     //converting html collection to js array
    //     const htmlArray = Array.from(imgBox.children)
    //     htmlArray.forEach( child => child.remove())

    //     imgBox.innerText = `${paintingsArr[0].painter.name}\n${paintingsArr[0].painter.nationality}\n${paintingsArr[0].painter.years}`
    // })

})