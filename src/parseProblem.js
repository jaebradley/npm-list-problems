// These error message formats are defined in ls.js
// https://github.com/npm/npm/blob/latest/lib/ls.js#L175-L269

import errorTypes from './errorTypes';
import {
  extraneousDependencyExpression,
  missingDependencyExpression,
  peerDependencyMissingExpression,
  peerDependecyNotMetExpression,
  invalidDependencyExpression,
  dependencyErrorExpression,
} from './problemMessageExpressions';

const parseProblem = (problem) => {
  if (problem.match(extraneousDependencyExpression)) {
    const match = problem.match(extraneousDependencyExpression);
    return {
      package: match[1],
      version: match[2],
      path: match[3],
      type: errorTypes.extraneousDependency,
    };
  }

  if (problem.match(missingDependencyExpression)) {
    const match = problem.match(missingDependencyExpression);
    return {
      package: match[1],
      version: match[2],
      requiredBy: {
        package: match[3],
        version: match[4],
      },
      type: errorTypes.missingDependency,
    };
  }

  if (problem.match(peerDependencyMissingExpression)) {
    const match = problem.match(peerDependencyMissingExpression);
    return {
      package: match[1],
      version: match[2],
      requiredBy: {
        package: match[3],
        version: match[4],
      },
      type: errorTypes.missingPeerDependency,
    };
  }

  if (problem.match(peerDependecyNotMetExpression)) {
    const match = problem.match(peerDependecyNotMetExpression);
    return {
      package: match[1],
      version: match[2],
      path: match[3],
      type: errorTypes.unmetPeerDependency,
    };
  }

  if (problem.match(invalidDependencyExpression)) {
    const match = problem.match(invalidDependencyExpression);
    return {
      package: match[1],
      version: match[2],
      path: match[3],
      type: errorTypes.invalidDependency,
    };
  }

  if (problem.match(dependencyErrorExpression)) {
    const match = problem.match(dependencyErrorExpression);
    return {
      path: match[1],
      message: match[2],
      type: errorTypes.dependencyError,
    };
  }

  throw new Error(`Unable to parse problem: ${problem}`);
};

export default parseProblem;
