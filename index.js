console.log('Happy developing ✨')
const API = 'https://api.kinopoisk.dev/'
const KEY = 'B1N1SWY-8Y7MKN6-H7NBQV2-ETBW9E4'
const searchForm = document.querySelector('.search')
const filmList = document.querySelector('.films-list')

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