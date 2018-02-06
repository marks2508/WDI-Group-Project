angular
  .module('roadTrippers')
  .config(FileStack);

FileStack.$inject = ['filepickerProvider'];
function FileStack(filepickerProvider) {
  filepickerProvider.setKey('A3iN56y2jRtiB69brOEVtz');
}
