const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const BetaSignup = require('../models/beta-signup');

//Beta Signup
router.post('/sign-up', function(req, res, next){
  let newBetaSignup = new BetaSignup({
    email: req.body.email,
    game: req.body.game
  });

  BetaSignup.addBetaSignup(newBetaSignup, function(err, betaSignup){
    if (err) {
      res.json({success: false, msg: 'Signup failed!'});
    } else {
      res.json({success: true, msg: 'Signup success!'})
    }
  })
});


router.get('/sign-up', function(req, res, next){
  BetaSignup.find({}, function(err, betaSignups){
    res.json(betaSignups);
  });
});

module.exports = router;
