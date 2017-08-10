'use strict';

// Create the Storages wrapper service
angular.module('core').service('Constants', [
  function () {
    this.storages = {
      users_page: '9182387yijshdf981298',
    };
    this.defaultProfileImageURL = 'modules/users/client/img/profile/default.png';
  }
]);
