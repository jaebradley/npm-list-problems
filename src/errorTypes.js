const errorTypes = Object.freeze({
  extraneousDependency: 'EXTRANEOUS_DEPENDENCY',
  missingDependency: 'MISSING_DEPENDENCY',
  missingPeerDependency: 'MISSING_PEER_DEPENDENCY',
  unmetPeerDependency: 'UNMET_PEER_DEPENDENCY',
  invalidDependency: 'INVALID_DEPENDENCY',
  dependencyError: 'DEPENDENCY_ERROR',
});

export default errorTypes;
