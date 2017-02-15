app.controller("createProposalController", function ($scope, $route, $location, proposalsFactory) {
	if (payload && $scope.type == 0) {
		$scope.today = new Date();
		$scope.documentsCount = 0;
		$scope.proposal = {info: ""};
		$scope.step = 1;
	}
	else
		$location.url("/");

	//AUTOCOMPLETE FIELDS FOR TESTING PURPOSES
	$scope.proposal.processes = ["Automation"];
	$scope.proposal.product = payload.company + "s product";
	$scope.proposal.quantity = 10000;
	$scope.proposal.completion = new Date("2017-09-19T19:49:21+04:00");
	// $scope.proposal.zip = 95129;
	$scope.proposal.audience = 0;
	$scope.proposal.info = "Let our network of suppliers know what else you need";

	$scope.logVariables = function(){
		console.log($scope.proposal);
	}

	//END OF AUTOCOMPLETE FIELDS FOR TESTING PURPOSES


	$scope.uploadingFiles = false;

	$scope.close = function(_) {
		$("#proposalSuccess").modal("hide");
		if (_ == 0)
			$route.reload();
		else
			$location.url("/dashboard");
	};

	$scope.uploadFiles = function(){
		$scope.uploadingFiles = true;
		var formData = new FormData();
		for (var i = 0; i < document.getElementById('documentsInput').files.length; i++) {
			formData.append("file", document.getElementById('documentsInput').files[i])
		}

		for (var i = 0; i < document.getElementById('ndaInput').files.length; i++) {
			formData.append("file", document.getElementById('ndaInput').files[i])
		}

		var request = new XMLHttpRequest();
		request.open("POST", "/uploadFiles");
		request.onload = function() {
			var responseText = JSON.parse(this.responseText);
			var response = JSON.parse(this.response);
			console.log("responseText:", responseText)
			console.log("response:", response)

			if (!response.message) {
				$scope.proposal.files = responseText;
				$scope.$apply();
				$scope.create();
			} else {
				console.log(response.message);
			}
		}
		request.send(formData);
	}

	$scope.create = function() {
		$scope.proposal.completion = $scope.proposal.completion.toISOString().slice(0,10);
		proposalsFactory.create($scope.proposal, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				$scope.error = data.data.message;
			else {
				$scope.step = 4
				$("#proposalSuccess").modal("show");
			}
		});
	};
})
