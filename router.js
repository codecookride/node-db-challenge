const express = require('express');
 const db= require('./projectsDb');

const router = express.Router();



router.post('/', (req, res) => {
  db.insert(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(error => {
     
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project',
      });
    });
});

router.post('/resource', (req, res) => {
    db.insertResource(req.body)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(error => {
       
        console.log(error);
        res.status(500).json({
          message: 'Error adding the project',
        });
      });
  });

router.post('/:id/task', (req, res) => {
    db.insertTask(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the task',
      });
    });
});

router.get('/', (req, res) => {
  
    db.get(req.query)
    .then(d => {
      res.status(200).json(d);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
  });

  router.get('/resource', (req, res) => {
  
    db.getResource(req.query)
    .then(d => {
      res.status(200).json(d);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
  });

router.get('/:id', (req, res) => {
  res.json(req.user);
  db.getById(req.params.id)
    .then(task => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'task not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the task',
      });
    });
});

router.get('/:id/task', (req, res) => {
  db.getById(req.params.id)
  .then(comment => {
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'message not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the message',
    });
  });
});

// router.delete('/:id', (req, res) => {
//   db.remove(req.params.id)
//   .then(count => {
//     if (count > 0) {
//       res.status(200).json({ message: 'The task has been removed' });
//     } else {
//       res.status(404).json({ message: 'The task could not be found' });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error removing the task',
//     });
//   });});

// router.put('/:id', (req, res) => {
//   const changes = req.body;
//   db.update(req.params.id, changes)
//   .then(task => {
//     if (task) {
//       res.status(200).json(task);
//     } else {
//       res.status(404).json({ message: 'The task could not be found' });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error updating the task',
//     });
//   });});





module.exports = router;
