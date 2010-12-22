// *** particle ***
// --- inherits from game_object
// spec:
//  game_object spec

var particle = function(p, spec) {
    
    // --- defaults ---

    spec.width = spec.width || 10;
    spec.height = spec.height || 10;

    // obj to return
    var obj = game_object(p, spec);

    obj.get_type = function() {
        return "particle";
    };

    // --- private variables ---

    var alive = true;

    // --- public methods --- 

    // implementing game_object interface
    
    // update is default (move)

    // draw makes a small virus particle
    // (circle for now)
    obj.draw = function() {
        var pos = obj.get_pos();
        p.shapeMode(obj.mode);
        p.fill(100);
        p.noStroke();
        p.ellipse(pos.x, pos.y,
                obj.get_width(), obj.get_height());
    };

	// explodes this particle, if it is in the right state
	obj.fire = function() {
		
	}
	
    // is_dead just returns whether it isn't alive 
    obj.is_dead = function() {
        return !alive;
    };

    // which means we need a way to die
    obj.die = function() {
        alive = false;
    };

    return obj;
}
