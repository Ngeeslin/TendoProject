'use strict';
module.exports = (app) => {
  const tendoAppData = require('../controllers/tendoAppController'); 

  app.route('/data')
  .get(tendoAppData.get_data)
  .post(tendoAppData.create_data);

  app.get('/data/:id', tendoAppData.find_data_by_id);
  app.put('/survey', tendoAppData.create_survey_data);
}