const modal = document.querySelector('.modal')

export const buildModal = (film) => {
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
	rigthSection.innerHTML = `<div class='main-section'><h2>${film.name}</h2><span class='top'>${film.top10 ? 'TOP10' : film.top250 ? 'TOP250' : ''}</span><p class='rating'>${(film.rating.kp).toFixed(1)}</p></div><p class='description'>${film.description || ''}</p><p class='about'>О фильме:</p>`
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