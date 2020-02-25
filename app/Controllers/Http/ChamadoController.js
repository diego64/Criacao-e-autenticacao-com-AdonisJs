'use strict'

const Chamado = use('App/Models/Chamado');

/**
 * Resourceful controller for interacting with chamados
 */
class ChamadoController {
  /**
   * Show a list of all chamados.
   * GET chamados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const chamado = await Chamado.query().with('user').fetch();

    return chamado;
  }

  /**
   * Create/save a new chamado.
   * POST tweets
   */

  async store ({ request, auth }) {
    const data = request.only(['content']);
    const chamado = await Chamado.create({ user_id: auth.user.id, ...data });

    return chamado;
  }

  /**
   * Display a single tweet.
   * GET tweets/:id
   */

  async show ({ params }) {
      const chamado = await Chamado.findOrFail(params.id);

      return chamado;
  }

  /**
   * Delete a chamado with id.
   * DELETE chamados/:id
   */

  async destroy({ params, auth }) {
    const chamado = await Chamado.findOrFail(params.id);

    if (chamado.user_id !== auth.user.id) {
      return response.status(401);
    }

    await chamado.delete();
  }
}

module.exports = ChamadoController
