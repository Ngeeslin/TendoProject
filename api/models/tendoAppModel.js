'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentDataSchema = new Schema({
  "resourceType": {
    "type": "String"
  },
  "id": {
    "type": "String"
  },
  "timestamp": {
    "type": "Date"
  },
  "entry": {
    "type": [
      "Mixed"
    ]
  }
});

const appointmentSurveySchema = new Schema({
  "rating":{
    "type": "Number",
  },
  "explination": {
    "type": "Object"
  },
  "feeling": {
    "type": "String"
  },
  "id": {
    "type":"String"
  }
})

module.exports = mongoose.model('AppointmentData', appointmentDataSchema);
module.exports = mongoose.model('SurveyData', appointmentSurveySchema);
