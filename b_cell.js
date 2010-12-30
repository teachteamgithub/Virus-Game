// --- inherits from seeker.js
// spec:
//  game_object spec +
//  speed = how fast the tkiller approaches the target
//  target = cell to move towards
//  state = just leave to be default (alive)

var b_cell = function(p, spec) {
    
    // --- defaults ---

    spec.width = spec.width || 30;
    spec.height = spec.height || 30;
    spec.speed = spec.speed || 0.5;

    // obj to return
    var obj = seeker(p, spec);

    obj.get_type = function() {
        return "b_cell";
    };

    // --- private variables ---

    // state can be "alive", "active", "shooting", "dead"
    var state = spec.state || "alive";
	
	// Antibodies are created in update, and returned in get_antibodies()
	var new_antibodies = null;

	// --- private methods
	
	// Makes one antibody and adds it to new_antibodies
	var make_antibody = function() {
		if (!new_antibodies) {
			new_antibodies = [];
		}
		new_antibodies.push(antibody(p, {
			pos : obj.get_pos()
		}));
	}


    // --- public methods --- 

    obj.make_antibodies = function() {
        state = "shooting";
        obj.set_target(null);
        // production will happen in update
    };

    // to be called on collision with floater
    obj.activate = function() {
        state = "active";
        // send the bcell to the top
        obj.set_target(game_object(p, {
                pos: new p.PVector(p.width/2, 0)
        })); 
    };
	
	// Returns any newly created antibodies
	obj.get_antibodies = function() {
		if (new_antibodies) {
			var to_return = new_antibodies;
			new_antibodies = null;
			return to_return;
		}
		else {
			return [];
		}
	}
	
    obj.is_activated = function() {
        return state === "active";
    };

    obj.is_alive = function() {
        return state === "alive";
    };

    obj.should_scroll = function() {
        return state === "alive";
    };

    obj.set_state = function(s) {
        state = s;
    };

    obj.get_state = function() {
        return state;
    };

    // implementing game_object interface
    
    obj.my_update = function() {
        if (state === "shooting") {
            obj.stop();
            // make it face downwards
            obj.set_target_angle(p.PI/2);
			if (Math.random() < .2) {
				make_antibody();
			}
        }
        else {
            obj.move();
        }
    }

    // should point towards target
    // (triangle for now)
    obj.draw = function() {
        p.pushMatrix();
         
        var pos = obj.get_pos();
        var w = obj.get_width();
        var h = obj.get_height();
        p.shapeMode(obj.mode);
       
        p.translate(pos.x, pos.y);
        p.rotate(obj.get_target_angle());

        p.fill(obj.get_color());
        p.noStroke();

        // rightward triangle
        p.triangle(-w/2, -h/2, -w/2, h/2, w/2, 0);

        p.fill(255);
        p.ellipse(-w/4, 0, 10, 10);

        p.popMatrix();
    };


    // is_dead just returns whether it isn't alive 
    obj.is_dead = function() {
        return state === "dead";
    };

    // which means we need a way to die
    obj.die = function() {
        state = "dead";
    };

    return obj;
}
