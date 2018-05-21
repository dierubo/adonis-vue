'use strict'

const Schema = use('Schema')

class SeatSchema extends Schema {
  up () {
    this.create('seats', (table) => {
      table.increments()
      table.integer('seat_row').comment('número de la fila para esa sala')
      table.integer('seat_number').comment('número del asiento para esa fila y sala')
      table.enum('seat_state', ['AVAILABLE', 'BOOKED']).defaultTo('AVAILABLE') // Las dos únicas opciones que van a valer son AVAILABLE o BOOKED
      table.integer('booking_id').nullable().unsigned()
      table.foreign('booking_id').references('bookings.id')
    })
  }

  down () {
    this.drop('seats')
  }
}

module.exports = SeatSchema
