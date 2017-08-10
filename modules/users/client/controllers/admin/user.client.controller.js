'use strict';
angular.module('users.admin')
  .controller('UserController', UserController);

UserController.$inject = ['$scope', '$state', '$stateParams', 'Authentication', 'userResolve', 'ngDialog', 'toastr', 'AdminUserApi'];

function UserController($scope, $state, $stateParams, Authentication, userResolve, dialog, toast, AdminUserApi) {
  $scope.owner = Authentication.user;
  $scope.user = userResolve;
  if ($scope.user._id) {
    $scope.user.createdMM = moment($scope.user.created);
    $scope.user.role = (_.contains($scope.user.roles, 'admin')) ? '管理者' : '一般ユーザー';
    $scope.user.isAdmin = _.contains($scope.user.roles, 'admin');
    $scope.user.isUser = !_.contains($scope.user.roles, 'admin');
  }
  $scope.newPassword = '';

  $scope.remove = function () {
    if ($scope.owner._id === $scope.user._id) {
      toast.error('自分のアカウントを削除できません。', 'エラー！');
      return false;
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
  // Reset password
  $scope.update_pass = isValid => {
    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'userForm');
      return false;
    }
    AdminUserApi.reset_pass($scope.user._id, $scope.newPassword)
      .then(() => {
        toast.success('パスワードを変換できました', '成功！');
      })
      .catch(err => {
        toast.error(err.message, 'エラー！');
      });
  };
}