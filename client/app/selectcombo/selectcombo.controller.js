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

  $scope.autocomplete = OROServices.getFormattedAddr(); // get current address  - (basically this done to make sure when we refresh the data stays there)
  $scope.o_combos = OROServices.getCombos(); // get combos of the currently searched address
  $scope.o_combolist = $scope.o_combos.data.combos; // Will be used to populate combo list in tabs
  console.log($scope.o_combolist); // Testing if combos exist

  // Making an object here for cuisines
  var obj = {};
  angular.forEach($scope.o_combolist, function (value, key) {
         var s = key.toString();
         obj[s] = false;
  });
  $scope.cuisine_buttons = obj; // created cuisine button object

  if (OROServices.getCuisineObject() != null) {
      $scope.cuisine_buttons = OROServices.getCuisineObject();
  };

  // Initializing cuisine buttons to display
  $scope.initCuisines = function() {
    angular.element(document.getElementById('sc-div-cuisine-buttons')).html(""); // reseting html after the place is searched again
    angular.forEach($scope.cuisine_buttons, function (value, key) {
       var s = key.toString();
       var buttonBGColor = 'button_bg_color_' + s;
       var buttonColor = 'button_color_' + s;
       var borderStyle = 'border_style_' + s;
       var marginTop = 'margin_top_' + s;
       var cuisineStyle = 'cuisine_style'+ s;

        if (value) {
          $scope[buttonBGColor] = '#FF7F50';
          $scope[buttonColor] = 'white';
          $scope[borderStyle] = 'none';
          $scope[marginTop] = '8px';
        }
        else {
          $scope[buttonBGColor] = 'white';
          $scope[buttonColor] = 'black';
          $scope[borderStyle] = 'solid';
          $scope[marginTop] = '6px';
        };

       $scope[cuisineStyle] = {
          "background": $scope[buttonBGColor],
          "color": $scope[buttonColor],
          "outline":"none", 
          "margin-top": $scope[marginTop],
          "border-radius": "0px",
          "border-style": $scope[borderStyle],
          "font-family": "'Roboto', sans-serif",
          "font-weight": "400"
        }

        // Crating the button html for display, assigning each button a particular sytle metioned above and also giving each of them
        // unique id's - this will help us to change button color based on their ids(check out toggleCuisineButton function for this)
        var htmlcontent = $compile('<div class="btn btn-primary" id="'+s+'" ng-model="cuisine_buttons.'+s+'" uib-btn-checkbox ng-style="cuisine_style'+s+'" ng-click="toggleCuisineButton($event)">'+s+'</div><br/>')($scope);
        angular.element(document.getElementById('sc-div-cuisine-buttons')).append(htmlcontent);
    });

    //Set the order summary here incase of refresh or coming back to page after going back to previous page
    var arr = OROServices.getItemsToAddInOrderSummary();
    if(arr.length != 0) {
      $scope.o_ordersummarylist = arr;
    }
  }

  // Toggling behavior for cuisine button - changing button color behavior
  $scope.toggleCuisineButton = function(obj) {
    var divId = obj.target.attributes.id.value;
    var divIdString = divId.toString();

    var buttonBGColor = 'button_bg_color_' + divIdString;
    var buttonColor = 'button_color_' + divIdString;
    var borderStyle = 'border_style_' + divIdString;
    var marginTop = 'margin_top_' + divIdString;
    var cuisineStyle = 'cuisine_style'+ divIdString;

    if($scope[buttonBGColor] == 'white')
    { 
      $scope[buttonBGColor] = '#FF7F50';
      $scope[buttonColor] = 'white';
      $scope[borderStyle] = 'none';
      $scope[marginTop] = '8px';
    }
    else if($scope[buttonBGColor] == '#FF7F50')
    {
      $scope[buttonBGColor] = 'white';
      $scope[buttonColor] = 'black';
      $scope[borderStyle] = 'solid';
      $scope[marginTop] = '6px';
    }

    $scope[cuisineStyle] = {
      "background": $scope[buttonBGColor],
      "color": $scope[buttonColor],
      "outline":"none", 
      "margin-top":$scope[marginTop],
      "border-radius": "0px",
      "border-style": $scope[borderStyle],
      "font-family": "'Roboto', sans-serif",
      "font-weight": "400"
    }

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
    returnValue = (count==cuisineLength)?true:$scope.cuisine_buttons[cuisineobjkey];
    return returnValue;
  };

  // Getting combo data
  $scope.getCombosDataSC = function(lat, lng, faddr) {
    OROServices.removeItem('s_cuisineobject'); // remove cuisine object local storage when new address is searched from here
    OROServices.removeItem('s_itemstoadd');
    $scope.lat = lat;
    $scope.lng = lng;

    // Call the restaurant service service
    var req = {
      method:'GET',
      url:OROServicesUrl.getCombosDataURL(),
      params:{
        latitude:lat,
        longitude:lng
      }
    }

    $http(req).then(function successCallback(response) {
      // Call ORO Services
      OROServices.setCombos(response);
      OROServices.setFormattedAddr(faddr);

      setTimeout(function () {
          $scope.o_combolist = response.data.combos;
          var obj = {};
          angular.forEach($scope.o_combolist, function (value, key) {
                 var s = key.toString();
                 obj[s] = false;
          });
          $scope.cuisine_buttons = obj;
          $scope.o_ordersummarylist = {};
          $scope.initCuisines();
      }, 1000);

      console.log(response);
      console.log("SelectcomboCtrl: Success");
    }, function errorCallback(response) {
      console.log("SelectcomboCtrl: Failure");
    });
  };

  // Getting the current to next 6 days
  var oDates = {};
  for (var i = 0; i < 7; i++) {
    $scope.o_date = new Date();
    $scope.o_date.setDate($scope.o_date.getDate() + i);
    oDates[i] = $scope.o_date;
  };
  $scope.o_dates = oDates;

  // Receiving message from orodirective in order to add element into order summary
  $scope.$on('AddingComboToOrderSummary', function (event, data) {
    var arr = OROServices.getItemsToAddInOrderSummary();

    // Check if data is present in array -  this is to maintain uniqueness of the array so that we don't add duplicates into the array
    var idDataPresent = arr.find( function( ele ) { 
      if( ele.name && ele.name === data.name ) {
        return true;
      }
      return false;
    });

    if( !idDataPresent ) { // if not present
      arr.push(data);
      OROServices.setItemsToAddInOrderSummary(arr);
      $scope.o_ordersummarylist = arr;
    }
  });

  // Receiving message from orodirective in order to open modal pop up with the combo details - basicall view the details of combo
  $scope.$on('OpenComboModal', function (event, data) {
    $scope.o_comboviewdetail = data;
  });
   
}).filter('filterByDates', function () { // Filters - Filter by Date
  return function (items, datearg) {
    var s = datearg.toString();

    var filteredCuisineObj = [];
    var dateMatch = new RegExp(s.substring(0,3));
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var oAvailableDates = items[i].availaibleDates;

      for (var j = 0; j < oAvailableDates.length; j++) {
        if(dateMatch.test(oAvailableDates[j].substring(12,15))){
            filteredCuisineObj.push(item);
        }
      }
    }
    return filteredCuisineObj;
  };
});














