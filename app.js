import { euphemismData } from '/data.js'

const categoryRadios = document.getElementById('category-radios')
const getWordBtn = document.getElementById('get-word-btn')
const modalInner = document.getElementById('modal-inner')
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')

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

function getSingleWordObject(){
    const wordsArray = getMatchingWordsArray()
    
    if(wordsArray.length === 1){
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
        
        const matchingWordsArray = euphemismData.filter(function(word){
            return word.tags.includes(selectedCategory)
        })
        return matchingWordsArray 
    }  
}

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
            name="emotions"
            >
        </div>`
    }
    categoryRadios.innerHTML = radioItems
}

renderCategoryRadios(euphemismData)

