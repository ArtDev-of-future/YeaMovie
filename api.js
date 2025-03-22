//const KEY = 'B1N1SWY-8Y7MKN6-H7NBQV2-ETBW9E4'
//const KEY = '5XJ97E0-AWKMHA5-MW7VK9P-GGF45JG'

class apiRequest {
	API = 'https://api.kinopoisk.dev/'
	KEY = 'B1N1SWY-8Y7MKN6-H7NBQV2-ETBW9E4'
	
	async getFilmInfo(id) {
		const response = await fetch(`${this.API}v1.4/movie/${id}`, {
			headers: {
				'Content-type': 'application/json',
				'X-API-KEY': this.KEY
			}
		})
		if (response.ok) {
			return await response.json()
		} else {
			console.log(response.status)
		}
	}
	
	async searchFilm(value) {
		const response = await fetch(`${this.API}v1.4/movie/search?limit=100&query=${value}`, {
			headers: {
				'Content-type': 'application/json',
				'X-API-KEY': this.KEY
			}
		})
		if (response.ok) {
			return await response.json()
		} else {
			console.log(response.status)
		}
	}
}

export const service = new apiRequest()