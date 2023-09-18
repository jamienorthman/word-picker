import { euphemismData } from './data.js'
//Global variables to access later:
const categoryRadios = document.getElementById('category-radios')
const getWordBtn = document.getElementById('get-word-btn')
const modalInner = document.getElementById('modal-inner')
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
// Highlights a radio only when checked:
categoryRadios.addEventListener('change', highlightCheckedOption)

modalCloseBtn.addEventListener('click', closeModal)

getWordBtn.addEventListener('click', renderWord)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    modal.style.display = 'none'
}

//Produces HTML for the randomly selected word of getSingleWordObject()
//Euphemism is displayed, then fades out, and then its true meaning fades in.
function renderWord(){
    const wordObject = getSingleWordObject()
    modalInner.innerHTML =  `
        <span 
        class="fade-out">
        ${wordObject.word} 
        </span>
        <span 
        class="fade-in">
        ${wordObject.reason}
        </span>
        `
    modal.style.display = 'flex'
}

// Randomly goes through matchingWordsArray to produce one of the words that shares
//category chosen by user
function getSingleWordObject(){
    const wordsArray = getMatchingWordsArray()
    
    if(wordsArray.length === 1){ //if it's just one word sharing chosen category, return that word.
        return wordsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * wordsArray.length)
        return wordsArray[randomNumber]
    }
}

function getMatchingWordsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedCategory = document.querySelector('input[type="radio"]:checked').value
        // if the category of the checked radio value...
        const matchingWordsArray = euphemismData.filter(function(word){
            return word.tags.includes(selectedCategory)
        }) //...matches other word's categories (in array they're called "tags")...
        return matchingWordsArray 
    }   //...collect those words in a new array.
}

//Creates an array of categories (called "tags" in array) so each category
//appears just once.
function getCategoriesArray(words){
    const categoriesArray = []    
    for (let word of words){
        for (let tag of word.tags){
            if (!categoriesArray.includes(tag)){
                categoriesArray.push(tag)
            }
        }
    }
    return categoriesArray
}

//Using getCategoriesArray(), produces HTML (radio button elements) for each 
//category and includes them in the Categoryradios container div.
function renderCategoryRadios(words){
        
    let radioItems = ``
    const categories = getCategoriesArray(words)
    for (let category of categories){
        radioItems += `
        <div class="radio">
            <label for="${category}">${category}</label>
            <input
            type="radio"
            id="${category}"
            value="${category}"
            name="categories"
            >
        </div>`
    }
    categoryRadios.innerHTML = radioItems
}

renderCategoryRadios(euphemismData)

