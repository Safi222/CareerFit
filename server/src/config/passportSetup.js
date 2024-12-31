const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
passport.use(new GoogleStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: "/api/auth/google/callback"
},
	async function (accessToken, refreshToken, profile, cb) {
		const currentUser = await User.findOne({googleId: profile.id})
		if (!currentUser){
			const newUser = new User({
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				googleId: profile.id
			})
			await newUser.save()
			cb(null, newUser)
		}
		cb(null, currentUser)
	}
));
