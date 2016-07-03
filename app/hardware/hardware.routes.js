(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware', {
        url: '/hardware',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:hardware'),
      })
      .state('app.hardware.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.server.inventory', {
        url: '/inventory?switch&group',
        title: 'Server Inventory',
        controller: 'ServerInventoryCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.inventory.html'),
      })
      .state('app.hardware.server.list', {
        url: '?switch&group&client',
        title: 'Servers',
        controller: 'ServerListCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.index.html'),
      })
      .state('app.hardware.server.provision', {
        url: '/provision?client',
        title: 'Provision Server',
        controller: 'ServerProvisionCtrl as vm',
        templateUrl: helper.basepath('hardware/server/provision/provision.html'),
      })
      .state('app.hardware.server.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.server.view.edit', {
        url: '/edit',
        title: 'Edit Server',
        controller: 'ServerEditCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.edit.html'),
      })
      .state('app.hardware.server.view.manage', {
        url: '',
        title: 'Manage Server',
        controller: 'ServerManageCtrl as vm',
        templateUrl: helper.basepath('hardware/server/manage/manage.html'),
      })
      .state('app.hardware.switch', {
        url: '/switch',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.switch.speed', {
        url: '/speed',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.switch.speed.list', {
        url: '',
        title: 'Switch Speeds',
        controller: 'SpeedListCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/speed.index.html'),
      })
      .state('app.hardware.switch.speed.view', {
        url: '/:id',
        title: 'View Switch Speed',
        controller: 'SpeedViewCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/speed.view.html'),
      })
      .state('app.hardware.switch.list', {
        url: '',
        title: 'Switches',
        controller: 'SwitchListCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/switch.index.html'),
      })
      .state('app.hardware.switch.view', {
        url: '/:id',
        title: 'View Switch',
        controller: 'SwitchViewCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/switch.view.html'),
      })
      .state('app.hardware.part', {
        url: '/part',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.part.list', {
        url: '?tab&search',
        title: 'Part Inventory',
        controller: 'PartIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/part/part.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
