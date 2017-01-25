var payload, evergreen_token, socket;

//////////////////////////////////////////////////////
//										HELPER FUNCTIONS
//////////////////////////////////////////////////////
// Parse payload and evergreen_token from cookies:
function setPayload() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		if (cookies[i].indexOf("evergreen_token=") != -1) {
			evergreen_token = cookies[i].split("evergreen_token=")[1];
			var base64Url = evergreen_token.split('.')[1];
			var base64 = base64Url.replace('-', '+').replace('_', '/');
			payload = JSON.parse(window.atob(base64));
			break;
		}
	}
}

// Connect to sockets:
function setSocket() {
	if (evergreen_token) {
		socket = io.connect();

		// Find rooms to subscribe to rooms:
		$.ajax({
			type: "GET",
			url: "/api/getAcceptedOffers",
			dataType: "json",
			headers: {'authorization': `Bearer ${evergreen_token}`},
			success: function(data) {
				for (var i = 0; i < data.length; i++)
				socket.emit('subscribe', data[i].id);
			},
			error: function(error) {
				if (error.status == 401)
				location.href = ("/#!/logout");
				else
				console.log(error)
			}
		});
	}
}

// Display error:
// function displayErrorNotification(error) {
// 	$.notify({
// 		icon: "glyphicon glyphicon-warning-sign",
// 		message: `${error}`,
// 	}, {
// 		type: "danger",
// 		newest_on_top: true,
// 		placement: {
// 			from: "top",
// 			align: "center"
// 		},
// 		delay: 0,
// 		animate: {
// 			enter: 'animated fadeInDown',
// 			exit: 'animated fadeOutDown',
// 		}
// 	});
// }

//////////////////////////////////////////////////////
//										APP.RUN
//////////////////////////////////////////////////////
app.run(function($rootScope, $timeout) {
	// var allow_notify = true;

	// Define and invoke function to set user:
	($rootScope.setUser = function() {
		setPayload();
		if(payload) {
			$rootScope.id = payload.id;
			$rootScope.type = payload.type;
			$rootScope.company = payload.company;
			$rootScope.contact = payload.contact;
			$rootScope.created_at = payload.created_at;
			$rootScope.color = $rootScope.type == 0 ? "orange" : "green";
			$rootScope.user = $rootScope.type == 0 ? "maker" : "supplier";
			$rootScope.menu = false;
			// $rootScope.messages = [];
		}

		setSocket();
		if (socket) {
			// Define socket event handlers:
			socket.on('sent', function(data) {
				if (data.offer_id == $rootScope.cur_offer.id && window.location.hash.includes("messages")) {
					$rootScope.messages.push(data);
					$rootScope.$apply();
					$timeout(function() {
						var _ = document.getElementById("chat");
						_.scrollTop = _.scrollHeight;
					}, 0, false);
				}
			});

			// 		//////////////////////////////////////////////////////
			// 		//										SENT FROM TRUCKERS
			// 		//////////////////////////////////////////////////////
			// 		socket.on('applied', function(data) {
			// 			if (data.user_id == $rootScope.id) {
			// 				socket.emit("subscribe", data.offer_id);
			// 				$.notify({
			// 					icon: "glyphicon glyphicon-check",
			// 					message: `${data.company} applied for your job!`,
			// 					url: `#/messages/${data.offer_id}`,
			// 					target: "_self"
			// 				}, {
			// 					type: "info",
			// 					placement: {
			// 						from: "bottom"
			// 					},
			// 					delay: 4000,
			// 					animate: {
			// 						enter: 'animated fadeInUp',
			// 						exit: 'animated fadeOutDown',
			// 					}
			// 				});
			// 			}
			// 		});

			// 		socket.on('cancelled', function(data) {
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-info-sign",
			// 				message: `${data.company} has cancelled their application for your job.`,
			// 			}, {
			// 				type: "warning",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});

			// 		socket.on('forfeitted', function(data) {
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-warning-sign",
			// 				message: `${data.company} forfeitted the job. Click here to view/relist the job.`,
			// 				url: `#/jobs/${data.job_id}#${Date.now()}`,
			// 				target: "_self"
			// 			}, {
			// 				type: "danger",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});

			// 		socket.on('paidLeadFee', function(data) {
			// 			console.log("CONNECTED")
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-info-sign",
			// 				message: `${data.company} has paid our lead fee. You're now connected!`,
			// 				url: `#/messages/${data.offer_id}#${Date.now()}`,
			// 				target: "_self"
			// 			}, {
			// 				type: "info",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});

			// 		socket.on('invoiced', function(data) {
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-info-sign",
			// 				message: `${data.company} has sent you an invoice.`,
			// 				url: `#/invoices#${Date.now()}`,
			// 				target: "_self"
			// 			}, {
			// 				type: "info",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});

			// 		//////////////////////////////////////////////////////
			// 		//										SENT FROM USERS
			// 		//////////////////////////////////////////////////////
			// 		socket.on('accepted', function(data) {
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-check",
			// 				message: `${data.company} accepted your application!`,
			// 				url: `#/messages/${data.offer_id}#${Date.now()}`,
			// 				target: "_self"
			// 			}, {
			// 				type: "success",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});

			// 		socket.on('declined', function(data) {
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-info-sign",
			// 				message: `${data.company} declined your application. Better luck next time!`
			// 			}, {
			// 				type: "warning",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});

			// 		socket.on('paid', function(data) {
			// 			$.notify({
			// 				icon: "glyphicon glyphicon-info-sign",
			// 				message: `${data.company} has paid you! Click here and check your invoice history.`,
			// 				url: `#/invoices#${Date.now()}`,
			// 				target: "_self"
			// 			}, {
			// 				type: "info",
			// 				placement: {
			// 					from: "bottom"
			// 				},
			// 				delay: 4000,
			// 				animate: {
			// 					enter: 'animated fadeInUp',
			// 					exit: 'animated fadeOutDown',
			// 				}
			// 			});
			// 		});
		}
	})();

	// Define logout function:
	$rootScope.logout = function() {
		// Disconnect from sockets:
		socket.emit("logout");

		// Destroy cookie:
		document.cookie = "evergreen_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

		// Reset globals:
		payload = undefined;
		evergreen_token = undefined;
		socket = undefined;
		$rootScope.id = undefined;
		$rootScope.type = undefined;
		$rootScope.company = undefined;
		$rootScope.created_at = undefined;
		$rootScope.color = undefined;
		$rootScope.user = undefined;
		$rootScope.menu = undefined;

		// Relocate:
		location.href = ("/");
	};
});

