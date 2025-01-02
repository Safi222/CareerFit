const { URL } = require('url');

const headers = {
	"x-rapidapi-host": process.env.JSEARCH_HOST,
	"x-rapidapi-key": process.env.JSEARCH_API_KEY
};

async function getdata(query = 'software engineer', page = 1, country = 'eg') {
	const fetch = (await import('node-fetch')).default;

	const myurl = new URL(process.env.JSEARCH_URL);
	myurl.searchParams.append('query', query);
	myurl.searchParams.append('page', page);
	myurl.searchParams.append('country', country);

	try {
		const response = await fetch(myurl.toString(), {
			method: 'GET',
			headers
		});
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(`Error fetching data: ${error.message}`);
		return null;
	}
}

module.exports = getdata;