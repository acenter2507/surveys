'use strict';

angular
  .module('admin')
  .filter('users_filter', users_filter);

users_filter.$inject = ['$filter'];
// Setup the filter
function users_filter($filter) {
  // Create the return function and set the required parameter as well as an optional paramater
  return function (users, filter) {
    var out = [];
    out = $filter('filter')(users, {
      $: filter.search
    });
    // if (filter.status && filter.status !== '') {
    //   out.forEach(item => {
    //     if (item.status !== filter.status) {
    //       out = _.without(out, item);
    //     }
    //   });
    // }
    // if (filter.provider && filter.provider !== '') {
    //   out.forEach(item => {
    //     if (item.provider !== filter.provider) {
    //       out = _.without(out, item);
    //     }
    //   });
    // }
    if (filter.roles && filter.roles !== '') {
      if (filter.roles === 'user') {
        out.forEach(item => {
          if (item.roles.indexOf(filter.roles) < 0 || item.roles.length > 1) {
            out = _.without(out, item);
          }
        });
      } else {
        out.forEach(item => {
          if (item.roles.indexOf(filter.roles) < 0) {
            out = _.without(out, item);
          }
        });
      }
    }
    // if (moment(filter.created, 'YYYY/MM/DD', true).isValid()) {
    //   var create = moment(filter.created).format('YYYY/MM/DD');
    //   out.forEach(item => {
    //     let item_create = moment(item.created, 'YYYY/MM/DD');
    //     console.log(item_create);
    //     if (!item_create.isSame(create)) {
    //       out = _.without(out, item);
    //     }
    //   });
    // }
    if (filter.surveys && parseInt(filter.surveys)) {
      if (filter.surveys_pref === 'least') {
        out.forEach(item => {
          if (item.surveyCnt >= parseInt(filter.surveys)) {
            out = _.without(out, item);
          }
        });
      } else {
        out.forEach(item => {
          if (item.surveyCnt < parseInt(filter.surveys)) {
            out = _.without(out, item);
          }
        });
      }
    }
    if (filter.sort && filter.sort !== '') {
      out = $filter('orderBy')(out, filter.sort, false);
    }
    return out;
  };

}