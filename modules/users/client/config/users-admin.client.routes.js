'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        ncyBreadcrumb: {
          label: 'アカウント一覧'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        },
        ncyBreadcrumb: {
          label: 'アカウント詳細'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/form-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        },
        ncyBreadcrumb: {
          label: 'アカウント編集'
        }
      })
      .state('admin.user-create', {
        url: '/users/create',
        templateUrl: 'modules/users/client/views/admin/form-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['Admin', function (Admin) {
            return new Admin();
          }]
        },
        ncyBreadcrumb: {
          label: 'アカウント作成'
        }
      });
  }
]);
