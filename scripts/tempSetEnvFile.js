
// expo doesn't support environment variables
// this is a hacky workaround script

const fs  = require('fs');
const path = require('path');

const envFilePath = path.resolve(__dirname, '../.env');
const envFile = fs.readFileSync(envFilePath, 'utf8');
const envObject = envFileToObject(envFile);
const newEnvVar = process.argv[2];
const newEnvVarSplit = newEnvVar.split('=');

if (newEnvVarSplit.length !== 2) {
  throw new Error(`Invalid environment variable: ${newEnvVar}`)
}

const newKey = newEnvVarSplit[0];
const newVal = newEnvVarSplit[1];

envObject[newKey] = newVal;

fs.writeFileSync(envFilePath, envObjectToFile(envObject), 'utf8');

// rewrite file to default after three seconds
setTimeout(() => {
  fs.writeFileSync(envFilePath, envFile, 'utf8');
}, 3000)

function envFileToObject(envFile) {
  return envFile
    .split('\n')
    .reduce((accObj, currLine) => {
      const [ key, val ] = currLine.split('=');

      if (!key || !val) {
        return accObj;
      }

      if (accObj[key]) {
        throw new Error(`Multiple entries found in env file for key ${key}`);
      }
      accObj[key] = val;
      return accObj;
    }, {})
}

function envObjectToFile(envObject) {
  return Object.keys(envObject)
    .map(key => `${key}=${envObject[key]}`)
    .join('\n')
}


