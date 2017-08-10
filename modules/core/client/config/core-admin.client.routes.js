'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        ncyBreadcrumb: {
          label: 'システム管理'
        },
        data: {
          roles: ['admin']
        }
      });
  }
]);
