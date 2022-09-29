require('colors');

const showMenu = () => {

  return new Promise(resolve => {
    console.clear();
    console.log('====================');
    console.log('  CHOOSE AN OPTION  ');
    console.log('====================\n');

    console.log(`1. Create task`);
    console.log(`2. List taks`);
    console.log(`3. List completed taks`);
    console.log(`4. List pendings taks`);
    console.log(`5. Complete tasks`);
    console.log(`6. Delete task`);
    console.log(`0. Exit\n`);

    const readline = require('readline').createInterface({
      input: process.stdin, output: process.stdout
    });

    readline.question('Choose your option: ', (answer) => {
      // console.log(answer);
      resolve(answer);
      readline.close();
    });
  });

}

// To recreate menu options (different to zero)
const pause = () => {
  return new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin, output: process.stdout
    });
  
    readline.question(`Press ${'ENTER'.yellow} to continue...`, (answer) => {
      resolve(answer);
      readline.close();
    });
  })
}


module.exports = {
  showMenu,
  pause
}