// Problem messages are defined at
// https://github.com/npm/npm/blob/75b462c19ea16ef0d7f943f94ff4d255695a5c0d/lib/ls.js#L175-L269
// TODO @jaebradley: make this API more robust by removing dependency on Regex

const extraneousDependencyExpression = /^extraneous: (.+)@(.+) (.+)/;
const missingDependencyExpression = /^missing: (.+)@(.+), required by (.+)@(.+)/;
const peerDependencyMissingExpression = /^peer dep missing: (.+)@(.+), required by (.+)@(.+)/;
const peerDependecyNotMetExpression = /^peer dep not met: (.+)@(.+) (.+)/;
const invalidDependencyExpression = /^invalid: (.+)@(.+) (.+)/;
const dependencyErrorExpression = /^error in ([^:]+): (.+)/;

export {
  extraneousDependencyExpression,
  missingDependencyExpression,
  peerDependencyMissingExpression,
  peerDependecyNotMetExpression,
  invalidDependencyExpression,
  dependencyErrorExpression,
};
