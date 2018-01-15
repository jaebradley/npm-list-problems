import { npmLoad, npmList } from './npmManager';

const getProblems = (directory = null) => {
  if (directory) {
    process.chdir(directory);
  }
  return npmLoad().then(() => npmList());
};

export default getProblems;
