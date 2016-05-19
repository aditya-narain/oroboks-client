'use strict';

(function() {

class MainController {

  constructor($http, $user) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });

    $user.get()
     .then(function (user) {
       console.log('The current user is', user);
     })
     .catch(function (error) {
       console.log('Error getting user', error);
     });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('oroboksApp')
  .controller('MainController', MainController);

})();
