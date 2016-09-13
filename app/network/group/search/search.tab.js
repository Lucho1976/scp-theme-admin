(function () {
  'use strict';

  angular
    .module('app.network.group.search')
    .factory('GroupSearchTab', GroupSearchTabFactory)
    .run(addGroupSearchTab)
    ;

  /**
   * Add the GroupSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addGroupSearchTab(Search, GroupSearchTab) {
    Search.tab.add(GroupSearchTab());
  }

  /**
   * GroupSearchTab Factory
   *
   * @ngInject
   */
  function GroupSearchTabFactory ($state, GroupList, ListFilter, RouteHelpers) {
    return function () {
        var list = GroupList();
        return new GroupSearchTab(
          list,
          $state,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function GroupSearchTab (list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = 'groups';
    tab.lang = 'group';
    tab.text = 'group.search.TITLE';
    tab.list = list;
    tab.filter = filter;
    tab.select = onSelect;
    tab.results = {
      url: RouteHelpers.basepath('network/group/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'network/group/search/search.item.html'
    );

    //////////

    function onSelect($item) {
      $state.go('app.network.group.view', {
        id: $item.id,
      });
    }


  }
})();
