(function () {
  'use strict';

  angular
    .module('surveys')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Surveys',
      state: 'surveys',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'surveys', {
      title: 'List Surveys',
      state: 'surveys.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'surveys', {
      title: 'Create Survey',
      state: 'surveys.create',
      roles: ['user']
    });
  }
}());
