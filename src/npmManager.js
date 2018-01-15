import npm from 'global-npm';

import parseProblem from './parseProblem';

const npmLoad = () => (
  new Promise((resolve, reject) => {
    npm.load({}, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve('loaded npm');
      }
    });
  })
);

const npmList = () => (
  new Promise((resolve, reject) => {
    npm.commands.list([], true, (error, data, lite) => {
      if (error) {
        reject(error);
      } else if (lite.problems) {
        resolve(lite.problems.map(problem => parseProblem(problem)));
      } else {
        resolve([]);
      }
    });
  })
);

export { npmLoad, npmList };
