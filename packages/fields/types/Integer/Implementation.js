const { Implementation } = require('../../Implementation');
const { MongooseFieldAdapter } = require('@voussoir/adapter-mongoose');
const { KnexFieldAdapter } = require('@voussoir/adapter-knex');

class Integer extends Implementation {
  constructor() {
    super(...arguments);
  }

  get gqlOutputFields() {
    return [`${this.path}: Int`];
  }
  get gqlOutputFieldResolvers() {
    return { [`${this.path}`]: item => item[this.path] };
  }

  get gqlQueryInputFields() {
    return [
      ...this.equalityInputFields('Int'),
      ...this.orderingInputFields('Int'),
      ...this.inInputFields('Int'),
    ];
  }
  get gqlUpdateInputFields() {
    return [`${this.path}: Int`];
  }
  get gqlCreateInputFields() {
    return [`${this.path}: Int`];
  }
}

class MongoIntegerInterface extends MongooseFieldAdapter {
  addToMongooseSchema(schema) {
    const { mongooseOptions = {} } = this.config;
    const { isRequired } = mongooseOptions;

    const schemaOptions = {
      type: Number,
      validate: {
        validator: this.buildValidator(
          a => typeof a === 'number' && Number.isInteger(a),
          isRequired
        ),
        message: '{VALUE} is not an integer value',
      },
    };
    schema.add({ [this.path]: this.mergeSchemaOptions(schemaOptions, this.config) });
  }

  getQueryConditions() {
    return {
      ...this.equalityConditions(),
      ...this.orderingConditions(),
      ...this.inConditions(),
    };
  }
}

class KnexIntegerInterface extends KnexFieldAdapter {
  createColumn(table) {
    table.integer(this.path);
  }

  getQueryConditions(f, g) {
    return {
      ...this.equalityConditions(f, g),
      ...this.orderingConditions(f, g),
      ...this.inConditions(f, g),
    };
  }
}

module.exports = {
  Integer,
  MongoIntegerInterface,
  KnexIntegerInterface,
};
