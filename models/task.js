const {v4: uuidv4} = require('uuid');

class Task {
  // Properties 
  id = '';
  desc = '';
  completedAt = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completedAt = null;
  }
}

module.exports = Task