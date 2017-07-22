import { Meteor } from 'meteor/meteor';

JsonRoutes.ErrorMiddleware.use('/api/ping', RestMiddleware.handleErrorAsJson);
JsonRoutes.ErrorMiddleware.use('/api/getRandomNumber', RestMiddleware.handleErrorAsJson);

JsonRoutes.add('GET', '/api/ping/:clientTimestamp', (request, response, next) => {
  try {
    let clientTimestamp = parseInt(request.params.clientTimestamp);

    check(clientTimestamp, Number);

    let serverTimestamp = Date.now();
    let serverPing = serverTimestamp - clientTimestamp;
    let result = { method: 'REST Request', clientTime: clientTimestamp, serverTime: serverTimestamp, ping: serverPing };

    JsonRoutes.sendResult(response, { data: result });
  }
  catch (err) {
    console.error(err);
    let error = new Meteor.Error(501, 'Ping Error', err);
    error.statusCode = 500;
    throw error;
  }
});

JsonRoutes.add('POST', '/api/getRandomNumber', (request, response, next) => {
  try {

    let result = { valor: 'VALE POR UN NUEVO CARTON'};
    
    JsonRoutes.sendResult(response, { data: result });
  }
  catch (err) {
    console.error(err);
    let error = new Meteor.Error(502, 'Ping Error', err);
    error.statusCode = 500;
    throw error;
  }
});