class MessagesManager {
  constructor(specificKnex, table) {
    this.knex = specificKnex;
    this.messageTable = table;
  }

  createTable = () => {
    let name = this.messageTable;
    let knex = this.knex;
    knex.schema
      .hasTable(name)
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(name, function (table) {
            table.increments("id").primary();
            table.string("name", 100).notNullable();
            table.string("message", 100).notNullable();
            table
              .datetime("timestamp", { precision: 6 })
              .defaultTo(knex.fn.now());
          });
        } else {
        }
      })
      .then(() => {})
      .catch((err) => console.log(err));
  };

  saveMessage = async (object) => {
    try {
      await this.knex(this.messageTable)
        .insert({
          name: object.name,
          message: object.message,
        })
        .then(() => console.log("Mensaje Cargado"));
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = MessagesManager;
