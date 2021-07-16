exports.up = function(knex) {

    return knex.schema
      .createTable("projects", function(projects) {
        projects.increments("project_id")
          projects.string("project_name").notNullable()
          projects.string("project_description")
          projects.boolean("project_completed")
      })

      .createTable("resources", (resources) => {
        resources.increments("resource_id")
          resources.string("resource_name").notNullable()
          resources.string("resource_description")
            })

      .createTable("tasks", (tasks) => {
          tasks.increments("task_id")
            tasks.string("task_description").notNullable()
            tasks.string("task_notes")
            tasks.integer("task_completed").defaultTo(0)
            tasks.integer("project_id")
            .unsigned()
            .references('project_id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
      })
      .createTable("project_resources", (table)=> {
        table
            .integer("task_id")
            .references("id")
            .inTable("task")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
            .notNull()
  
        table
            .integer("project_id")
            .references("id")
            .inTable("project")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
            .notNull()

        table 
            .integer("resource_id")
            .references("id")
            .inTable("resource")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
            .notNull()
          
        table.primary(["task_id", "project_id"])
  
  
    })
  

  }

  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("resources")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    
  };
