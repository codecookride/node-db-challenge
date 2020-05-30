
exports.up = function(knex) {
    return (
        knex.schema
            .createTable('task', tbl => {
             
                tbl.increments();

               

                tbl.string('description', 255);
                tbl.string('notes', 255);
                tbl.boolean('complete');
            })
            .createTable('resource', tbl => {
                tbl.increments();
                
                tbl.string('name', 255).notNullable();
                tbl.string('description', 255).notNullable();
            })
      
            .createTable('project', tbl => {
                tbl.increments();

                tbl.string('name', 255).notNullable();
                tbl.string('description', 255).notNullable();
                tbl.boolean('complete');
            


                tbl.integer('task_id')
                    .unsigned()
                    .notNullable()
                   
                    .references('task.id')
                   
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
            })
           
            .createTable('project_resources', tbl => {
               
                tbl.integer('resource_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('resource')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
               
                tbl.integer('project_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('project')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');

                // tbl.foreign('project').references('project.id');

                tbl.primary(['resource_id', 'project_id']);
            })
    );
};

exports.down = function(knex) {
    return (
        knex.schema
            .dropTableIfExists('project_resources')
            .dropTableIfExists('project')
            .dropTableIfExists('resource')
            .dropTableIfExists('task')
    );
};
