import {searchFilm} from './api'

const searchForm = document.querySelector('.search')
const filterBtn = document.querySelector('.filter-btn')
const resetBtn = document.querySelector('.reset-btn')
const filterForm = document.querySelector('.filter')

filterBtn.addEventListener('click', function(event) {
	event.preventDefault()
	const genre = filterForm['film-genres'].value
	const country = filterForm['film-country'].value
	searchFilm('', genre, country)
})

resetBtn.addEventListener('click', function(event) {
	event.preventDefault()
	filterForm['film-genres'].value = ''
	filterForm['film-country'].value = ''
	searchFilm()
})

document.onload = searchFilm()

searchForm.addEventListener('submit', function(event) {
	event.preventDefault()
	searchFilm(event.target['film-name'].value)
})
