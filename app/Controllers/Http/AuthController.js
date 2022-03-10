'use strict';
const ServiceController = require("./ServiceController");
const Env               = use('Env');

/**
 * AuthController
 */
class AuthController extends ServiceController{
  /**
   * constructor
   */
  constructor() {
    super({urlDestiny:Env.get('MS_AUTH_URL'), prefix:'auth/'});
    this.urlDestiny = Env.get('MS_AUTH_URL');
  }

  /**
   * revokeToken
   * @param response
   * @param auth
   */
  async revokeToken({response, auth}) {
    const apiToken = auth.getAuthHeader();
    await auth.authenticator('jwt').revokeTokens([apiToken]);
    return response.json({error: false, message: 'user unauthenticated'});
  }

  /**
   * login
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async login({request, response}){
    try {
      return await this.send(this.urlDestiny + '/auth/token', request.method(), { Accept: 'application/json' }, request.body);
    } catch (err) {
      return response.status(401).send({ err });
    }
  }



}

module.exports = AuthController;
