'use strict';
const Route = use('Route');

Route.group(() => {
  Route.any('*', 'BffController.gatewaySync');
}).prefix('api');
