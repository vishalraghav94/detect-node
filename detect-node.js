	(function () {
		var limit = 0;
		var nodeDetect = {
			init: function (callback) {
				var css = "@keyframes nodeInserted {} @-moz-keyframes nodeInserted{} @-webkit-keyframes nodeInserted {} @-ms-keyframes nodeInserted {} @-o-keyfames nodeInserted{} body * {animation: nodeInserted 0s; -webkit-animation: nodeInserted 0s; -moz-animation: nodeInserted 0s; -ms-animation: nodeInserted 0s; -o-animation: nodeInserted 0s;}";
				this.appendCSS(css);
  				window.addEventListener('animationstart', this.throttle(function(event) {
		    		if (event.animationName == 'nodeInserted') {
		       			 callback(event);
		   		 	}
				},limit), true);
			},
			appendCSS: function (css) {
				var head = document.head || document.getElementsbyTagName('head')[0] , 
				style = document.createElement('style');

				style.type = 'text/css';
				if(style.styleSheet) {
					style.styleSheet.cssText = css;
				} else {
					style.appendChild(document.createTextNode(css));
				}
				head.appendChild(style);
			},
			throttle: function (callback,limit) {
				var wait = false;
				return function () {
					if (!wait) {
						callback.apply(null, arguments);
						wait = true;
						setTimeout(function () {
							wait = false;
						}, limit);
					}
				}
			}
		}

		window.NodeDetect = function (time, callback) {
			limit = time || limit;
			nodeDetect.init(callback);
		}
		return nodeDetect;
	})();
