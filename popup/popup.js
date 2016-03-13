/**
 * Popup js
 */
var store = chrome.storage.local;

$(document).ready(function(){


	getHilited(function(text) {
		if (text != null) {
			$('#hilyte-text').val(text);
		}
	});


	$('#add-btn').on('click', function() {
		var text = $('#hilyte-text').val();
		if (text != undefined && text != '' && text != ' ') {
			save(text);
		}
	});

});

function notify(title, message) {

	chrome.notifications.create('title', {
		type: 'basic',
		title: title,
		message: message,
		iconUrl : '../img/icons/notify.png'
	});

}

function getHilited(cb) {

	chrome.tabs.executeScript( {code: "window.getSelection().toString();"}, function(selection) {
	 	var text = (selection && selection.length > 0) ? selection[0].trim() : null;
	 	cb(text);
	});

}


function save(text) {
	
	text = text.trim();

	// create key	
	var key = text.toUpperCase().replace(" ", '_');

	// item format
	var new_item = {
		text: null,
		colour: null,
		settings: null
	};

	new_item.text = text;

	store.get('hilytes', function(data) {
		var item = {};
		var hilytes = {};
		if (data && data.hasOwnProperty('hilytes')) {
			hilytes = data.hilytes;
			if (hilytes.hasOwnProperty(key))
				item = hilytes[key];
		}

		hilytes[key] = $.extend(item, new_item);
		
		store.set({hilytes: hilytes}, function() {
			notify('Added!', 'Successfully add "' + text + '" to the hilyte list');
		});
	});

}