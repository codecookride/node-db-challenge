const db = require('./Data/dbConfig');

module.exports = {
  get,
  getResource,
  getById,
  getResourceById,
  getProjectById,
  getUserPosts,
  insert,
  insertResource,
  insertTask
  
};

function get() {
  return db('project');
}

function getResource() {
    return db('resource');
  }

function getById(id) {
  return db('task')
    .where({ id })
    .first();
}
function getResourceById(id) {
    return db('resource')
      .where({ id })
      .first();
  }
  function getProjectById(id) {
    return db('project')
      .where({ id })
      .first();
  }

  

function getUserPosts(userId) {
  return db('project as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId);
}

function insert(user) {
  return db('project')
    .insert(user)
    .then(ids => {
      return getProjectById(ids[0]);
    });
}

function insertResource(user) {
    return db('resource')
      .insert(user)
      .then(ids => {
        return getResourceById(ids[0]);
      });
  }

  function insertTask(user) {
    return db('task')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
// function update(id, changes) {
//   return db('project')
//     .where({ id })
//     .update(changes);
// }

// function remove(id) {
//   return db('project')
//     .where('id', id)
//     .del();
// }
