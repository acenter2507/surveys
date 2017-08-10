(function () {
  'use strict';

  angular
    .module('surveys')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('surveys', {
        abstract: true,
        url: '/surveys',
        template: '<ui-view/>',
        ncyBreadcrumb: {
          label: 'アンケート管理'
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('surveys.list', {
        url: '',
        templateUrl: 'modules/surveys/client/views/list-surveys.client.view.html',
        controller: 'SurveysListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: 'アンケート一覧'
        },
        data: {
          pageTitle: 'Surveys List'
        }
      })
      .state('surveys.create', {
        url: '/create',
        templateUrl: 'modules/surveys/client/views/form-survey.client.view.html',
        controller: 'SurveysController',
        controllerAs: 'vm',
        resolve: {
          surveyResolve: newSurvey
        },
        ncyBreadcrumb: {
          label: 'アンケート作成'
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Surveys Create'
        }
      })
      .state('surveys.edit', {
        url: '/:surveyId/edit',
        templateUrl: 'modules/surveys/client/views/form-survey.client.view.html',
        controller: 'SurveysController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: 'アンケート編集'
        },
        resolve: {
          surveyResolve: getSurvey
        },
        data: {
          pageTitle: 'Edit Survey {{ surveyResolve.name }}'
        }
      })
      .state('surveys.view', {
        url: '/:surveyId',
        templateUrl: 'modules/surveys/client/views/view-survey.client.view.html',
        controller: 'SurveysController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: 'アンケート詳細'
        },
        resolve: {
          surveyResolve: getSurvey
        },
        data: {
          pageTitle: 'Survey {{ surveyResolve.name }}'
        }
      });
  }

  getSurvey.$inject = ['$stateParams', 'SurveysService'];

  function getSurvey($stateParams, SurveysService) {
    return SurveysService.get({
      surveyId: $stateParams.surveyId
    }).$promise;
  }

  newSurvey.$inject = ['SurveysService'];

  function newSurvey(SurveysService) {
    return new SurveysService();
  }
}());