var sampleData = [
	{company:'apple', total:23},
	{company:'google', total:13},
	{company:'facebook', total:33},
	{company:'twitter', total:3},
	{company:'comp1', total:3},
	{company:'comp2', total:3},
	{company:'comp3', total:3},
];
function testfunction(){
	chartObject.dataset = sampleData;
	chartObject.firstNBars = [sampleData[3], sampleData[1]]
	console.log(chartObject.firstNBars);
	chartObject.customColorsForFirstNBars = ['orange','green']
	chartObject.drawChart();
}



// GOOGLE CHARTS OBJECT CONSTRUCTOR AND ASSOCIATED VARIABLES
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
//Set a boolean to let other functions know whether the API has finished loading.
google.charts.setOnLoadCallback(function(){googlefinishedloading=true});

var googlefinishedloading = false;

function ChartGenerator(){
	var self = this;
	var defaultChartWidth = 1000
	var defaultChartHeight = 400
	this.template = {};
	this.template.bartitle = 'Company';
	this.template.metric = 'PPU';
	this.template.width = defaultChartWidth
	this.template.height = defaultChartHeight
	this.defaultColor = 'gray'
	this.customColorsForFirstNBars = []; //determines the color for the first N bars in the chart. Use hexcodes or CSS color names. This is implemented in pushDataSet
	this.firstNBars = [];//contains the first few bars to be displayed in the data set. They will be pushed first, then ignored when the pushDataSet function loops through the rest of the data.
	this.dataset = [];
	this.testfunction = function(){
		console.log("The chart object is properly constructed.");
	}
	this.drawChart = function() {
		if(!googlefinishedloading){
			console.log("google api isn't finished loading yet. Or one of the variables hasn't loaded.");
			setTimeout(self.drawChart, 250)
			return
		}
		// Create the data table.
		try{
			var data = [[this.template.bartitle, this.template.metric, { role: 'style' }]]
			data = pushDataSet(data)
			data = google.visualization.arrayToDataTable(data);
			// Set chart options
			var options = {'title':'',
			'chartArea': {'width': '80%', 'height': '80%'},
			'legend':{position:'none'},
			'width':this.template.width,
			'height':this.template.height};
			// Instantiate and draw our chart, passing in some options.
			var chart = new google.visualization.ColumnChart(document.getElementById('chart_div')); //the div containing the chart must have this ID.
			chart.draw(data, options);
		}
		catch(err){
			console.log(err);
			setTimeout(drawChart,250);
		}
	}

	function pushDataSet(arr){ //when we generate the data for the table, we need to account for custom colors as well as ignoring a bar if it is intentionally placed first.
		var customColorIndex = 0
		for(var i=0;i<self.firstNBars.length;i++){ //first push the first few bars and give them colors
			var customColor = self.defaultColor;
			if (self.firstNBars[i]) { //if there exists a value to put in for the first nth value, place it
				if(self.customColorsForFirstNBars[customColorIndex]){ //if there exists a custom color for the first nth value, set it
					customColor=self.customColorsForFirstNBars[customColorIndex]
					customColorIndex++;
				}
				arr.push([self.firstNBars[i].company, parseInt(self.firstNBars[i].total), customColor])
			}
		}
		for(var i=0;i<self.dataset.length;i++){
			var customColor= self.defaultColor;
			var alreadyInArray = false;
			for(var j=0;j<self.firstNBars.length;j++){
				if(self.dataset[i] == self.firstNBars[j]){
					alreadyInArray = true
				}
			}
			if(!alreadyInArray){
				if(self.customColorsForFirstNBars[customColorIndex]){ //if there exists a custom color for the first nth value, set it
					customColor=self.customColorsForFirstNBars[customColorIndex]
					customColorIndex++;
				}
				arr.push([self.dataset[i].company, parseInt(self.dataset[i].total), "color: "+customColor])
			}
		}
		return arr
	}
}

var chartObject = new ChartGenerator();;
