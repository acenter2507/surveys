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
    $scope.buildPager();
  });

  $scope.buildPager = function () {
    $scope.pagedItems = [];
    $scope.itemsPerPage = 15;
    $scope.currentPage = 1;
    $scope.figureOutItemsToDisplay();
    $scope.busy = false;
  };

  $scope.figureOutItemsToDisplay = function () {
    $scope.filteredItems = $filter('filter')($scope.users, {
      $: $scope.filter.search
    });
    $scope.filterLength = $scope.filteredItems.length;
    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    var end = begin + $scope.itemsPerPage;
    $scope.pagedItems = $scope.filteredItems.slice(begin, end);
  };

  $scope.pageChanged = function () {
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