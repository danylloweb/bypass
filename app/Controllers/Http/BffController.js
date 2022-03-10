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
    super({urlDestiny:Env.get('MS_REST_URL'), prefix:'api/'})
  }

}

module.exports = BffController
