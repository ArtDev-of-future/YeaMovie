import {service} from './api.js'
import {buildModal} from './modal.js'

const searchForm = document.querySelector('.search')
const filterBtn = document.querySelector('.filter-btn')
const resetBtn = document.querySelector('.reset-btn')
const filterForm = document.querySelector('.filter')
const filmList = document.querySelector('.films-list')

const displayFilms = (value = '', genre = '', country = '') => {
	filmList.innerHTML = ''
	filmList.addEventListener('click', async function(event) {
		const elem = event.target.closest('.film-item')
		if (elem) {
			buildModal(await service.getFilmInfo(elem.dataset.id))
		}
	})
	service.searchFilm(value).then(data => {
		data.docs.forEach(film => {
			const item = document.createElement('div')
			item.classList.add('film-item')
			item.dataset.id = film.id
			const genres = []
			const countries = []
			for (let genre of film.genres) {
				genres.push(genre.name)
			}
			for (let country of film.countries) {
				countries.push(country.name)
			}
			item.dataset.genres = genres.join(' ')
			item.dataset.countries = countries.join(' ')
			item.innerHTML = `<img src=${film?.poster?.url || 'sources/film-image.png'} alt=''>
			 <h2>${film.name}</h2>
			 <div class = 'year-and-rank'><p>${film.year}</p>
			 <p class = 'rating'>${(film.rating.kp).toFixed(0)}/10</p></div>`
			let isSuitable = true
			if (genre !== '') {
				if (genres.indexOf(genre) === -1) {
					isSuitable = false
				}
			}
			if (country !== '') {
				if (countries.indexOf(country) === -1) {
					isSuitable = false
				}
			}
			if (isSuitable) filmList.append(item)
		})
	})
}

filterBtn.addEventListener('click', function(event) {
	event.preventDefault()
	const genre = filterForm['film-genres'].value
	const country = filterForm['film-country'].value
	displayFilms('', genre, country)
})

resetBtn.addEventListener('click', function(event) {
	event.preventDefault()
	filterForm['film-genres'].value = ''
	filterForm['film-country'].value = ''
	displayFilms()
})

document.onload = displayFilms()

searchForm.addEventListener('submit', function(event) {
	event.preventDefault()
	displayFilms(event.target['film-name'].value)
})
