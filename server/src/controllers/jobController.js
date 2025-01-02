const getdata = require('../utils/fetchData')

const jobFetchController = async(req, res) => {
	try{
		const data = await getdata(req.query.query, req.query.page, req.query.country)
		return res.status(200).json(
			{
				status: "success",
				data: {
					data
				}
			}
		)
	}
	catch (error){
		res.status(200).json(
			{
				status: "fail",
				data: {
					title: error.message
				}
			}
		)
	}
}

module.exports = jobFetchController;