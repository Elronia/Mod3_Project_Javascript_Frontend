//request to paintings index endpoint

// fetch(url)
// .then(res => res.json())
// .then(paintingsArr => {
//     const image = paintingsArr[0].image
//     const imageElement = document.createElement("img")
//     imageElement.src = image
//     imgBox.append(imageElement)


//     imageElement.addEventListener("click", () =>{
//         console.log(paintingsArr)
//         //converting html collection to js array
//         const htmlArray = Array.from(imgBox.children)
//         htmlArray.forEach( child => child.remove())

//         imgBox.innerText = `${paintingsArr[0].painter.name}\n${paintingsArr[0].painter.nationality}\n${paintingsArr[0].painter.years}`
//     })

// })