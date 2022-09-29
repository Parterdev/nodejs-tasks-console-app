const fs = require('fs');
const file = './db/data.json';

const saveData = (data) => {
  fs.writeFileSync(file, JSON.stringify(data))
}

const readData = () => {
  if(!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, {encoding: 'utf-8'});
  // Deserialize the file (string to base form object)
  const data = JSON.parse(info);
  // console.log(typeof(info));

  return data;
}

module.exports = {
  saveData,
  readData,
}