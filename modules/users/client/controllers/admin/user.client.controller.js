'use strict';
angular.module('users.admin')
  .controller('UserController', UserController);

UserController.$inject = ['$scope', '$state', 'Authentication', 'userResolve', 'ngDialog', 'toastr'];

function UserController($scope, $state, Authentication, userResolve, dialog, toast) {
  $scope.owner = Authentication.user;
  $scope.user = userResolve;

  $scope.remove = function () {
    if ($scope.owner._id === $scope.user._id) {
      toast.error("自分のアカウントを削除できません。", 'Error!');
    }
    $scope.message_title = 'アカウント削除!';
    $scope.message_content = $scope.user.displayName + 'さんのアカウントを削除しますか？';
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
      $scope.user.$remove(function () {
        $state.go('admin.users');
      });
    }
  };

  $scope.save = function (isValid) {
    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'userForm');
      return false;
    }
    var user = $scope.user;
    if (user._id) {
      user.$update(res => {
        $state.go('admin.user', {
          userId: res._id
        });
      }, err => {
        $scope.error = err.data.message;
      });
    } else {
      user.$save(res => {
        $state.go('admin.user', {
          userId: res._id
        });
      }, err => {
        $scope.error = err.data.message;
      });
    }
  };
}