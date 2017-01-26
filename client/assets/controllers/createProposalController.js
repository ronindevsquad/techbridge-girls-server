app.controller("createProposalController", function ($scope, $route, $location, proposalsFactory) {
	$scope.proposal = {};
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
	$scope.test = function(){
		var formData = new FormData();
		for(var i=0;i<document.getElementById('documentsInput').files.length;i++){
			formData.append("file",document.getElementById('documentsInput').files[i])
		}
		for(var i=0;i<document.getElementById('ndaInput').files.length;i++){
			formData.append("file",document.getElementById('ndaInput').files[i])
		}
		var request = new XMLHttpRequest();
		request.open("POST", "/upload");
		request.onload = function(){
			var filesarray = JSON.parse(this.responseText);
			$scope.proposal.filesarray = filesarray;
			$scope.$apply();
			$scope.create();
		}
		request.send(formData);
	}
	$scope.create = function() {
		console.log($scope.proposal);
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
