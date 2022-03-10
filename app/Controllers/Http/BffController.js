'use strict'
const ServiceController = require("./ServiceController");
const Env               = use('Env');

/**
 * BffController
 */
class BffController extends ServiceController {

  /**
   * constructor
   */
  constructor() {
    super({urlDestiny:Env.get('REACT_APP_URL_BASE_BFF'), prefix:'api/'})
  }

}

module.exports = BffController
