/*
	Swap position with animation Lib
	by Urushibara
*/
jQuery.fn.swapAnimate = function(elem, option) {
	var elem1 = this,
		elem2 = elem;
	if(!elem1 || !elem2 || elem1.length==0 || elem2.length==0) return elem;
	if(elem2 && elem2.parentNode) elem2 = jQuery(elem2);
	var args = jQuery.extend(
			{
				speed1: 400,
				easing1: 'swing',
				speed2: 400,
				easing2: 'swing',
				zIndex1: 100,
				zIndex2: 100,
				dock_auto: true,
				before_dock: undefined,
				done: undefined,
				from_position: elem1.offset(),
				to_position: elem2.offset()
			},
			option
		),
		css1pos = elem1.css("position"),
		css2pos = elem2.css("position"),
		pos1 = { position: "relative", left: args.from_position.left - args.to_position.left, top: args.from_position.top - args.to_position.top },
		pos2 = { position: "relative", left: args.to_position.left - args.from_position.left, top: args.to_position.top - args.from_position.top }
	;
	if(option && option.speed){
		args.speed1 = option.speed;
		args.speed2 = option.speed;
	}
	if(option && option.easing){
		args.easing2 = option.easing;
		args.easing2 = option.easing;
	}
	if(option && option.zIndex){
		args.zIndex1 = option.zIndex;
		args.zIndex2 = option.zIndex;
	}
	elem1.css('z-index', args.zIndex1);
	elem2.css('z-index', args.zIndex2);
	return jQuery.when(
		elem1.animate(pos2, args.speed1, args.easing1),
		elem2.animate(pos1, args.speed2, args.easing2)
	)
	.done(function(){
		if(typeof args.before_dock == 'function') args.before_dock.call(elem1, elem2);
		if(args.dock_auto){
			var pre1, parent1 = elem1[0].parentNode,
				pre2, parent2 = elem2[0].parentNode,
				i;
			for(i=1; i<parent1.childNodes.length; i++){
				if(parent1.childNodes[i] == elem1[0]){
					pre1 = parent1.childNodes[i-1];
					break;
				}
			}
			for(i=1; i<parent2.childNodes.length; i++){
				if(parent2.childNodes[i] == elem2[0]){
					pre2 = parent2.childNodes[i-1];
					break;
				}
			}
			if(pre1){
				pre1.after(elem2[0]);
			} else {
				parent1.prepend(elem2[0]);
			}
			if(pre2){
				pre2.after(elem1[0]);
			} else {
				parent2.prepend(elem1[0]);
			}
			elem1.css("top","").css("left","").css('z-index', "").css("position", css1pos);
			elem2.css("top","").css("left","").css('z-index', "").css("position", css2pos);
		}
		if(typeof args.done == 'function') args.done.call(elem1, elem2);
	});
};
