app.controller("createProposalController", function ($scope, $route, $location, proposalsFactory) {
	if (payload && $scope.type == 0) {
		$scope.today = new Date();
		$scope.step = 1;
	}
	else
	$location.url("/");

	$scope.close = function(_) {
		$("#proposalSuccess").modal("hide");
		if (_ == 0)
			$route.reload();
		else
			$location.url("/dashboard");
	}

	$scope.create = function() {
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
	}
	$scope.documentsCount = 0;
	$scope.appendInputToDocuments = function(){
		if($scope.documentsCount<20){
			$scope.documentsCount++;
			$('#documents').append(`<div id='document${$scope.documentsCount}'><input type='file' name='document' value=''><div ng-click='removeDocumentInputWithId(document${$scope.documentsCount})'>remove</div></div>`)
		}
	}
	$scope.removeDocumentInputWithId = function(id){
		$(`${id}`).remove();
	}
})
