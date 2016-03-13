/**
 * UI Scripts
 */
var store = chrome.storage.local;

$(document).ready(function(){
	chrome.runtime.sendMessage({action: 'loaded'});	

	hilyte();

});


function hilyte() {

	var hilytes = [];
	store.get('hilytes', function(data){
		if (data && data.hasOwnProperty('hilytes'))
			hilytes = data.hilytes;

		for(var key in hilytes) {
			var item = hilytes[key];
			if (item.text != null) {
				$('body').highlight(item.text);
			}	
		}	
	})

}

// Listen for hylite change and trigger the re-hilyte 
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		if (key == 'hilytes') {
			hilyte();
		}  
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action) {
		switch(request.action) {
			case 'tmp':

			break;
		}
	}
});
