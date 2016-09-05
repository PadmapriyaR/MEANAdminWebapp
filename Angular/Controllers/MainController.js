//main controller
main.controller("MainController", function ($scope, $http) {
    /*$scope.ABC = "ABC";
    $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];*/
  $scope.speakerimage = [{'speaker': 'img1'}];
  $scope.choice = {};
  $scope.names = [{'id': 'choice1'}];
  $scope.aboutspeakers = [{'name': 'speaker1'}];
  	$scope.addNewChoice = function() {
  		var newItemNo = $scope.names.length+1;
  		var newdesc = $scope.names.length+1;
  		var newImg = $scope.names.length+1;
  		$scope.names.push({'id':'choice'+newItemNo});
  		$scope.aboutspeakers.push({'name':'speaker'+newdesc});
  		$scope.speakerimage.push({'speaker': 'img'+newImg});
  		};
	$scope.showAddChoice = function(choice, id) {
  return choice.id === $scope.names[$scope.names.length-1].id;

};

	//Agenda
	  
  	  $scope.timings = [{'id': 'time1'}];
  	  $scope.aboutagenda = [{'agenda': 'topic1'}];
  	$scope.addNewAgenda = function() {
  		var newNo = $scope.timings.length+1;
  		var newagenda = $scope.names.length+1;
  		$scope.timings.push({'id':'time'+newNo});
  		$scope.aboutagenda.push({'agenda':'topic'+newagenda});
  		};
	


  //create event
	$scope.createEvent = function(){
		console.log('create event');
		console.log($scope.admin);
		$http.post('/createevents', $scope.admin).success(function(response){
			console.log(response);
			$scope.admin = '';
			$scope.successTextAlert = "Event has been created";
			$scope.showSuccessAlert = true;

			// switch flag
			$scope.switchBool = function(value) {
   			$scope[value] = !$scope[value];
		};
			
		});
	};

	var refresh = function(){
		$http.get('/allevents').success(function(response){
			$scope.admins = response;
			$scope.admin = '';
		});
	}	
	//show Events
	$scope.showEvents = function(){
		$http.get('/allevents').success(function(response){
			$scope.admins = response;
			$scope.display = $scope.admins;
			$scope.admin = '';

		});
	};

	//Edit event status
	$scope.editEvent = function(id){
		console.log('I am from edit function');
		console.log(id);
		$http.get('/allevents/'+id).success(function(response){
			$scope.values = response;
			$scope.admin = response;
		});
	};

	//update Event
	$scope.updateStatus = function(){
		console.log('id '+$scope.admin._id);
		console.log('Status'+ $scope.admin.status);
		var sid = $scope.admin._id;
		var sname = $scope.admin.status;
		$http.put('/createevents/'+$scope.admin._id, $scope.admin).success(function(response){
			console.log(response);
			$scope.admins = '';
			//$scope.showEvents();
			refresh();
		});
	};
	//Delete Event
	$scope.deleteEvent = function(){
		var arraylength;
		$http.get('/allevents').success(function(response){
			console.log(response);
			$scope.flag = response;
			arraylength = $scope.flag.length;
			console.log('arraylength:' + arraylength);
			if(arraylength == 0){
			console.log('Cant delete');
			$scope.successAlert = "No Event Exist.";
			$scope.showAlert = true;
			$scope.switchBooll = function(value) {
   			$scope[value] = !$scope[value];
		};
		}
		else{
			$http.delete('/deleteevent').success(function(response){
			console.log(response);
			$scope.successAlert = "Previous Event has been deleted Successfully";
			$scope.showAlert = true;

			// switch flag
			$scope.switchBooll = function(value) {
   			$scope[value] = !$scope[value];
		};
		});

		}
		});
	};	
});