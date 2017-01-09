(function () {
  'use strict';

  angular
    .module('app.network.entity.list')
    .factory('EntityList', EntityListFactory);

  /**
   * EntityList Factory
   *
   * @ngInject
   */
  function EntityListFactory (List, ListConfirm, EntityAssign) {
    return function () {
      var list = List('entity');
      list.confirm = ListConfirm(list, 'entity.modal.delete');

      list.bulk.add('Assign IP Group', wrapChangeEvent(EntityAssign.group));
      list.bulk.add('Delete', list.confirm.delete);

      return list;

      function wrapChangeEvent(callback) {
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
