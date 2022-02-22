'use strict';
const mongoose = require('mongoose');
const Data = mongoose.model('AppointmentData');
const Survey = mongoose.model('SurveyData');

  exports.find_data_by_id = (req, res) => {
    Data.findOne({id: req.params.id}, (err, data) => {
      if (err)
        res.send(err);
      res.json(data);
    });
  };

  exports.get_data = (req, res) => {
    Data.find({}, (err, data) => {
      if (err)
        res.send(err);
      res.json(data);
    });
  };

  exports.create_data = (req, res) => {
    let new_data = new Data(req.body);
    new_data.save((err, data) => {
      if (err)
        res.send(err);
      res.json(data);
    });
  };

  exports.create_survey_data = (req, res) => {
    let survey_data = new Survey(req.body);
    survey_data.save((err, data) => {
      if (err)
        res.send(err);
      res.json(data);
    });
  }