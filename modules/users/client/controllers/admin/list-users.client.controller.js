'use strict';

angular.module('users.admin')
  .controller('UserListController', UserListController);

UserListController.$inject = ['$scope', '$state', 'Authentication', '$filter', 'AdminUserService', 'ngDialog', 'toastr'];

function UserListController($scope, $state, Authentication, $filter, AdminUserService, dialog, toast) {
  $scope.owner = Authentication.user;
  $scope.busy = true;
  $scope.filter = {};

  AdminUserService.query(function (data) {
    $scope.users = data;
    $scope.busy = false;
    $scope.buildPager();
  });

  $scope.buildPager = function () {
    $scope.pagedItems = [];
    $scope.itemsPerPage = 15;
    $scope.currentPage = 1;
    $scope.filter = {};
    $scope.figureOutItemsToDisplay();
  };

  $scope.figureOutItemsToDisplay = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    $scope.filteredItems = $filter('users_filter')($scope.users, $scope.filter);
    $scope.filterLength = $scope.filteredItems.length;
    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    var end = begin + $scope.itemsPerPage;
    $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    $scope.busy = false;
  };

  $scope.pageChanged = function () {
    $scope.figureOutItemsToDisplay();
  };

  $scope.clear_filter = function () {
    $scope.filter = {};
    $scope.figureOutItemsToDisplay();
  };

  $scope.remove = function (user) {
    if ($scope.owner._id === user._id) {
      toast.error('自分のアカウントを削除できません。', 'エラー！');
      return false;
    }
    $scope.message_title = 'アカウント削除!';
    $scope.message_content = user.displayName + 'さんのアカウントを削除しますか？';
    $scope.dialog_type = 3;
    $scope.buton_label = '削除';
    dialog.openConfirm({
      scope: $scope,
      templateUrl: 'modules/core/client/views/templates/confirm-dialog.client.template.html'
    }).then(confirm => {
      handle_delete();
    }, reject => {
    });
    function handle_delete() {
      user.$remove();
      $scope.users = _.without($scope.users, user);
      $scope.figureOutItemsToDisplay();
    }
  };
}