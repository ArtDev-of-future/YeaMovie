import {buildModal} from './modal.js'

const API = 'https://api.kinopoisk.dev/'
//const KEY = 'B1N1SWY-8Y7MKN6-H7NBQV2-ETBW9E4'
const KEY = '5XJ97E0-AWKMHA5-MW7VK9P-GGF45JG'
const filmList = document.querySelector('.films-list')

const getFilmInfo = async (id) => {
	const response = await fetch(`${API}v1.4/movie/${id}`, {
		headers: {
			'Content-type': 'application/json',
			'X-API-KEY': KEY
		}
	})
	if (response.ok) {
		const film = await response.json()
		buildModal(film)
	} else {
		console.log(response.status)
	}
}

export const searchFilm = async (value = '' , genre = '', country = '') => {
	const response = await fetch(`${API}v1.4/movie/search?limit=100&query=${value}`, {
		headers: {
			'Content-type': 'application/json',
			'X-API-KEY': KEY
		}
	})
	if (response.ok) {
		const data = await response.json()
		filmList.innerHTML = ''
		filmList.addEventListener('click', function(event) {
			const elem = event.target.closest('.film-item')
			if (elem) {
				getFilmInfo(elem.dataset.id)
			}
		})
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
	} else {
		console.log(response.status)
	}
}