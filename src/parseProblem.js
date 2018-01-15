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
      error: 'EXTRANEOUS_DEPENDENCY',
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
      error: 'MISSING_DEPENDENCY',
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
      error: 'MISSING_PEER_DEPENDENCY',
    };
  }

  if (problem.match(peerDependecyNotMetExpression)) {
    const match = problem.match(peerDependecyNotMetExpression);
    return {
      package: match[1],
      version: match[2],
      path: match[3],
      error: 'UNMET_PEER_DEPENDENCY',
    };
  }

  if (problem.match(invalidDependencyExpression)) {
    const match = problem.match(invalidDependencyExpression);
    return {
      package: match[1],
      version: match[2],
      path: match[3],
      error: 'INVALID_DEPENDENCY',
    };
  }

  if (problem.match(dependencyErrorExpression)) {
    const match = problem.match(dependencyErrorExpression);
    return {
      path: match[1],
      message: match[2],
      error: 'DEPENDENCY_ERROR',
    };
  }

  throw new Error(`Unable to parse error: ${problem}`);
};

export default parseProblem;
