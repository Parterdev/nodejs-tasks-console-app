require('colors');

// const { showMenu, pause } = require('./helpers/messages');
const { inquirerMenu,
  pauseMenu,
  readInput,
  showTasksListToDelete,
  confirmTaskDeleting,
  showTasksCheckListToComplete,
} = require('./helpers/inquirer');
// const { pause } = require('./helpers/messages');
const { saveData, readData } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');


const main = async () => {
  let opt = '';

  const tasks = new Tasks();
  const tasksDB = readData();

  if (tasksDB) {
    // Defines tasks with the form => _list: Task {id:x, desc: xXx, completedAt: YYYY-MM-D} 
    tasks.chargeTasksFromArray(tasksDB); // tasksDB = object type
  }

  do {
    opt = await inquirerMenu();
    // console.log({opt});

    switch (opt) {
      case '1':
        // Create option  
        const desc = await readInput('Type the description:');
        tasks.createTask(desc);
        console.log(desc);
        break;
      case '2':
        tasks.completedTaskList();
        break;
      case '3':
        tasks.showCompletedPendingTasks(true);
        break;
      case '4':
        tasks.showCompletedPendingTasks(false);
        break;
      case '5':
        const ids = await showTasksCheckListToComplete(tasks.fullListArray);
        tasks.toggleCompletedPendingTasks(ids);
        // console.log(typeof(ids));
        break;
      case '6':
        const id = await showTasksListToDelete(tasks.fullListArray);
        if (id !== '0') {
          // Prompt secure question to delete a task
          const confirmDelete = await confirmTaskDeleting('¿Are you sure?');
          if (confirmDelete) {
            tasks.deleleteTask(id);
            console.log(`¡The tag with id: ` + `${id}`.green + ` has been deleted!`)
          }
        }
        break;
    }

    saveData(tasks.fullListArray);

    opt != '0' ? await pauseMenu() : '';
  } while (opt != '0');

}

main();