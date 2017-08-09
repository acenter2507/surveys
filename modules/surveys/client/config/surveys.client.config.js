(function () {
  'use strict';

  angular
    .module('surveys')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'アンケート管理',
      state: 'surveys',
      type: 'dropdown',
      roles: ['admin', 'user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'surveys', {
      title: 'アンケート一覧',
      state: 'surveys.list',
      roles: ['admin', 'user']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'surveys', {
      title: 'アンケート作成',
      state: 'surveys.create',
      roles: ['admin', 'user']
    });
  }
}());
