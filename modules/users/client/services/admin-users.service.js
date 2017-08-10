
'use strict';

angular.module('users.admin')
  .factory('AdminUserService', AdminUserService)
  .factory('AdminUserApi', AdminUserApi);

AdminUserService.$inject = ['$resource'];
function AdminUserService($resource) {
  return $resource('api/users/:userId', {
    userId: '@_id'
  }, {
      update: {
        method: 'PUT'
      }
    });
}

AdminUserApi.$inject = ['$http'];
function AdminUserApi($http) {
  this.reset_pass = (userId, pass) => {
    return $http.post('/api/users/' + userId + '/resetpass', { password: pass });
  };
  return this;
}