/*!
 * ModalWidget v1.0.0
 * (c) 2015 Carsten Jacobsen
 */

 (function(){

 	function ModalWidget(args){
 		var that = this;
 		var eventName = 'click';

 		var _buttons 		= [],
 			_image			= null,
			_title			= null,
			_content		= null,
 			_color			= '#00759c',
 			_container		= document.body,
 			_closeOnClick	= true,
 			_padding		= true;

 		var elements = {
 			content: null,
 			image: null,
 			title: null,
 			message: null,
 			buttons: null
 		};

 		var _images = {
			success: '<svg id="modal_icon" class="modal_default" viewBox="0 0 32 32"><path d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383   L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z" fill="{{color}}"/></svg>',
			error:  '<svg id="modal_icon" class="modal_default" viewBox="0 0 32 32"><path d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M23.914,21.086   l-2.828,2.828L16,18.828l-5.086,5.086l-2.828-2.828L13.172,16l-5.086-5.086l2.828-2.828L16,13.172l5.086-5.086l2.828,2.828   L18.828,16L23.914,21.086z" style="fill:{{color}};"/></svg>',
			question: '<svg id="modal_icon" class="modal_default" x="0px" y="0px" viewBox="0 0 128 128"><path fill="{{color}}" d="M64,0C28.7,0,0,28.7,0,64s28.7,64,64,64s64-28.7,64-64S99.3,0,64,0z M62.5,98.5h-0.1c-3.4,0-5.8-2.7-5.8-6.2	c0-3.7,2.5-6.3,6-6.3s5.9,2.6,5.9,6.3C68.5,95.8,66.2,98.5,62.5,98.5z M72.2,60.8c-4.4,5.2-6,9.7-5.7,14.8l0.1,2.5h-7.8l-0.2-2.6	c-0.6-5.3,1.2-11.3,6.2-17.2c4.5-5.4,7-9.3,7-13.8c0-5.1-3.2-8.5-9.5-8.6c-3.6,0-7.6,1.2-10.1,3.1l-2.4-6.3c3.4-2.4,9-4,14.3-4	c11.5,0,16.7,7.1,16.7,14.7C80.8,50.2,77,55.2,72.2,60.8z"/></svg>',
			info: '<svg id="modal_icon" class="modal_default" x="0px" y="0px" viewBox="0 0 128 128"><path fill="{{color}}" d="M64,0C28.7,0,0,28.7,0,64s28.7,64,64,64s64-28.7,64-64S99.3,0,64,0z M69.4,95.3h-8.8V46.9h8.8V95.3z	 M64.8,38.7c-3.1,0-5.3-2.4-5.3-5.4c0-3.1,2.3-5.5,5.5-5.5c3.3,0,5.4,2.4,5.4,5.5C70.5,36.3,68.3,38.7,64.8,38.7z"/></svg>'
		};



 		function setArgs(x){
 			for(var key in x){
 				that[key] = x[key];
 			}
 		}

 		function init(){
 			that.el = document.createElement('div');
 			that.el.className = 'ModalWidget';
 			that.el.addEventListener(eventName,function(event){
 				if(_closeOnClick && event.target == that.el){
 					hide();
 				}
 			});

 			elements.content = document.createElement('div');
 			elements.content.className = 'ModalContent';

 			if(!_padding)elements.content.setAttribute('style','padding:0;');

 			initImage();

 			elements.title = document.createElement('h1');
 			elements.title.setAttribute('style','color:' + _color);
 			elements.title.innerHTML = _title;

 			elements.message = document.createElement('div');
 			elements.message.className = 'ModalMessage';
 			elements.message.innerHTML = _content;

 			elements.buttons = document.createElement('div');
 			elements.buttons.className = 'ModalButtons';
 			initButtons();

 			elements.buttons.addEventListener(eventName,function(event){
 				if(event.target.nodeName == 'BUTTON'){
 					var index = parseInt(event.target.getAttribute('data-index'));
 					if(_buttons[index].callback){
 						_buttons[index].callback.call(that);
 					}
 				}
 			});

 			elements.content.appendChild(elements.title);
 			elements.content.appendChild(elements.message);
 			elements.content.appendChild(elements.buttons);

 			that.el.appendChild(elements.content);
 		}

 		function initImage(){
 			if(elements.content && elements.content.contains(elements.image)){
 				elements.content.removeChild(elements.image);
 			}

 			if(new RegExp('^(success|error|info|question)$').test(_image)){
 				var svg = document.createElement('div');
 					svg.innerHTML = _images[_image];
 				elements.image = svg.childNodes[0];
 				elements.image.setAttribute('style','fill:' + _color);
 			}else{
 				elements.image = document.createElement('img');
 				elements.image.setAttribute('style','color:' + _color);
 				if(_image && elements.content){
 					elements.content.classList.add('m-loading');
 					elements.image.addEventListener('load',function(){
 						elements.content.classList.remove('m-loading');
 					});	
 					elements.image.src = _image;
 				}
 			}

 			if(elements.content){
 				elements.content.insertBefore(elements.image,elements.content.childNodes[0]);
 			}
 		}

 		function initButtons(){
 			if(!elements.buttons)return;
 			elements.buttons.innerHTML = '';

 			for(var i = 0; i < _buttons.length;i++){
 				var item = _buttons[i];
 				var button = document.createElement('button');
 					button.setAttribute('data-index',i);
 					button.setAttribute('style','background-color:' + item.backgroundColor + ';color:' + item.color + ';');
 					if(item.width){
 						button.setAttribute('style',button.getAttribute('style') + 'width:' + item.width + '%');
 					}
 					button.innerHTML = item.text;

 				elements.buttons.appendChild(button);
 			}
 		}

 		function show(args){
 			setArgs(args);
 			var handler = function(){
				that.el.classList.remove('m-show');
				that.el.removeEventListener(whichAnimationEvent(),handler);
			};
			that.el.addEventListener(whichAnimationEvent(),handler);

 			that.el.classList.add('m-show');
 			that.container.appendChild(that.el);

 			return that;
 		}

 		function hide(){
 			var handler = function(){
 				that.el.classList.remove('m-hide');
 				that.container.removeChild(that.el);
 				that.el.removeEventListener(whichAnimationEvent(),handler);
 			};

 			that.el.addEventListener(whichAnimationEvent(),handler);

 			that.el.classList.remove('m-show');
 			that.el.classList.add('m-hide');

 			return that;
 		}

 		that.show = show;
 		that.hide = hide;

 		Object.defineProperties(that,{
 			'container': {
 				get: function(){
 					return _container;
 				},
 				set: function(x){
 					if(x instanceof String){
						var y = document.querySelector(x);
						if(y){
							_container = y;
						}else{
							console.error("Container doesn't exist");
						}
					}else if(x instanceof HTMLElement){
						_container = x;
					}else{
						console.error("Invalid type");
					}
 				}
 			},
 			'image': {
 				get: function(){
 					return _image;
 				},
 				set: function(x){
 					_image = (typeof x == 'string')?x:null;
 					initImage();
 				}
 			},
 			'title': {
 				get: function(){
 					return _title;
 				},
 				set: function(x){
 					_title = (typeof x == 'string')?x:null;
 					if(elements.title)elements.title.innerText = _title;
 				}
 			},
 			'content': {
 				get: function(){
 					return _content;
 				},
 				set: function(x){
 					_content = (typeof x == 'string')?x:null;
 					if(elements.message)elements.message.innerHTML = _content;
 				}
 			},
 			'color': {
 				get: function(){
 					return _color;
 				},
 				set: function(x){
 					_color = (typeof x == 'string')?x:null;
 					if(elements.title && elements.image){
 						elements.title.setAttribute('style','color:' + _color);
 						elements.image.setAttribute('style','color:' + _color + ';fill:' + _color);
 					}
 				}
 			},
 			'padding': {
 				get: function(){
 					return _padding;
 				},
 				set: function(x){
 					_padding = (x)?true:false;
 					if(elements.content){
 						if(_padding){
 							elements.content.removeAttribute('style');
 						}else{
 							elements.content.setAttribute('style','padding:0;');
 						}
 						
 					}
 				}
 			},
 			'buttons': {
 				get: function(){
 					return _buttons;
 				},
 				set: function(x){
 					if(x instanceof Array){
 						_buttons = x.map(function(val){
 							var button = {};
 								button.text = (typeof val.text == 'string')?val.text:null;
 								button.callback = (val.callback instanceof Function)?val.callback:null;
 								button.backgroundColor = (typeof val.backgroundColor == 'string')?val.backgroundColor:null;
 								button.color = (typeof val.color == 'string')?val.color:null;
 								button.width = (typeof val.width == 'number')?val.width:null;
 							return button;
 						});
 						initButtons();
 					}else if(x instanceof Object){
 						var button = {};
							button.text = (typeof x.text == 'string')?x.text:null;
							button.callback = (x.callback instanceof Function)?x.callback:null;
							button.backgroundColor = (typeof x.backgroundColor == 'string')?x.backgroundColor:null;
							button.color = (typeof x.color == 'string')?x.color:null;
							button.width = (typeof x.width == 'number')?x.width:null;
						_buttons = [button];
						initButtons();
 					}else{
 						_buttons = [];
 						initButtons();
 					}
 				}
 			},
 			'closeOnClick': {
 				get: function(){
 					return _closeOnClick;
 				},
 				set: function(x){
 					_closeOnClick = (x)?true:false;
 				}
 			}
 		});

		setArgs(args);
 		init();

 		return Object.freeze(that);
 	}

 	function whichAnimationEvent(){
	    var t;
	    var el = document.createElement('fakeelement');
	    var transitions = {
	      'animation':'animationend',
	      'OAnimation':'oanimationend',
	      'MozAnimation':'animationend',
	      'WebkitAnimation':'webkitAnimationEnd',
	      '':'MSAnimationEnd'
	    };

	    for(t in transitions){
	        if( el.style[t] !== undefined ){
	            return transitions[t];
	        }
	    }
	}

 	window.ModalWidget = ModalWidget;
 })();