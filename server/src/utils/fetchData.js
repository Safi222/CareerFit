const { URL } = require('url');

const headers = {
    "x-rapidapi-host": process.env.JSEARCH_HOST,
    "x-rapidapi-key": process.env.JSEARCH_API_KEY
};
/**
 * @param {string} [query='software engineer'] - The search query for the job search (default is 'software engineer').
 * @param {number} [page=1] - The page number for paginated results (default is 1).
 * @param {string} [country='eg'] - The country code for the job search (default is 'eg' for Egypt).
 * @returns {Promise<object|null>} - The job search results in JSON format or `null` if there is an error.
 */
async function getdata(query = 'software engineer', page = 1, country = 'eg') {
    const fetch = (await
        import ('node-fetch')).default;

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