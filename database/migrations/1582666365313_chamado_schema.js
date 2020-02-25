'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChamadoSchema extends Schema {
  up () {
    this.create('chamados', (table) => {
      table.increments()
      table
        .integer("user_id")
        .unsigned() //Valor não pode ser abaixo de 0
        .notNullable() //Todo chamado tem que ter um usuario
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string('content', 400).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('chamados')
  }
}

module.exports = ChamadoSchema