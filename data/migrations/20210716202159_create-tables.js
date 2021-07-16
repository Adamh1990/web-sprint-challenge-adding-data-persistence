exports.up = function(knex) {

    return knex.schema
      .createTable("projects", tbl => {
        tbl.increments("project_id")
          tbl.string("project_name").notNullable()
          tbl.string("project_description")
          tbl.bool("project_completed").defaultTo("false")
      })

      .createTable("resources", (tbl) => {
        tbl.increments("resource_id")
          tbl.string("resource_name").notNullable().unique()
          tbl.string("resource_description")
            })

      .createTable("tasks", (tbl) => {
          tbl.increments("task_id")
            tbl.string("task_description").notNullable()
            tbl.string("task_notes")
            tbl.bool("task_completed").defaultTo("false")
            tbl.integer("project_id")
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
      })

      .createTable("project_resources", (tbl)=> {
        tbl.int('project_id')
          .references('id')
          .inTable('project')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        tbl.int('resource_id')
          .references('id')
          .inTable('resources')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
  })
  

  }

  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("resources")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    
  };
