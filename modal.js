const modal = document.querySelector('.modal')

export const buildModal = (film) => {
	modal.innerHTML = `<div class='modal-content'>
		<span class="close">&times;</span>
		<div class='modal-flex'>
			<div class='left-section'>
				<img src=${film?.poster?.url || 'sources/film-image.png'} alt=''>
				<p class='movie-length'>${film.movieLength ? `Длительность: ${film.movieLength} мин` : ''}</p>
			</div>
			<div class='right-section'>
				<div class='main-section'>
					<h2>${film.name}</h2>
					<span class='top'>${film.top10 ? 'TOP10' : film.top250 ? 'TOP250' : ''}</span>
					<p class='rating'>${(film.rating.kp).toFixed(1)}</p>
				</div>
				<p class='description'>${film.description || ''}</p>
				<p class='about'>О фильме:</p>
				<div class='about-section'>
						<div class='name-section'>
							<p class='genres'>Жанр:</p>
							<p class='countries'>Страна:</p>
							<p class='year'>Год:</p>
						</div>
						<div class='value-section'>
							<p class='genres'>${Object.values(film.genres).map(e => `${e.name}`).join(', ')}</p>
							<p class='countries'>${Object.values(film.countries).map(e => `${e.name}`).join(', ')}</p>
							<p class='year'>${film.year}</p>
						</div>
				</div>
			</div>
		</div>
		<p class='actors'>Актёры</p>
		<div class='actor-list'>
			${Object.entries(film.persons).map(e => {
				if (e[1].profession === 'актеры' && e[1].name && e[1].photo) {
					const actor = {
						name: e[1].name,
						photo: e[1].photo
					}
					return `<div class = 'actor-item'>
										<img src=${actor.photo} alt='${actor.name}'>
										<h2>${actor.name}</h2>
									</div>`
				}
			}).join('')}
		</div>
	</div>`
	
	modal.style.display = 'block'
	
	const closeModal = (event) => {
		if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
			modal.style.display = 'none'
			document.removeEventListener('click', closeModal)
		}
	}
	
	document.addEventListener('click', closeModal)
}