'use strict';

/**
 * HomeController
 */
class HomeController {
  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
    async unauthorized({request, response}){
      return response.unauthorized({message: 'unauthorized'});
    }

}

module.exports = HomeController;
