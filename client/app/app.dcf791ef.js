"use strict";angular.module("oroboksApp",["oroboksApp.constants","ngCookies","ngResource","ngSanitize","ui.router","stormpath","stormpath.templates","ngAutocomplete","LocalStorageModule","oroDirective","ui.bootstrap","google.places"]).config(["$urlRouterProvider","$locationProvider",function(a,b){a.otherwise("/"),b.html5Mode(!0)}]).run(["$stormpath",function(a){a.uiRouter({loginState:"login",defaultPostLoginState:"main"})}]).config(["localStorageServiceProvider",function(a){a.setPrefix("oroapp")}]),angular.module("oroboksApp.util",[]),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("profile",{url:"/profile",templateUrl:"app/profile/profile.html",controller:"ProfileCtrl",sp:{authenticate:!0}})}]),angular.module("oroboksApp").factory("OROServicesUrl",function(){var a=function(){return"https://oroboks.herokuapp.com/combos/locations"},b=function(){return"https://oroboks.herokuapp.com/users"},c=function(){return"https://oroboks.herokuapp.com/users/getToken"},d=function(){return"https://oroboks.herokuapp.com/users/currentuser/orders"};return{getCombosDataURL:a,getUsersURL:b,getUserWithTokenURL:c,getOrdersURL:d}}),angular.module("oroDirective",[]).directive("ifOroUser",function(){return{restrict:"A",link:function(a,b,c){a.$watch("o_user",function(){a.o_user?b.show():b.hide()})}}}).directive("ifNotOroUser",function(){return{restrict:"A",link:function(a,b,c){a.$watch("o_user",function(){a.o_user?b.hide():b.show()})}}}).directive("oroListElement",function(){return{restrict:"A",scope:{orolistelement:"=",orolistelementavailabledate:"="},templateUrl:"app/templates/orolisttemplate.html",controller:["$scope",function(a){a.orolistelement&&(a.orolistelement.availabledate=a.orolistelementavailabledate,console.log("Orolist: "+a.orolistelement)),a.orolistelementavailabledate&&console.log("Orolist available date: "+a.orolistelementavailabledate),a.addToOrderSummary=function(){a.$emit("AddingComboToOrderSummary",a.orolistelement)},a.openComboModal=function(){a.$emit("OpenComboModal",a.orolistelement)}}]}}).directive("oroOrderSummaryElement",function(){return{restrict:"A",scope:{oroordersummaryelement:"="},templateUrl:"app/templates/ordersummary.html",controller:["$scope",function(a){a.oroordersummaryelement&&console.log("Orolist: "+a.oroordersummaryelement),a.incrementOrderSummaryCount=function(){a.$emit("AddingComboToOrderSummary",a.oroordersummaryelement)},a.decrementOrderSummaryCount=function(){a.$emit("DecrementingOrderSummaryCount",a.oroordersummaryelement)}}]}}),angular.module("oroboksApp").controller("LoginCtrl",["$scope",function(a){}]),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginCtrl"})}]),angular.module("oroboksApp").controller("MainController",["$scope","$http","$user","OROServicesUrl","OROServices","$location",function(a,b,c,d,e,f){a.options={country:"us",types:["(regions)"]},a.getCombosData=function(c,g,h){a.lat=c,a.lng=g;var i={method:"GET",url:d.getCombosDataURL(),params:{latitude:c,longitude:g,sortby:"date"}};b(i).then(function(a){e.removeItem("s_cuisineobject"),e.removeItem("s_itemstoadd"),e.removeItem("s_summaryavailabledates"),e.removeItem("s_totalpricetopay"),e.setCombos(a),e.setFormattedAddr(h),console.log(a),console.log("MainController: Success"),f.path("/selectcombo")},function(a){console.log("MainController: Failure")})},a.form={type:"geocode",bounds:{SWLat:49,SWLng:-97,NELat:50,NELng:-96},country:"ca",typesEnabled:!1,boundsEnabled:!1,componentEnabled:!1,watchEnter:!0},a.watchForm=function(){return a.form},a.$watch(a.watchForm,function(){a.checkForm()},!0),a.checkForm=function(){if(a.options={},a.options.watchEnter=a.form.watchEnter,a.form.typesEnabled&&(a.options.types=a.form.type),a.form.boundsEnabled){var b=new google.maps.LatLng(a.form.bounds.SWLat,a.form.bounds.SWLng),c=new google.maps.LatLng(a.form.bounds.NELat,a.form.bounds.NELng),d=new google.maps.LatLngBounds(b,c);a.options.bounds=d}a.form.componentEnabled&&(a.options.country=a.form.country)}}]),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"})}]),angular.module("oroboksApp").controller("OrderdetailsCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("orderdetails",{url:"/orderdetails",templateUrl:"app/orderdetails/orderdetails.html",controller:"OrderdetailsCtrl"})}]),angular.module("oroboksApp").controller("ProfileCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("oroboksApp").factory("OROServices",["localStorageService",function(a){var b=function(b){a.set("s_combos",b)},c=function(){var b=a.get("s_combos");return b},d=function(b){a.set("s_orouser",b)},e=function(){var b=a.get("s_orouser");return b},f=function(b){a.set("s_faddress",b)},g=function(){var b=a.get("s_faddress");return b},h=function(b){a.set("s_cuisineobject",b)},i=function(){var b=a.get("s_cuisineobject");return b},j=function(b){a.set("s_summaryavailabledates",b)},k=function(){var b=a.get("s_summaryavailabledates");if(!b){var c=[];return c}return b},l=function(b){a.set("s_itemstoadd",b)},m=function(){var b=a.get("s_itemstoadd");if(!b){var c=[];return c}return b},n=function(b){a.set("s_totalpricetopay",b)},o=function(){var b=a.get("s_totalpricetopay");return b},p=function(b){a.remove(b)},q=function(){return a.clearAll()};return{setCombos:b,getCombos:c,setOROUser:d,getOROUser:e,setFormattedAddr:f,getFormattedAddr:g,setCuisineObject:h,getCuisineObject:i,setSummaryAvailableDates:j,getSummaryAvailableDates:k,addInOrderSummary:l,getItemsFromOrderSummary:m,setTotalPriceToPay:n,getTotalPriceToPay:o,removeItem:p,clearAllData:q}}]),angular.module("oroboksApp").controller("RegisterCtrl",["$scope","$rootScope","$http",function(a,b,c){b.$on("$registered",function(a,b){var d={method:"POST",url:"https://oroboks.herokuapp.com/users",data:{userId:b.username,roleName:"customer"}};c(d).then(function(a){console.log("Success")},function(a){console.log("Failure")})})}]),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("register",{url:"/register",templateUrl:"app/register/register.html",controller:"RegisterCtrl"})}]),angular.module("oroboksApp").controller("SelectcomboCtrl",["$scope","$http","OROServices","OROServicesUrl","$compile","$parse","$location",function(a,b,c,d,e,f,g){a.options={country:"us",types:["(regions)"]},a.autocomplete=c.getFormattedAddr(),a.o_combos=c.getCombos(),a.o_combolist=a.o_combos.data.dates,console.log(a.o_combolist);var h={};angular.forEach(a.o_combolist,function(a,b){if(0!=a.length)for(var c=0;c<a.length;c++)for(var d=0;d<a[c].cuisines.length;d++){var e=a[c].cuisines[d].toString();h[e]=!1}}),a.cuisine_buttons=h,null!=c.getCuisineObject()&&(a.cuisine_buttons=c.getCuisineObject()),angular.element(document.getElementById("menu-close")).click(function(a){a.preventDefault(),angular.element(document.getElementById("wrapper")).toggleClass("active")}),angular.element(document.getElementById("menu-toggle")).click(function(a){a.preventDefault(),angular.element(document.getElementById("wrapper")).toggleClass("active")}),a.initCuisines=function(){angular.element(document.getElementById("sc-div-cuisine-buttons")).html(""),angular.forEach(a.cuisine_buttons,function(b,c){var d=c.toString(),f=e('<div class="checkbox checkbox-success"> <input id="'+d+'" type="checkbox" ng-model="cuisine_buttons.'+d+'" ng-click="toggleCuisineButton($event)"> <label for="'+d+'"> '+d+" </label></div>")(a);angular.element(document.getElementById("sc-div-cuisine-buttons")).append(f)});var b=c.getItemsFromOrderSummary();0!=b.length&&(angular.element(document.getElementById("wrapper")).addClass("active"),a.o_ordersummarylist=b);var d=c.getSummaryAvailableDates();0!=d.length&&(a.o_summaryavailabledates=d);var f=c.getTotalPriceToPay();null!=f?a.o_totalpricetopay=f:a.o_totalpricetopay=null},a.customComboListDivHeight=function(b){var c=Object.keys(a.o_combolist),d=(c.length,b.length);return 5>d?{height:"700px"}:{}},a.isOrderSummaryListEmpty=function(){var b;if(void 0===a.o_ordersummarylist)return!0;b=a.o_ordersummarylist;var c=b.length;return 0==c},a.toggleCuisineButton=function(b){c.setCuisineObject(a.cuisine_buttons)},a.isCuisineActive=function(b){var c=!1,d=Object.keys(a.cuisine_buttons),e=d.length,f=0;if(angular.forEach(a.cuisine_buttons,function(a,b){a||f++}),f==e)return!0;for(var g=0;g<b.length;g++)if(a.cuisine_buttons[b[g]]){c=!0;break}return c},a.isActiveCuisineAvailableOnTheDate=function(b){var c=!0,d=Object.keys(a.cuisine_buttons),e=d.length,f=0;return angular.forEach(a.cuisine_buttons,function(a,b){a||f++}),f==e||0==b.length?!1:(angular.forEach(a.cuisine_buttons,function(a,d){if(a)for(var e=0;e<b.length;e++)for(var f=0;f<b[e].cuisines.length;f++)d==b[e].cuisines[f].toString()&&(c=!1)}),c)},a.getCombosDataSC=function(e,f,g){c.removeItem("s_cuisineobject"),c.removeItem("s_itemstoadd"),c.removeItem("s_totalpricetopay"),a.lat=e,a.lng=f;var h=c.getFormattedAddr();if(h!=g){var i={method:"GET",url:d.getCombosDataURL(),params:{latitude:e,longitude:f,sortby:"date"}};b(i).then(function(b){c.setCombos(b),c.setFormattedAddr(g),setTimeout(function(){a.o_combolist=b.data.dates;var d={};angular.forEach(a.o_combolist,function(a,b){if(0!=a.length)for(var c=0;c<a.length;c++)for(var e=0;e<a[c].cuisines.length;e++){var f=a[c].cuisines[e].toString();d[f]=!1}}),a.cuisine_buttons=d,a.o_ordersummarylist=[],c.addInOrderSummary(a.o_ordersummarylist),a.o_summaryavailabledates=[],c.setSummaryAvailableDates(a.o_summaryavailabledates),a.initCuisines()},1e3),console.log(b),console.log("SelectcomboCtrl: Success")},function(a){console.log("SelectcomboCtrl: Failure")})}},a.proceedToCheckout=function(c){a.proceedCheckoutJSONObjectArray=[];for(var e=0;e<a.o_ordersummarylist.length;e++)a.proceedCheckoutJSONObject={comboId:{uuid:a.o_ordersummarylist[e].comboId},quantity:a.o_ordersummarylist[e].count,orderDate:a.o_ordersummarylist[e].availabledate.toString().substring(0,10)},a.proceedCheckoutJSONObjectArray.push(a.proceedCheckoutJSONObject);console.log(JSON.stringify(a.proceedCheckoutJSONObjectArray));var f={method:"POST",url:d.getOrdersURL(),data:JSON.stringify(a.proceedCheckoutJSONObjectArray),headers:{"Content-Type":"text/plain"}};b(f).then(function(a){g.path("/orderdetails"),console.log("successfully saved orders")},function(a){console.log("SelectcomboCtrl: failed saving orders: "+a)})};for(var i={},j=2;9>j;j++)a.o_date=new Date,a.o_date.setDate(a.o_date.getDate()+j),i[j]=a.o_date;a.o_dates=i,a.getSystemDates=function(b){for(var c=new RegExp(b.toString().substring(12,15)),d=2;9>d;d++)if(c.test(i[d].toString().substring(0,3)))return a.o_dates[d]},a.$on("AddingComboToOrderSummary",function(b,d){angular.element(document.getElementById("wrapper")).addClass("active");for(var e=c.getItemsFromOrderSummary(),f=e.find(function(a){return!(!a.id||a.id!==d.id)}),g=0;g<e.length;g++)e[g].id===d.id&&e[g].count<=8&&(e[g].count=e[g].count+1,e[g].tempprice=e[g].price*e[g].count,e[g].tempprice=e[g].tempprice.toFixed(2),a.o_totalpricetopay=parseFloat(a.o_totalpricetopay)+parseFloat(e[g].price),c.setTotalPriceToPay(a.o_totalpricetopay),c.addInOrderSummary(e),a.o_ordersummarylist=e);var h=c.getSummaryAvailableDates();if(!f){d.count=1,d.tempprice=d.price,e.push(d),a.o_totalpricetopay?a.o_totalpricetopay+=parseFloat(d.tempprice):a.o_totalpricetopay=parseFloat(d.tempprice),c.setTotalPriceToPay(a.o_totalpricetopay);var i=h.find(function(a){return!(!a||a!==d.availabledate)});i||h.push(d.availabledate),c.addInOrderSummary(e),a.o_ordersummarylist=e,c.setSummaryAvailableDates(h),a.o_summaryavailabledates=h}}),a.$on("DecrementingOrderSummaryCount",function(b,d){for(var e=c.getItemsFromOrderSummary(),f=c.getSummaryAvailableDates(),g=0;g<e.length;g++)e[g].id===d.id&&(e[g].count>1?(e[g].count=e[g].count-1,e[g].tempprice=e[g].price*e[g].count,e[g].tempprice=e[g].tempprice.toFixed(2),a.o_totalpricetopay=parseFloat(a.o_totalpricetopay)-parseFloat(e[g].price),c.setTotalPriceToPay(a.o_totalpricetopay),c.addInOrderSummary(e),a.o_ordersummarylist=e):(a.o_totalpricetopay=parseFloat(a.o_totalpricetopay)-parseFloat(e[g].price),c.setTotalPriceToPay(a.o_totalpricetopay),e.splice(g,1),c.addInOrderSummary(e),a.o_ordersummarylist=e));for(var g=0;g<f.length;g++){var h=e.find(function(a){return!(!a.availabledate||a.availabledate!==f[g])});h||(f.splice(g,1),c.setSummaryAvailableDates(f),a.o_summaryavailabledates=f)}}),a.$on("OpenComboModal",function(b,c){a.o_comboviewdetail=c}),a.form={type:"geocode",bounds:{SWLat:49,SWLng:-97,NELat:50,NELng:-96},country:"ca",typesEnabled:!1,boundsEnabled:!1,componentEnabled:!1,watchEnter:!0},a.watchForm=function(){return a.form},a.$watch(a.watchForm,function(){a.checkForm()},!0),a.checkForm=function(){if(a.options={},a.options.watchEnter=a.form.watchEnter,a.form.typesEnabled&&(a.options.types=a.form.type),a.form.boundsEnabled){var b=new google.maps.LatLng(a.form.bounds.SWLat,a.form.bounds.SWLng),c=new google.maps.LatLng(a.form.bounds.NELat,a.form.bounds.NELng),d=new google.maps.LatLngBounds(b,c);a.options.bounds=d}a.form.componentEnabled&&(a.options.country=a.form.country)}}]).filter("filterByDates",function(){return function(a,b){for(var c=b.toString(),d=[],e=0;e<a.length;e++){var f=a[e];c==f.availabledate&&d.push(f)}return d}}),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("selectcombo",{url:"/selectcombo",templateUrl:"app/selectcombo/selectcombo.html",controller:"SelectcomboCtrl"})}]),angular.module("oroboksApp").controller("VerifyCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("oroboksApp").config(["$stateProvider",function(a){a.state("verify",{url:"/verify?sptoken",templateUrl:"app/verify/verify.html",controller:"VerifyCtrl"})}]),angular.module("oroboksApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(a,b){b.addClass("footer")}}}),angular.module("oroboksApp").controller("NavbarController",["$scope","$auth","$state","$rootScope","$http","$user","OROServicesUrl","OROServices",function(a,b,c,d,e,f,g,h){d.$on("$registered",function(a,b){var c={method:"POST",url:g.getUsersURL(),data:{userId:b.username,roleName:"customer"}};e(c).then(function(a){console.log("NavbarController: Success")},function(a){console.log("NavbarController: Failure")})}),d.$on("$authenticated",function(b,c){a.sp_orouser={firstname:c.givenName,fullname:c.fullName,username:c.username};var d={method:"POST",url:g.getUserWithTokenURL(),params:{emailId:c.email},headers:{Authorization:"Oro@AdiRuchir&20150622@19881989&skJunGy97j"}};e(d).then(function(b){console.log(b),a.o_user=b,h.setOROUser(b),angular.element("#modal-login").modal("hide")},function(a){console.log("NavbarController: User does not Exist!!")})}),f.get().then(function(b){a.sp_orouser={firstname:b.givenName,fullname:b.fullName,username:b.username},a.o_user=h.getOROUser(),console.log("NavbarController: The current user is",b)})["catch"](function(a){console.log("NavbarController: Error getting user",a)}),d.$on("$sessionEnd",function(b){a.sp_orouser=void 0,a.o_user=void 0;var c=h.clearAllData();console.log("NavbarController: "+c)})}]),angular.module("oroboksApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),function(a,b){a.module("oroboksApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular),function(){function a(a){var b={safeCb:function(a){return angular.isFunction(a)?a:angular.noop},urlParse:function(a){var b=document.createElement("a");return b.href=a,""===b.host&&(b.href=b.href),b},isSameOrigin:function(c,d){return c=b.urlParse(c),d=d&&[].concat(d)||[],d=d.map(b.urlParse),d.push(a.location),d=d.filter(function(a){return c.hostname===a.hostname&&c.port===a.port&&c.protocol===a.protocol}),d.length>=1}};return b}a.$inject=["$window"],angular.module("oroboksApp.util").factory("Util",a)}(),angular.module("oroboksApp").run(["$templateCache",function(a){a.put("app/login/login.html","<div class=container><div class=row><div class=col-xs-12><h3>Login</h3><hr></div></div><div sp-login-form></div></div>"),a.put("app/main/bannerFirst.html",'<div class=container><h1>Food Delivery Service</h1><form class=form-inline role=form ng-submit="getCombosData(details.geometry.location.lat(), details.geometry.location.lng(), details.formatted_address)"><div class=form-group><input class="form-control input-lg" id=input-address placeholder=City/Zipcode ng-autocomplete ng-model=autocomplete options=options details=details required></div><button type=submit id=button-search class="btn btn-primary btn-lg outline">Search</button></form><!-- Result: <pre>\n{{details.formatted_address}} \nand {{details.geometry.location.lat()}}</pre> --></div>'),a.put("app/main/howToOro.html","<div class=container><h1>How to ORO</h1><div class=row><div class=col-md-4><h3>Your Combos</h3><div id=hex3 class=hexagon-wrapper><span id=color1 class=hexagon><img id=id-img1 src=assets/images/sushi.39475963.png><img id=id-img2 src=assets/images/pasta.179f1469.png><img id=id-img3 src=assets/images/kebab.e4e536dd.png></span><p class=description-main>Choose you favorite combos from the list</p></div></div><div class=col-md-4><h3>Your Plan</h3><div id=hex3 class=hexagon-wrapper><span id=color2 class=hexagon><img id=id-img4 src=assets/images/planning.9db3ce13.png></span><p class=description-main>Plan your delivery dates for the week</p></div></div><div class=col-md-4><h3>Get It Delivered</h3><div id=hex3 class=hexagon-wrapper><span id=color3 class=hexagon><img id=id-img5 src=assets/images/delivery_scooter.bb61c50e.png></span><p class=description-main>Get it delivered to your doorsteps</p></div></div></div></div>"),a.put("app/main/main.html","<html><head><link rel=stylesheet href=bower_components/angular-google-places-autocomplete/src/advanced.css></head><body><div if-not-oro-user><header class=hero-unit id=banner-1 style=\"background:linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/images/background-img-food.194f8a8e.jpg')\"><div ng-include src=\"'app/main/bannerFirst.html'\"></div></header><div class=hero-unit id=banner-2><div ng-include src=\"'app/main/howToOro.html'\"></div></div><div class=hero-unit id=banner-3><div class=container><h1>Why ORO</h1></div></div><div class=hero-unit id=banner-4><div class=container><h1>About ORO</h1></div></div><div class=container><div class=row><div class=col-lg-12></div></div></div></div><div if-oro-user id=usershown><header class=hero-unit id=banner-1 style=\"background:linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/images/background-img-food.194f8a8e.jpg')\"><div ng-include src=\"'app/main/bannerFirst.html'\"></div></header><div ng-hide=false class=hero-unit id=banner-4><h1>Your Current Plan</h1></div><div class=hero-unit id=banner-3><div class=container><h1>ORO Best Picks</h1></div></div></div></body></html>"),a.put("app/orderdetails/orderdetails.html","<div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div><div>This is the orderdetails view.</div>"),a.put("app/profile/profile.html",'<div class=container><div class=row><div class=col-xs-12><h3>My Profile</h3><hr></div></div><div class=row><div class=col-xs-12><pre ng-bind="user | json"></pre></div></div></div>'),a.put("app/register/register.html",'<div class=container><div class=row><div class=col-xs-12><h3>Registration</h3><hr></div></div><!--<div sp-registration-form post-login-state="main"></div>--><div sp-registration-form template-url=app/register/spRegistrationFormCustom.html post-login-state=main></div></div>'),a.put("app/selectcombo/selectcombo.html",'<html><head><link rel=stylesheet href=bower_components/angular-google-places-autocomplete/src/autocomplete.css></head><body><div id=wrapper><div class=jumbotron id=sc-div-content data-ng-init=initCuisines()><div class=row><div class=col-sm-10 id=sc-main-container><header class=jumbotron id=sc-header-address><div class=row><div class=col-sm-5></div><div class=col-sm-5><div class=input-group><span class=input-group-btn><button class="btn btn-lg" type=submit id=sc-button-address><span class="glyphicon glyphicon-map-marker" aria-hidden=true></span></button></span><!--s: Address input box --><form ng-submit="getCombosDataSC(details.geometry.location.lat(), details.geometry.location.lng(), details.formatted_address)"><input id=sc-input-searchaddress placeholder=City/Zipcode ng-autocomplete ng-model=autocomplete options=options details=details required></form><!-- Address input box :e--></div></div></div><div class=row id=sc-div-subcontent><div class=col-sm-4><br><div id=sc-cuisine-title>Choose your Cuisine</div><div id=sc-div-cuisine-buttons></div></div><div class=col-sm-8><!--s: Tabs for all days --><br><form name=outerForm class=tab-form-demo><uib-tabset active=activeForm><uib-tab index="$index + 1" ng-repeat="(key, value) in o_combolist" heading="{{getSystemDates(key) | date:\'EEE dd, yyyy\'}}"><div ng-if="value.length > 0" ng-style=customComboListDivHeight(value)><div ng-if=isActiveCuisineAvailableOnTheDate(value)><br><h3>Sorry! :( No combos available for the current option selected. Please choose a different option.</h3></div><div ng-repeat="o_comboelement in value"><div ng-if=isCuisineActive(o_comboelement.cuisines)><br><div oro-list-element orolistelement=o_comboelement orolistelementavailabledate=key></div></div></div></div><div ng-if="value.length == 0" ng-style=customComboListDivHeight(value)><br><h3>Sorry! :( No combos available for this day. Please select another date.</h3></div></uib-tab></uib-tabset></form><!-- Tabs for all days :e--></div></div></header></div><div class=col-sm-2 style=margin-top:100px><a id=menu-toggle href=# style="color:#FF7F50; font-size:30px; padding-left:0px"><i class="glyphicon glyphicon-shopping-cart"></i></a> <span style=color:#FF7F50>cart</span></div><!-- squeezed in div which is not part of col set - its just a side bar which appears when a button is clicked --><div id=sidebar-wrapper><div class=row><div class=col-sm-12><br><!-- <h4>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;ORDER SUMMARY  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<span style:"margin-right:15px;"><a style="color:black;" id="menu-close" href="#"><i class="glyphicon glyphicon-remove"></i></a></span></h4> --><hr></div></div><div class=row><div class=col-sm-12 id=sc-div-summary-content><div ng-if=isOrderSummaryListEmpty()><h2 style=color:#CCCCCC>Add Your Meal! :)</h2></div><div ng-repeat="availabledate in o_summaryavailabledates"><div id=sc-div-summarydate><h4>{{getSystemDates(availabledate) | date:\'EEEE\'}}</h4></div><hr style="height:1px;border:none;color:#333;background-color:#C0C0C0;width:100px"><div ng-repeat="o_ordersummaryelement in o_ordersummarylist | filterByDates:availabledate"><div oro-order-summary-element oroordersummaryelement=o_ordersummaryelement></div></div></div></div></div><div class=row><span ng-if=o_totalpricetopay><div class=col-sm-12 id=sc-div-checkout><button id=sc-button-checkout ng-click=proceedToCheckout(o_totalpricetopay)><h4>TOTAL: ${{o_totalpricetopay | number:2}}</h4><h4>PROCEED CHECKOUT</h4></button></div></span></div></div></div><!-- Modal to display combo details--><div><div class="modal fade" id=modal-combo-detail role=dialog><div class=modal-dialog><div class=modal-content id=modal-attr><div class=modal-header><button type=button class=close data-dismiss=modal>&times;</button> {{o_comboviewdetail.name}}</div><div class=modal-body><img class=img-responsive src=http://hcevisuals.com/wp-content/uploads/2015/02/Food-photography-Cafe-Bar-Sandwich.jpg alt=Chania width=300 height=300>{{o_comboviewdetail.summary}}</div><div class=modal-footer></div></div></div></div></div></div></div></body></html>'),a.put("app/templates/ordersummary.html",'<div><div class=row><div class=col-xs-4><img class=img-responsive src=http://hcevisuals.com/wp-content/uploads/2015/02/Food-photography-Cafe-Bar-Sandwich.jpg alt=Chania width=80 height=80></div><div class=col-xs-5 id=os-description><div><h5>{{oroordersummaryelement.name}}</h5></div><div><button type=button class="btn btn-warning btn-sm" aria-hidden=true ng-click=decrementOrderSummaryCount()><div class="glyphicon glyphicon-minus"></div></button> &nbsp;{{oroordersummaryelement.count}} &nbsp; <button type=button class="btn btn-warning btn-sm" aria-hidden=true ng-click=incrementOrderSummaryCount()><div class="glyphicon glyphicon-plus"></div></button></div></div><div class=col-xs-3 id=os-price>${{oroordersummaryelement.tempprice}}<br></div></div><hr></div>'),a.put("app/templates/orolisttemplate.html","<div id=ol-div-combo><div class=row><div class=col-sm-7><div class=row><div class=col-sm-2 id=ol-div-dishimage><img class=img-responsive src=http://hcevisuals.com/wp-content/uploads/2015/02/Food-photography-Cafe-Bar-Sandwich.jpg alt=Chania width=100 height=100></div><div class=col-sm-10><div><h4>{{orolistelement.name}}</h4></div><div><h5>Main Dish: {{orolistelement.mainDish}}</h5></div><div><h5>Sides: {{orolistelement.sideDish}}</h5></div></div></div><div id=ol-div-type><h4>{{orolistelement.comboType}}</h4></div></div><div class=col-sm-5><div><h4>${{orolistelement.price}}</h4><button id=ol-button-add ng-click=addToOrderSummary()>+ ADD</button></div><br><div id=ol-div-view-details><a data-toggle=modal data-target=#modal-combo-detail ng-click=openComboModal()>View Details</a></div></div></div><hr></div>"),a.put("app/verify/verify.html","<div class=container><div class=row><div class=col-xs-12><h3>Verify Your Account Hello World</h3><hr></div></div><div sp-email-verification></div></div>"),a.put("components/footer/footer.html",'<div class=container><div class=row><div class=col-md-4><a class=links-footer>Blogs</a><br><br><a class=links-footer>Career</a></div><div class=col-md-4><a class=links-footer>FAQ</a><br><br><a class=links-footer>Contact Us</a></div><div class=col-md-4><a class=links-footer>Partner With Us</a><br><br><a class=links-footer>For Provider</a></div></div><br><hr><div class=col-md-4></div><div class=col-md-4><p class=links-footer style="color: white">CopyRight &copy; ORO 2016. All Rights Reserved</p></div><div class=col-md-4><a class=links-footer>Privacy Policy</a> &nbsp; &nbsp; <a class=links-footer>Terms of Use</a></div></div>'),a.put("components/navbar/navbar.html",'<html><head><link href="https://fonts.googleapis.com/css?family=Paytone+One|Luckiest+Guy|Righteous" rel=stylesheet><link href="https://fonts.googleapis.com/css?family=Poiret+One" rel=stylesheet><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,700,500" rel=stylesheet></head><body><div><!--Navbar implemented here\n           TODO: re write all the id names in a particular format which will be used across whole app--><!-- TODO: put this in a different file and include it here instead of having the whole code snippet here--><div class="navbar navbar-default navbar-fixed-top" role=navigation><div class=container-fluid><div class=navbar-header><button type=button class=navbar-toggle data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand id=logo-navbar ui-sref=main>ORO</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav navbar-right"><li class=dropdown id=nav-dropdown if-user ng-class="{active: isActive(\'/profile\')}"><a href=# class=dropdown-toggle data-toggle=dropdown><span id=nav-usericon class="glyphicon glyphicon-user"></span> <strong id=nav-profilename>{{sp_orouser.firstname}}</strong> <span id=nav-dropdownicon class="glyphicon glyphicon-chevron-down"></span></a><ul class=dropdown-menu><li><div class=navbar-login><div class=row><div class=col-lg-4><p class=text-center><span class="glyphicon glyphicon-user icon-size"></span></p></div><div id=nav-profiledetails class=col-lg-8><p class=text-left><strong>{{sp_orouser.fullname}}</strong></p><p class="text-left small">{{sp_orouser.username}}</p><p class=text-left><a href=# class="btn btn-primary btn-block btn-sm" ui-sref=profile>Profile</a></p></div></div></div></li><li class="divider navbar-login-session-bg"></li><li class=navbar-login-session-bg><div class="navbar-login navbar-login-session"><div class=row><div class=col-lg-12><p><a href=# class="btn btn-danger btn-block" ui-sref=main sp-logout>Logout</a></p></div></div></div></li></ul></li><li if-not-user><button type=button class="btn btn-primary btn-lg" data-toggle=modal data-target=#modal-login id=button-signin ng-click="bIsSignUpAcitve = false">Sign In</button></li><li if-not-user><button type=button class="btn btn-info btn-lg" data-toggle=modal data-target=#modal-login id=button-signup ng-click="bIsSignUpAcitve = true">Sign Up</button></li></ul></div></div></div><!-- Modal --><div><div class="modal fade" id=modal-login role=dialog><div class=modal-dialog><div class=modal-content id=modal-attr><div ng-switch=bIsSignUpAcitve><div ng-switch-when=true><div class=modal-header><button type=button class=close data-dismiss=modal>&times;</button><h4 class=modal-title>SIGN UP</h4></div><div class=modal-body><div sp-registration-form template-url=components/navbar/spRegistrationFormCustom.html post-login-state=main></div></div></div><div ng-switch-when=false><div class=modal-header><button type=button class=close data-dismiss=modal>&times;</button><h4 class=modal-title>SIGN IN</h4></div><div class=modal-body><div sp-login-form template-url=components/navbar/spLoginFormCustom.html></div></div></div></div><div class=modal-footer><span ng-hide=bIsSignUpAcitve>Not a User? <a ng-hide=bIsSignUpAcitve href ng-click="bIsSignUpAcitve = true">Sign Up</a></span> <span ng-show=bIsSignUpAcitve>Already a User? <a ng-show=bIsSignUpAcitve href ng-click="bIsSignUpAcitve = false">Sign In</a></span></div></div></div></div></div></div></body></html>'),a.put("components/navbar/spLoginFormCustom.html",'<style>.btn.btn-social {\n    margin-right: 7px;\n    min-width: 100px;\n  }\n  .btn.btn-facebook {\n    color: white;\n    background-color: #3B5998;\n    border-color: #37528C;\n  }\n  .btn.btn-facebook:hover,\n  .btn.btn-facebook:focus {\n    color: white;\n    background-color: #2F487B;\n    border-color: #2F487B;\n  }\n  .btn.btn-google {\n    color: white;\n    background-color: #dc4e41;\n    border-color: #C1453A;\n  }\n  .btn.btn-google:hover,\n  .btn.btn-google:focus {\n    color: white;\n    background-color: #C74539;\n    border-color: #AF4138;\n  }\n  \n  .form-horizontal{\n    font-family: \'Roboto\', sans-serif;\n    font-weight: 300;\n  }\n\n  .sp-loading {\n    text-align: center;\n  }\n  #sp-login{\n    width: 300px;\n    height: 40px;\n  }\n  #sp-password{\n    width: 300px;\n    height: 40px;\n  }\n  #button-login{\n    width: 300px;\n    text-align: center;\n    font-size: 18px;\n  }\n  .control-label{\n    font-size: 16px;\n  }</style><div class=row><div class=col-xs-12><div ng-show=!viewModel class=sp-loading>Loading...</div><form class=form-horizontal ng-hide="accepted || !viewModel" ng-submit=submit()><div class=form-group ng-repeat="field in viewModel.form.fields"><label for=sp-{{field.name}} class="col-xs-12 col-sm-4 control-label">{{field.label}}</label><div class="col-xs-12 col-sm-4"><input class=form-control name={{field.name}} id=sp-{{field.name}} type={{field.type}} ng-model=formModel[field.name] placeholder={{field.placeholder}} ng-required=field.required></div></div><div class=form-group><div class="col-sm-offset-4 col-sm-4"><p class=text-danger ng-show=error ng-bind=error></p><button type=submit class="btn btn-primary" id=button-login>Login</button><br><a href=/forgot class=pull-left>Forgot Password</a></div></div><div class=form-group ng-show=viewModel.accountStores.length><div class="col-sm-offset-4 col-sm-4"><p>Or login with:</p><button ng-repeat="accountStore in viewModel.accountStores" type=button class="btn btn-social btn-{{accountStore.provider.providerId}}" sp-social-login={{accountStore.provider.providerId}} sp-client-id={{accountStore.provider.clientId}} sp-scope={{accountStore.provider.scope}}>{{providerName}}</button></div></div></form></div></div>'),
a.put("components/navbar/spRegistrationFormCustom.html",'<style>.btn.btn-social {\n    margin-right: 7px;\n    min-width: 100px;\n  }\n  .btn.btn-facebook {\n    color: white;\n    background-color: #3B5998;\n    border-color: #37528C;\n  }\n  .btn.btn-facebook:hover,\n  .btn.btn-facebook:focus {\n    color: white;\n    background-color: #2F487B;\n    border-color: #2F487B;\n  }\n  .btn.btn-google {\n    color: white;\n    background-color: #dc4e41;\n    border-color: #C1453A;\n  }\n  .btn.btn-google:hover,\n  .btn.btn-google:focus {\n    color: white;\n    background-color: #C74539;\n    border-color: #AF4138;\n  }\n\n  .form-horizontal{\n    font-family: \'Roboto\', sans-serif;\n    font-weight: 300;\n  }\n\n  .sp-loading {\n    text-align: center;\n  }\n\n  #sp-givenName{\n    width: 300px;\n    height: 40px;\n  }\n\n  #sp-surname{\n    width: 300px;\n    height: 40px;\n  }\n\n  #sp-email{\n    width: 300px;\n    height: 40px;\n  }\n\n  #sp-password{\n    width: 300px;\n    height: 40px;\n  }\n  #button-login{\n    width: 300px;\n    text-align: center;\n    font-size: 18px;\n  }\n  .control-label{\n    font-size: 16px;\n  }</style><div class=row><div class="col-sm-offset-4 col-xs-12 col-sm-4"><p class="alert alert-success" ng-show="created && !enabled">Your account has been created. Please check your email for a verification link.</p><p ng-show="created && !enabled" class=pull-right><a href=/login>Back to Login</a></p><p class="alert alert-success" ng-show="created && enabled && !authenticating">Your account has been created. <a href=/login>Login Now</a>.</p></div></div><div class=row><div class=col-xs-12><div ng-show=!viewModel class=sp-loading>Loading...</div><form class=form-horizontal ng-hide="!viewModel || (created && !authenticating)" ng-submit=submit()><div class=form-group ng-repeat="field in viewModel.form.fields"><label for=sp-{{field.name}} class="col-xs-12 col-sm-4 control-label">{{field.label}}</label><div class="col-xs-12 col-sm-4"><input class=form-control name={{field.name}} id=sp-{{field.name}} type={{field.type}} ng-model=formModel[field.name] placeholder={{field.placeholder}} ng-required=field.required></div></div><div class=form-group><div class="col-sm-offset-4 col-sm-4"><p class="alert alert-danger" ng-show=error ng-bind=error></p><button type=submit class="btn btn-primary" id=button-login>Register</button></div></div><div class=form-group ng-show=viewModel.accountStores.length><div class="col-sm-offset-4 col-sm-4"><p>Or register with:</p><button ng-repeat="accountStore in viewModel.accountStores" type=button class="btn btn-social btn-{{accountStore.provider.providerId}}" sp-social-login={{accountStore.provider.providerId}} sp-client-id={{accountStore.provider.clientId}} sp-scope={{accountStore.provider.scope}}>{{providerName}}</button></div></div></form></div></div>')}]);