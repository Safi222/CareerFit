const Route = require('express').Router

const auth = Route()

auth.post('/register', (req, res)=>{
	res.json({msg: "register endpoint exist"
	})
})

auth.post('/login', (req, res)=>{
	res.json({msg: "login endpoint exist"
	})
})

module.exports = auth
