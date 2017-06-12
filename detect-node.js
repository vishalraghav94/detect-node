	(function () {
		var limit = 0; //default time limit (if time parameter is not passed)
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
						var wait = false,count=0,flag=true;
				return function () {
					if (!wait) {
						count = 0;
						wait = true;
						if(flag) {
							callback.apply(null, arguments);
						}
						var args = arguments;
						setTimeout(function () {
							wait = false;
							if(count>0){
								callback.apply(null, args);
								flag = false;
							}
							count = 0;
						}, limit);
					} else {
						count++;
						flag = true;
					}
				}
			}
		}

		window.NodeDetect = function (callback, time) {
			limit = time || limit;
			nodeDetect.init(callback);
		}
		return nodeDetect;
	})();
