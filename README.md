# jquery.swapAnimate.js

Simple useage:
``$("#elem1").swapAnimate($("#elem2"));``

Options:
``$("#elem1").swapAnimate($("#elem2")[, { <option>:<value> [, <option>:<value>...] } ]);``

- **speed** *Number* default: 400 - Set both animation speed. please refer to [jQuery.animate](http://api.jquery.com/animate/)
- **speed1** *Number* default: 400 - If you need, set a part of value
- **speed2** *Number* default: 400 - If you need, set a part of value
- **easing** *String* default: 'swing' - Set both animation easing type. please refer to [jQuery.animate](http://api.jquery.com/animate/)
- **easing1** *String* default: 'swing' - If you need, set a part of easing type.
- **easing2** *String* default: 'swing' - If you need, set a part of easing type.
- **zIndex** *Number* default: 100 - Set both z-index for the helper while being animation
- **zIndex1** *Number* default: 100 - Set a part of value
- **zIndex2** *Number* default: 100 - Set a part of value
- **dock_auto** *Boolean* default true - Set true to dock the swapped parents after animation.
- **before_dock** *function(elem1, elem2)* default: undefined - Catch event for before docking.
- **done** *function(elem1, elem2)* default: undefined - Catch event for after docking.
- **from_position** *Object:{left, top}* default: elem1.offset() - Set animate position for element2
- **to_position** *Object:{left, top}* default: elem2.offset() - Set animate position for element1


```html:
<html>
<head>
<link rel="stylesheet" href="style.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="jquery.swapAnimate.js"></script>

<script>

$(function(){

	$("#swap").on('click', function(){
		$(".A").swapAnimate($(".B"));
	});

});

**sample**

</script>
</head>

<body>
<button id="swap">swap A and B</button>
<hr>
<div class="box A">A</div>
<div class="box B">B</div>
</body>
</html>
```

**Draggable sample**

```html:
<html>
<head>
<link rel="stylesheet" href="style.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="jquery.swapAnimate.js"></script>

<script>

var original_pos = {};

$(function(){

	$("#swap").on('click', function(){
		$(".A").swapAnimate($(".B"));
	});
	$("#swap2").on('click', function(){
		$(".B").swapAnimate($(".C"));
	});
	$("#swap3").on('click', function(){
		$(".C").swapAnimate($(".A"));
	});

	$(".box").draggable({
		zIndex: 100,
		start: function(e){
			original_pos = $(this).offset(); // Store Original Position
		}
	});
	$(".FLAME").droppable({
		drop: function(e){
			$(e.toElement).swapAnimate(
				$(e.target).find(".box"),
				{
					from_position: original_pos, // $(e.target).find(".box") will move this Position
					speed1: 100,
					easing2: "easeOutBack"
				}
			);
		},
		deactivate: function(e){
			$(e.toElement).css({left: 0, top: 0});
		},
		hoverClass: "hover"
	});

});

</script>

</head>

<body>
<div>
<button id="swap">swap A and B</button>
<button id="swap2">swap B and C</button>
<button id="swap3">swap C and A</button>
</div>
<hr>
<div class="box A">A</div>
<div class="FLAME2">
<div class="FLAME">Droppable
	<div class="box B">B</div>
</div>
<div class="box C">C</div>
</div>

</body>

</html>
```
