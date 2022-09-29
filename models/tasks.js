/**
 * _list: { 'e0f66b1e-5bad-401d-874f-6dd4d796e343': Task {id:x, desc: xXx, completedAt: YYYY-MM-D} }
 */

const capitalizeWord = require("../helpers/capitalize");
const Task = require("./task");
require("colors");

class Tasks {
  _list = {};

  constructor() {
    this._list = {}
  }

  get fullListArray() {
    const fullList = [];
    Object.keys(this._list).forEach(key => {
      const task = this._list[key];
      fullList.push(task);
    });

    return fullList;
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  deleleteTask(id = '') {
    if(this._list[id]) {
      delete this._list[id];
    }
  }

  chargeTasksFromArray(tasks = []) {
    // Extract task id and return base form object
    return tasks.forEach(task => {
      this._list[task.id] = task;
    });
  }

  completedTaskList() {
    // Customize the ouput with the fullListArray 
    const array = this.fullListArray;

    for (let i = 0; i < array.length; i++) {
      const element = array[i]; 
      console.log(this.printCapitalizeWord(i+1, element.desc, element.completedAt));
    }
  }

  printCapitalizeWord(number, word, status) {
    const completedAt = status != null ? `Completed`.green : `Pending`.red;
    const finalWord = `${number}.- `.white + capitalizeWord(word) + ` :: `.white + completedAt;
    return finalWord;
  }

  showCompletedPendingTasks(completed = true) {
    const array = this.fullListArray;
    const arrayNotCompleted = array.filter(task => task.completedAt == null);
    const arrayCompleted = array.filter(task => task.completedAt != null);

    if (completed) {
      return arrayCompleted.forEach((task, index) => {
        console.log(this.printCapitalizeWord(index+1, task.desc, task.completedAt));
      });
    }
    return arrayNotCompleted.forEach((task, index) => {
      console.log(this.printCapitalizeWord(index+1, task.desc, task.completedAt));
    });
  }

  toggleCompletedPendingTasks(ids = []) {
    ids.forEach(id => {
      const task = this._list[id]; // Direct to the object property
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    // To clean (pass null :: pending) tasks without match id
    this.fullListArray.forEach(task => {
      if(!ids.includes(task.id)) {
        /** Not direct assignment
        const task = this._list[id];
        task.completedAt = null; */
        this._list[task.id].completedAt = null; // Direct assigment
      }
    });
  }
}

module.exports = Tasks;