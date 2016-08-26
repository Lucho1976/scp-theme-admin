(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemNavConfig)
    ;

  /**
   * @ngInject
   */
  function SystemNavConfig(NavProvider) {
    NavProvider.group('system', {
      translate: "nav.SYSTEM",
      sref: "app.system.setting",
      icon: "fa fa-wrench",
    }).item({
      text: "Settings",
      sref: "app.system.setting",
    }).item({
      text: "Emails",
      sref: "app.system.email",
    }).item({
      text: "Logs",
      sref: "app.system.log",
    });
  }
})();
