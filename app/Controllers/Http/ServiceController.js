'use strict'
const client = use('request-promise');

/**
 * ServiceController
 */
class ServiceController {
  /**
   * constructor
   * @param urlDestiny
   * @param prefix
   */
  constructor({urlDestiny, prefix}) {
    this.urlDestiny = urlDestiny;
    this.prefix     = prefix;
  }
  /**
   * Função Sincrona responsável por passar todas as requisições para a API alvo
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async gatewaySync({ request, response }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');
      if (request.method() === 'GET') {
        return await this.sendGet(url,{Accept: 'application/json'})
      } else {
        return await this.send(url,request.method(),{Accept: 'application/json'},request.body)
      }
    } catch (error) {
      return response.status(200).send(error);
    }
  }

  /**
   * gatewayASync
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async gatewayASync({ request, response }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');
      if (request.method() === 'GET') {
        this.sendGet(url,{Accept: 'application/json'})
      } else {
        this.send(url,request.method(),{Accept: 'application/json'},request.body)
      }

      return response.status(200).send({error:false, message:'Enviado!'});

    } catch (error) {

      return response.status(error.statusCode).send({
        ...error,
        status: error.statusCode,
        message: error.error.message ? error.error.message : error.error.error
      });
    }
  }

  /**
   *
   * @param request
   * @param response
   * @param auth
   * @returns {Promise<*>}
   */
  async gatewaySyncLogged({ request, response, auth }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');

      if (url === this.urlDestiny + '/') return response.unauthorized({message: 'unauthorized'});

      let user = await auth.getUser();
      let header = {Accept: 'application/json', Authorization : user.email};

      if (request.method() === 'GET') {
        return await this.sendGet(url, header)
      } else {
        return await this.send(url,request.method(),header,request.body)
      }
    } catch (err) {
      let error = err.error;
      return response.status(err.statusCode).send({error});
    }
  }

  /**
   * gatewayAsyncLogged
   * @param request
   * @param response
   * @param auth
   * @returns {Promise<*>}
   */
  async gatewayAsyncLogged({ request, response, auth }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');

      if (url === this.urlDestiny + '/') return response.unauthorized({message: 'unauthorized'});

      let user   = await auth.getUser();

      if (request.method() === 'GET') {
        this.sendGet(url, {Accept: 'application/json', Authorization : user.email})
      } else {
        this.send(url,request.method(),{Accept: 'application/json', Authorization : user.email},request.body)
      }
      return response.status(200).send({error:false, message:'Enviado!'});
    } catch (err) {
      let error = err.error;
      return response.status(err.statusCode).send({error});
    }
  }
  /**
   * sendGet
   * @param url
   * @param header
   * @returns {Promise<*>}
   */
  async sendGet(url, header)
  {
    return await client({method: 'GET', url: url, headers:header, json: true, rejectUnauthorized: false});
  }

  /**
   *
   * @param url
   * @param method
   * @param header
   * @param body
   * @returns {Promise<*>}
   */
  async send(url, method, header, body)
  {
    return await client({method: method, url: url, headers: header, body: body, json: true, rejectUnauthorized: false});
  }
}

module.exports = ServiceController
