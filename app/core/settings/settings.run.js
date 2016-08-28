(function () {
  'use strict';

  angular
    .module('app.core.settings')
    .run(SettingsRun);

  SettingsRun.$inject = ['$rootScope', '$localStorage'];

  function SettingsRun($rootScope, $localStorage) {
    return (new Settings($rootScope, $localStorage)).init();
  }

  function Settings($rootScope, $localStorage) {
    this.init = function () {
      this.setupGlobals();
      this.setupLayout();
      this.restoreLayoutFromStorage();
    };

    this.restoreLayoutFromStorage = function () {
      if (angular.isDefined($localStorage.layout))
        $rootScope.app.layout = $localStorage.layout;
      else
        $localStorage.layout = $rootScope.app.layout;

      $rootScope.$watch('app.layout', function () {
        $localStorage.layout = $rootScope.app.layout;
      }, true);
    };

    /**
     * Close submenu when nav change from collapsed to normal
     */
    this.watchCollapse = function () {
      $rootScope.$watch('app.layout.nav.isCollapsed', function (newValue) {
        if (newValue === false)
          $rootScope.$broadcast('closeNavMenu');
      });
    };

    this.setupGlobals = function () {
      $rootScope.app = {
        name: 'Synergy Control Panel',
        description: 'Datacenter Automation',
        year: this.getYear(),
        layout: {
          isFixed: true,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false,
          nav: {
            position: 'left',
            isCollapsed: false,
          },
        },
        useFullLayout: false,
        hiddenFooter: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp',
      };
    };

    this.setupLayout = function () {
      this.watchCollapse();
    };

    this.getYear = function () {
      return (new Date()).getFullYear();
    };
  }

})();
