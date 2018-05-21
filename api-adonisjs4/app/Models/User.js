'use strict'

const Hash = use('Hash')
const Model = use('Model')
const Customer = use('App/Models/Customer')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeCreate', async (userInstance) => { // Cifra el pass antes de crear el usuario
      if (userInstance.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('afterCreate', async (userInstance) => { // Se crea un nuevo customer en base de datos al crearse un nuevo usuario. En la tabla customer sería el id y el user_id
      let customer = new Customer();
      userInstance.customer().save(customer); // customer() es la función que está definida mmás abajo
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  // Un usuario tendrá solamente un customer
  customer() { 
    return this.hasOne('App/Models/Customer')
  }
}

module.exports = User
