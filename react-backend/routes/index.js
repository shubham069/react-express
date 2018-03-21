var express  = require('express');
var passport = require('passport');
var router   = express.Router();
//var CreateEvent = require('./CreateEvent.js');



/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("here");
	//console.log(req);
	var user = undefined;
	if (req.session.passport && req.session.passport.user) {
		user = req.session.passport.user;
		console.log("Authenticated!!!");
	
			/*res.json([{
				id: 1,
				username: "samsepi0l"
			}, {
				id: 2,
				username: "D0loresH4ze"
			}]);*/
			//res.send( 
			//	"BSSO NodeJS Test Application Success");
				console.log("sent success response");
  }
  res.send( 
   "BSSO NodeJS Test Application ERror");
	
});

router.post('/login/callback',
	passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
	function (req, res) {
		res.send("BSSO NodeJS Test Application Success");
		//res.redirect('/CreateEvent');
		//res.redirect('/');
	}
);

router.get('/login',
	passport.authenticate('saml', { failureRedirect: '/', failureFlash: true}),
	function (req, res) {
		console.log("redirecitng to /");
		res.redirect('/');
	}
);

router.get('/logout', function (req, res) {
	req.session.destroy(function(err) {
	});
	res.redirect('/');
});


router.get('/CreateEvent', function (req,res){
	passport.authenticate('saml', { failureRedirect: '/', failureFlash: true}),
	function(req,res){
		res.send("sent success response");
	}
}
);

module.exports = router;
