const API = 'https://api.kinopoisk.dev/'
const KEY = 'B1N1SWY-8Y7MKN6-H7NBQV2-ETBW9E4'
const searchForm = document.querySelector('.search')
const filmList = document.querySelector('.films-list')
const modal = document.querySelector('.modal')

const getFilmInfo = async (id) => {
	const response = await fetch(`${API}v1.4/movie/${id}`, {
		headers: {
			'Content-type': 'application/json',
			'X-API-KEY': KEY
		}
	})
	if (response.ok) {
		const film = await response.json()
		modal.innerHTML = ''
		const modalContent = document.createElement('div')
		modalContent.classList.add('modal-content')
		modalContent.innerHTML = `<span class="close">&times;</span><div class='modal-flex'><div class='left-section'><img src=${film?.poster?.url || 'sources/film-image.png'} alt=''><p class='movie-length'>${film.movieLength ? `Длительность: ${film.movieLength} мин` : ''}</p></div><div class='right-section'><div class='main-section'><h2>${film.name}</h2><span class='top'>${film.top10 ? 'TOP10' : film.top250 ? 'TOP250' : ''}</span><p class='rating'>${(film.rating.kp).toFixed(1)}</p></div><p class='description'>${film.description}</p><p class='about'>О фильме:</p><div class='about-section'><p class='genres'>Жанры: ${Object.values(film.genres).map(e => `${e.name}`).join(', ')}</p><p class='countries'>Страны: ${Object.values(film.countries).map(e => `${e.name}`).join(', ')}</p><p class='year'>Год: ${film.year}</p></div></div></div>`
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
}

const searchFilm = async (value = '') => {
	const response = await fetch(`${API}v1.4/movie/search?query=${value}`, {
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
			item.innerHTML = `<img src=${film?.poster?.url || 'sources/film-image.png'} alt=''>
			 <h2>${film.name}</h2>
			 <div class = 'year-and-rank'><p>${film.year}</p>
			 <p class = 'rating'>${(film.rating.kp).toFixed(0)}/10</p></div>`
			filmList.append(item)
		})
	}
}

document.onload = searchFilm()

searchForm.addEventListener('submit', function(event) {
	event.preventDefault()
	searchFilm(event.target['film-name'].value)
})