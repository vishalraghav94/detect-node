(function () {

	//default time limit (if time parameter is not passed)
	var limit = 0;

	var nodeDetect = {
		/**
		 *
		 * @param callback - function to execute when node is detected
		 * @param selectors - list of selectors path in which node detection is to be implemented
         */
		init: function (callback,selectors) {
			var selectorsString = selectors.join(",");
			var animationValues = "{animation: nodeInserted 0s; -webkit-animation: nodeInserted 0s; -moz-animation: nodeInserted 0s; -ms-animation: nodeInserted 0s; -o-animation: nodeInserted 0s;}";
			var css = "@keyframes nodeInserted {} @-moz-keyframes nodeInserted{} @-webkit-keyframes nodeInserted {} @-ms-keyframes nodeInserted {} @-o-keyfames nodeInserted{} "+selectorsString+animationValues;
			this.appendCSS(css);
			window.addEventListener('animationstart', this.throttle(function(event) {
				if (event.animationName == 'nodeInserted') {
					callback(event);
				}
			},limit), true);
		},
		/**
		 *
		 * @param css - css styling to be added to style tag
         */
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
			var wait = false, count = 0, flag = true;
			if (limit !== 0) {
				return function () {
					if (!wait) {
						count = 0;
						wait = true;
						if (flag) {
							callback.apply(null, arguments);
						}
						else {
							count++;
						}
						var args = arguments;
						setTimeout(function () {
							wait = false;
							if (count > 0) {
								callback.apply(null, args);
								flag = false;
								setTimeout(function(){
									flag=true;
								},limit);
							}
							else
								flag = true;
							count = 0;
						}, limit);
					} else {
						count++;
						flag = true;
					}
				}
			}
			else {
				return function(){
					callback.apply(null,arguments);
				}
			}

		}
	};

	window.NodeDetect = function (callback,selectors,time) {
		limit = time || limit;
		if( !selectors || !selectors.length) {
			selectors = ["body *"];
		}

		if(!(selectors instanceof Array)) {
			selectors = [selectors];
		}
		nodeDetect.init(callback, selectors);
	};

	return nodeDetect;
})();