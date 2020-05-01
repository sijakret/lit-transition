// require all modules ending in "_test" from the
// current directory and all subdirectories
const testsContext = require.context('./css', true, /.test.ts$/);
testsContext.keys().forEach(testsContext);