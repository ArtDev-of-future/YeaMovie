const API = 'https://api.kinopoisk.dev/'
//const KEY = 'B1N1SWY-8Y7MKN6-H7NBQV2-ETBW9E4'
const KEY = '5XJ97E0-AWKMHA5-MW7VK9P-GGF45JG'
const searchForm = document.querySelector('.search')
const filmList = document.querySelector('.films-list')
const items = document.querySelectorAll('.film-item')
const modal = document.querySelector('.modal')
const filterBtn = document.querySelector('.filter-btn')
const filterForm = document.querySelector('.filter')
filterBtn.addEventListener('click', function(event) {
	event.preventDefault()
	const genre = filterForm['film-genres'].value
	const country = filterForm['film-country'].value
	searchFilm('', genre, country)
})

const buildModal = (film) => {
	const actorTitle = document.createElement('p')
	actorTitle.classList.add('actors')
	actorTitle.innerText = 'Актёры'
	const actorList = document.createElement('div')
	actorList.classList.add('actor-list')
	Object.entries(film.persons).map(e => {
		if (e[1].profession === 'актеры' && e[1].name && e[1].photo) {
			const actor = {
				name: e[1].name,
				photo: e[1].photo
			}
			const actorCard = document.createElement('div')
			actorCard.classList.add('actor-item')
			actorCard.innerHTML = `<img src=${actor.photo} alt=''><h2>${actor.name}</h2>`
			actorList.append(actorCard)
		}
	})
	modal.innerHTML = ''
	const modalContent = document.createElement('div')
	modalContent.classList.add('modal-content')
	const aboutSection = document.createElement('div')
	aboutSection.classList.add('about-section')
	const aboutSectionName = document.createElement('div')
	aboutSectionName.innerHTML = `<p class='genres'>Жанр:</p><p class='countries'>Страна:</p><p class='year'>Год:</p>`
	aboutSectionName.classList.add('name-section')
	const aboutSectionValue = document.createElement('div')
	aboutSectionValue.classList.add('value-section')
	aboutSectionValue.innerHTML = `<p class='genres'>${Object.values(film.genres).map(e => `${e.name}`).join(', ')}</p><p class='countries'>${Object.values(film.countries).map(e => `${e.name}`).join(', ')}</p><p class='year'>${film.year}</p>`
	aboutSection.append(aboutSectionName, aboutSectionValue)
	const modalFlex = document.createElement('div')
	modalFlex.classList.add('modal-flex')
	modalFlex.innerHTML = `<div class='left-section'><img src=${film?.poster?.url || 'sources/film-image.png'} alt=''><p class='movie-length'>${film.movieLength ? `Длительность: ${film.movieLength} мин` : ''}</p></div>`
	const rigthSection = document.createElement('div')
	rigthSection.classList.add('right-section')
	rigthSection.innerHTML = `<div class='main-section'><h2>${film.name}</h2><span class='top'>${film.top10 ? 'TOP10' : film.top250 ? 'TOP250' : ''}</span><p class='rating'>${(film.rating.kp).toFixed(1)}</p></div><p class='description'>${film.description}</p><p class='about'>О фильме:</p>`
	rigthSection.append(aboutSection)
	modalContent.innerHTML = `<span class="close">&times;</span>`
	modalFlex.append(rigthSection)
	modalContent.append(modalFlex, actorTitle, actorList)
	modal.append(modalContent)
	modal.style.display = 'block'
	const closeModal = (event) => {
		if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
			modal.style.display = 'none'
			document.removeEventListener('click', closeModal)
		}
	}
	document.addEventListener('click', closeModal)
}

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
	}
}

const searchFilm = async (value = '' , genre = '', country = '') => {
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
	}
}

document.onload = searchFilm()

searchForm.addEventListener('submit', function(event) {
	event.preventDefault()
	searchFilm(event.target['film-name'].value)
})
