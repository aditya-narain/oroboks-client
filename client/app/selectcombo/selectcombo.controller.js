'use strict';

/* OROboks Naming Convention:
functions name: camel case starting with small letter,
scope variables: with underscore naming - example: o_dates and all small letters,
local var: camel case starting with small letter,
controller name: Start with capital letter - camel case,
function parameters: all small letters, only service name should be camel case starting with capital letters,
service names: always start with ORO - example: OROServices
*/

angular.module('oroboksApp')
  .controller('SelectcomboCtrl', function ($scope, $http, OROServices, OROServicesUrl, $compile, $parse) {

  // Setting google api options 
  $scope.options = {
      country: 'us',
      types: ['(regions)']
  };

  $scope.autocomplete = OROServices.getFormattedAddr(); // get current address  - (this is done to make sure after refresh the data stays there)
  $scope.o_combos = OROServices.getCombos(); // get combos of the currently searched address
  $scope.o_combolist = $scope.o_combos.data.dates; // Will be used to populate combo list in tabs
  console.log($scope.o_combolist); // Testing if combos exist

  // Making an object here for cuisines
  var obj = {};
  angular.forEach($scope.o_combolist, function (value, key) {
    if(value.length != 0)
    {
      for (var i = 0; i < value.length; i++) {
        for (var j = 0; j < value[i].cuisines.length; j++) {
            var s = value[i].cuisines[j].toString();
            obj[s] = false;
        };
      };
     }
  });
  $scope.cuisine_buttons = obj; // created cuisine button object

  if (OROServices.getCuisineObject() != null) {
      $scope.cuisine_buttons = OROServices.getCuisineObject();
  };

  // Side bar toggling functionality
  angular.element(document.getElementById('menu-close')).click(function(e) {
      e.preventDefault();
      angular.element(document.getElementById('wrapper')).toggleClass("active");
  });

  angular.element(document.getElementById('menu-toggle')).click(function(e) {
      e.preventDefault();
      angular.element(document.getElementById('wrapper')).toggleClass("active");
  });

  // Initializing cuisine buttons to display
  $scope.initCuisines = function() {
    angular.element(document.getElementById('sc-div-cuisine-buttons')).html(""); // reseting html after the place is searched again
    angular.forEach($scope.cuisine_buttons, function (value, key) {
        var s = key.toString();

        // Creating the button html for display, assigning each button a particular sytle metioned above and also giving each of them
        // Unique id's - this will help us to change button color based on their ids(check out toggleCuisineButton function for this)
        var htmlcontent = $compile('<div class="checkbox checkbox-success"> <input id="'+s+'" type="checkbox" ng-model="cuisine_buttons.'+s+'" ng-click="toggleCuisineButton($event)"> <label for="'+s+'"> '+s+' </label></div>')($scope);
        angular.element(document.getElementById('sc-div-cuisine-buttons')).append(htmlcontent);
    });

    // Set the order summary here incase of refresh or coming back to page after going back to previous page
    var arr = OROServices.getItemsFromOrderSummary();
    if(arr.length != 0) {
      angular.element(document.getElementById('wrapper')).addClass("active");
      $scope.o_ordersummarylist = arr;
    }

    // Set the array summary available dates after refresing the page
    var arrsummaryavailabledates = OROServices.getSummaryAvailableDates();
    if(arrsummaryavailabledates.length != 0) {
      $scope.o_summaryavailabledates = arrsummaryavailabledates;
    }
  }

  // To get bool value to represent if the combo list is empty or not
  $scope.customComboListDivSize = function() {
    var temparr = Object.keys($scope.o_combolist);
    var sizearr = temparr.length;
    if(sizearr==0) {
      return {height:'975px'};
    }
  }

  $scope.isComboListEmpty = function() {
    var temparr;
    if ($scope.o_combolist === undefined) {
      return {height:'975px'};
    }
    else {
      temparr = $scope.o_combolist;
    }
    var sizearr = temparr.length;
    if(sizearr==0) {
      return {height:'975px'};
    }
  }

  // To get bool value to represent if the order summary is empty or not
  $scope.isOrderSummaryListEmpty = function() {
    var temparr;
    if ($scope.o_ordersummarylist === undefined) {
      return true;
    }
    else {
      temparr = $scope.o_ordersummarylist;
    }
    var sizearr = temparr.length;
    return sizearr==0;
  }

  // Toggling behavior for cuisine button - changing button color behavior
  $scope.toggleCuisineButton = function(obj) {
    // Save the latest cuisine_button object into local storage for recovery during refresh
    OROServices.setCuisineObject($scope.cuisine_buttons);
  };

  // Check if the cuisine is active or selected
  $scope.isCuisineActive = function(cuisineobjkey) {
    var returnValue = false;
   
    var cuisineObjKeys = Object.keys($scope.cuisine_buttons);
    var cuisineLength = cuisineObjKeys.length;
    var count = 0;
    angular.forEach($scope.cuisine_buttons, function (value, key) {
      if (!value) {
        count++;
      };
    });

    if (count==cuisineLength) {
      return true;
    }
    else {
       for (var i = 0; i < cuisineobjkey.length; i++) {
          if($scope.cuisine_buttons[cuisineobjkey[i]]) {
            returnValue = true;
            break;
          }  
       }
       return returnValue;
    }
  };

  // Check if the active cuisine are part of any combos or not
  $scope.isActiveCuisineAvailableAtAll = function(combolist) {
    var returnValue = true;
    var cuisineObjKeys = Object.keys($scope.cuisine_buttons);
    var cuisineLength = cuisineObjKeys.length;
    var count = 0;
    angular.forEach($scope.cuisine_buttons, function (value, key) {
      if (!value) {
        count++;
      };
    });

    if (count==cuisineLength || combolist.length == 0) {
      return false;
    }

    angular.forEach($scope.cuisine_buttons, function (value, key) {
      if (value) {
        for (var i = 0; i < combolist.length; i++) {
           for (var j = 0; j < combolist[i].cuisines.length; j++) {
             if(key == combolist[i].cuisines[j].toString()) {
                returnValue = false;;
             }
           };
        };
      }
    });

    return returnValue;
  };

  // Getting combo data
  $scope.getCombosDataSC = function(lat, lng, faddr) {
    OROServices.removeItem('s_cuisineobject'); // remove cuisine object local storage when new address is searched from here
    OROServices.removeItem('s_itemstoadd');
    $scope.lat = lat;
    $scope.lng = lng;

    var previousfAddr = OROServices.getFormattedAddr(); // HACK - fix this

    if (previousfAddr != faddr) {
      // Call the restaurant service service
      var req = {
        method:'GET',
        url:OROServicesUrl.getCombosDataURL(),
        params:{
          latitude:lat,
          longitude:lng,
          sortby:'date'
        }
      }

      $http(req).then(function successCallback(response) {
        // Call ORO Services
        OROServices.setCombos(response);
        OROServices.setFormattedAddr(faddr);

        setTimeout(function () {
            $scope.o_combolist = response.data.dates;
            var obj = {};
            angular.forEach($scope.o_combolist, function (value, key) {
            if(value.length != 0)
            {
              for (var i = 0; i < value.length; i++) {
                for (var j = 0; j < value[i].cuisines.length; j++) {
                    var s = value[i].cuisines[j].toString();
                    obj[s] = false;
                  };
                };
               }
            });
            $scope.cuisine_buttons = obj; // created cuisine button object
            $scope.o_ordersummarylist = [];
            OROServices.addInOrderSummary($scope.o_ordersummarylist);
            $scope.o_summaryavailabledates = [];
            OROServices.setSummaryAvailableDates($scope.o_summaryavailabledates);
            $scope.initCuisines();
        }, 1000);

        console.log(response);
        console.log("SelectcomboCtrl: Success");
      }, function errorCallback(response) {
        console.log("SelectcomboCtrl: Failure");
      });
    };
  };

  // Getting the current to next 6 days
  var oDates = {};
  for (var i = 2; i < 9; i++) {
    $scope.o_date = new Date();
    $scope.o_date.setDate($scope.o_date.getDate() + i);
    oDates[i] = $scope.o_date;
  };
  $scope.o_dates = oDates;

  $scope.getSystemDates = function(date) {
    var dateMatch = new RegExp(date.toString().substring(12,15));

    for (var i = 2; i < 9; i++) {
      if(dateMatch.test(oDates[i].toString().substring(0,3))) {
          return $scope.o_dates[i];
      }
    }
  };

  // Receiving message from orodirective in order to add element into order summary
  $scope.$on('AddingComboToOrderSummary', function (event, data) {
    angular.element(document.getElementById('wrapper')).addClass("active");

    var arr = OROServices.getItemsFromOrderSummary();
    
    // Check if data is present in array - if present return true and increment the elements count
    var bIsDataPresent = arr.find( function( ele ) { 
      if( ele.id && ele.id === data.id ) {
        return true;
      }
      return false;
    });

    for (var i = 0; i < arr.length; i++) {
       if (arr[i].id === data.id && arr[i].count <= 8) { // Need to show an alert box to tell user to not add more than 10 items
          arr[i].count = arr[i].count + 1;
          arr[i].tempprice = arr[i].price * arr[i].count;
          arr[i].tempprice = arr[i].tempprice.toFixed(2);
          OROServices.addInOrderSummary(arr);
          $scope.o_ordersummarylist = arr;
       }
    };

    var arrsummaryavailabledates = OROServices.getSummaryAvailableDates(); // getting array of available dates

    if(!bIsDataPresent) { // if not present
      data.count = 1;
      data.tempprice = data.price;
      arr.push(data);

      // Check if date already present - if yes then don't insert into the array
      var bIsDatePresent = arrsummaryavailabledates.find( function( ele ) { 
        if( ele && ele === data.availabledate ) {
          return true;
        }
        return false;
      });

      if (!bIsDatePresent) { // if yes then don't push new date into the array of available dates
        arrsummaryavailabledates.push(data.availabledate);
      };

      // Saving the order list here
      OROServices.addInOrderSummary(arr);
      $scope.o_ordersummarylist = arr;

      // Saving the aviable dates that are selected to order
      OROServices.setSummaryAvailableDates(arrsummaryavailabledates);
      $scope.o_summaryavailabledates = arrsummaryavailabledates;
    }
  });

  // Receiving message from orodirective in order to decrement element from order summary
  $scope.$on('DecrementingOrderSummaryCount', function (event, data) {
    var arr = OROServices.getItemsFromOrderSummary();
    var arrsummaryavailabledates = OROServices.getSummaryAvailableDates();

    // Decrement the count of the order summary element or remove completely if the count is 0
    for (var i = 0; i < arr.length; i++) {
       if (arr[i].id === data.id) {
          if (arr[i].count>1) {
            arr[i].count = arr[i].count - 1;
            arr[i].tempprice = arr[i].price * arr[i].count;
            arr[i].tempprice = arr[i].tempprice.toFixed(2);
            OROServices.addInOrderSummary(arr);
            $scope.o_ordersummarylist = arr;
          }
          else {
            arr.splice(i, 1);
            OROServices.addInOrderSummary(arr);
            $scope.o_ordersummarylist = arr;
          }
       }
    };

    // Keeping check if the order summary element for a date is empty or not - if yes then remove the date as well
    for (var i = 0; i < arrsummaryavailabledates.length; i++) {
        var bIsDate = arr.find( function( ele ) { 
          if( ele.availabledate && ele.availabledate === arrsummaryavailabledates[i] ) {
            return true;
          }
          return false;
        });

        if (!bIsDate) {
          arrsummaryavailabledates.splice(i, 1);
          OROServices.setSummaryAvailableDates(arrsummaryavailabledates);
          $scope.o_summaryavailabledates = arrsummaryavailabledates;
        };
    };
  });

  // Receiving message from orodirective in order to open modal pop up with the combo details - basicall view the details of combo
  $scope.$on('OpenComboModal', function (event, data) {
    $scope.o_comboviewdetail = data;
  });

  // Press enter to fill in full address automatically
  $scope.form = {
    type: 'geocode',
    bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
    country: 'ca',
    typesEnabled: false,
    boundsEnabled: false,
    componentEnabled: false,
    watchEnter: true
  }

  // watch form for changes
  $scope.watchForm = function () {
    return $scope.form
  };
  $scope.$watch($scope.watchForm, function () {
    $scope.checkForm()
  }, true);


  //set options from form selections
  $scope.checkForm = function() {

    $scope.options = {};

    $scope.options.watchEnter = $scope.form.watchEnter

    if ($scope.form.typesEnabled) {
      $scope.options.types = $scope.form.type
    }
    if ($scope.form.boundsEnabled) {
      var SW = new google.maps.LatLng($scope.form.bounds.SWLat, $scope.form.bounds.SWLng)
      var NE = new google.maps.LatLng($scope.form.bounds.NELat, $scope.form.bounds.NELng)
      var bounds = new google.maps.LatLngBounds(SW, NE);
      $scope.options.bounds = bounds
    }
    if ($scope.form.componentEnabled) {
      $scope.options.country = $scope.form.country
    }
  };
   
}).filter('filterByDates', function () { // Filters - Filter by Date
  return function (items, datearg) {
    var s = datearg.toString();

    var filteredCuisineObj = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if(s == item.availabledate) {
            filteredCuisineObj.push(item);
        }
    }
    return filteredCuisineObj;
  };
});














