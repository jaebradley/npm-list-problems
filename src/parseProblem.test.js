import errorTypes from './errorTypes';
import parseProblem from './parseProblem';

describe('parseProblem', () => {
  const packageName = 'chalk';
  const version = '0.5.1';
  const path = 'path';
  const message = 'message';

  it('should return extraneous dependency error', () => {
    const problem = `extraneous: ${packageName}@${version} ${path}`;
    const expected = {
      version,
      path,
      package: packageName,
      type: errorTypes.extraneousDependency,
    };
    expect(parseProblem(problem)).toEqual(expected);
  });

  it('should return missing dependency error', () => {
    const problem = `missing: ${packageName}@${version}, required by ${packageName}@${version}`;
    const expected = {
      version,
      package: packageName,
      requiredBy: {
        version,
        package: packageName,
      },
      type: errorTypes.missingDependency,
    };
    expect(parseProblem(problem)).toEqual(expected);
  });

  it('should return missing peer dependency error', () => {
    const problem = `peer dep missing: ${packageName}@${version}, required by ${packageName}@${version}`;
    const expected = {
      version,
      package: packageName,
      requiredBy: {
        version,
        package: packageName,
      },
      type: errorTypes.missingPeerDependency,
    };
    expect(parseProblem(problem)).toEqual(expected);
  });

  it('should return unmet peer dependency error', () => {
    const problem = `peer dep not met: ${packageName}@${version} ${path}`;
    const expected = {
      version,
      package: packageName,
      path,
      type: errorTypes.unmetPeerDependency,
    };
    expect(parseProblem(problem)).toEqual(expected);
  });

  it('should return invalid dependency error', () => {
    const problem = `invalid: ${packageName}@${version} ${path}`;
    const expected = {
      version,
      path,
      package: packageName,
      type: errorTypes.invalidDependency,
    };
    expect(parseProblem(problem)).toEqual(expected);
  });

  it('should return dependency error', () => {
    const problem = `error in ${path}: ${message}`;
    const expected = {
      path,
      message,
      type: errorTypes.dependencyError,
    };
    expect(parseProblem(problem)).toEqual(expected);
  });
});
