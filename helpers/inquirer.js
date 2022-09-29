const inquirer = require('inquirer');
const capitalizeWord = require("./capitalize");
// import inquirer from 'inquirer';
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿What do you want?',
    choices: [
      {
        name: `${'1.'.white} Create task`,
        value: '1',
      },
      {
        name: `${'2.'.white} List tasks`,
        value: '2',
      },
      {
        name: `${'3.'.white} List completed tasks`,
        value: '3',
      },
      {
        name: `${'4.'.white} List pendings tasks`,
        value: '4',
      },
      {
        name: `${'5.'.white} Complete tasks`,
        value: '5'
      },
      {
        name: `${'6.'.white} Delete task`,
        value: '6'
      },
      {
        name: `${'0.'.red} Exit\n`,
        value: '0'
      }
    ]
  }
];

const inquirerMenu = async () => {
  console.log('====================');
  console.log('  CHOOSE AN OPTION  ');
  console.log('====================\n');

  const { option }  = await inquirer.prompt(questions)
  console.log('========================================');
  return option;
}

const pauseMenu = async () => {
  const questions = [
    {
      type: 'input',
      name: 'output',
      message: `Press ${'ENTER'.yellow} to continue...`,
    }
  ];
  console.log('\n');
  await inquirer.prompt(questions);
  
}

// To create dynamic inquirer prompt
const readInput = async(message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please, enter a value';
        }
        return true;
      }
    }
  ];
  const {desc} = await inquirer.prompt(question);
  return desc;
}

// To show dynamic list for deleting tasks
const showTasksListToDelete = async(tasks = []) => {
  const choices = tasks.map((task, index) => {
    const i = index+1;
    return {
      name: `${i}.-`.white + ` ${capitalizeWord(task.desc)}`,
      value: task.id,
    }
  });

  // To add one more option => exit
  choices.unshift({
    name: '0.-'.white + ' Cancell',
    value: '0',
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: '¿What task do you like to delete?',
      choices
    }
  ];

  const { id }  = await inquirer.prompt(questions);
  return id;

  // Estructure to choices list
  /* 
  {
        name: `${'1.'.white} Create task`,
        value: '1',
      },
  **/
  
}

// To prompt confirm deleting task
const confirmTaskDeleting = async(message = '') => {
  const question = {
    type: 'confirm',
    name: 'ok',
    message,
  };
  
  const { ok }  = await inquirer.prompt(question);
  return ok;
}

// To check tasks and mark them as a completed
const showTasksCheckListToComplete = async(tasks = []) => {
  const choices = tasks.map((task, index) => {
    const i = index+1;
    return {
      name: `${i}.-`.white + ` ${capitalizeWord(task.desc)}`,
      value: task.id,
      checked: (task.completedAt) ? true : false,
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Choose tasks to complete',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;  
}

module.exports = {
  confirmTaskDeleting,
  inquirerMenu,
  pauseMenu,
  readInput,
  showTasksCheckListToComplete,
  showTasksListToDelete,
}