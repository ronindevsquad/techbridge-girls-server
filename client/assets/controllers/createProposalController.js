app.controller("createProposalController", function ($scope, $route, $location, Upload, proposalsFactory) {
	if (payload && $scope.type == 0) {
		$scope.today = new Date();
		$scope.documentsCount = 0;
		$scope.step = 3;
	}
	else
		$location.url("/");

	$scope.close = function(_) {
		$("#proposalSuccess").modal("hide");
		if (_ == 0) 
			$route.reload();
		else
			$location.url("/dashboard");
	};

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
	};
	$scope.appendInputToDocuments = function(){
		if($scope.documentsCount<20){
			$scope.documentsCount++;
			$('#documents').append(`<div id='document${$scope.documentsCount}'><input type='file' name='document' value=''><div ng-click='removeDocumentInputWithId(document${$scope.documentsCount})'>remove</div></div>`)
		}
	};
	$scope.removeDocumentInputWithId = function(id){
		$(`${id}`).remove();
	};

	$scope.uploadFiles = function (files) {
		console.log(files)
		$scope.files = files;
		if (files && files.length) {
			Upload.upload({
				url: 'https://localhost:8000/upload',
				method: "POST",
				files: files
			}).then(function (response) {
				$timeout(function () {
					$scope.result = response.data;
				});
			}, function (response) {
				if (response.status > 0) {
					$scope.errorMsg = response.status + ': ' + response.data;
				}
			}, function (evt) {
				$scope.progress = 
				Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}
	};
})
