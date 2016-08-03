(function () {
  'use strict';

  angular
    .module('app.hardware')
    .factory('ServerList', ServerListFactory);

  /**
   * ServerList Factory
   *
   * @ngInject
   */
  function ServerListFactory (
    _,
    List,
    ListConfirm,
    ServerAssign,
    $stateParams
  ) {
    return function () {
      var list = List('server').filter({
        hub: $stateParams.switch,
        group: $stateParams.group,
        client: $stateParams.client,
      });
      var confirm = ListConfirm(list, 'hardware.server.modal.delete');

      list.bulk.add('Assign Client', handler(ServerAssign.client));
      list.bulk.add('Assign Group', handler(ServerAssign.group));
      list.bulk.add('Assign Switch', handler(ServerAssign.switch));
      list.bulk.add(
        'Assign Bandwidth Limit',
        handler(ServerAssign.billing.limits)
      );
      list.bulk.add(
        'Assign Billing Date',
        handler(ServerAssign.billing.date)
      );
      list.bulk.add('Suspend', handler(ServerAssign.suspend));
      list.bulk.add('Unsuspend', handler(ServerAssign.unsuspend));
      list.bulk.add('Delete', confirm.delete);

      return list;

      function handler(callback) {
        return function () {
          return callback.apply(null, arguments).then(fireChangeEvent);
        };
      }

      function fireChangeEvent(arg) {
        list.fire('change', arg);

        return arg;
      }
    };
  }
})();
