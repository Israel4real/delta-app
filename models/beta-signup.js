const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

var Schema = mongoose.Schema;

//BetaSignupSchema
var BetaSignupSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  game: {
    type: String,
    default: 'any',
    required: true,
  }
});


const BetaSignup = module.exports = mongoose.model('BetaSignup', BetaSignupSchema);

module.exports.getBetaSignups = function(callback){
  BetaSignup.find({}, callback);
}

module.exports.getBetaSignupByGame = function(game, callback){
  const query = {game: game}
  User.find(query, callback);
}

module.exports.addBetaSignup = function(newBetaSignup, callback){
  newBetaSignup.save(callback);
}


