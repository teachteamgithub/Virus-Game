// *** floater ***
// --- inherits from game_object
// spec:
//  game_object spec

var floater = function(p, spec) {
    
    // --- defaults ---

    spec.width = spec.width || 30;
    spec.height = spec.height || 50;
    spec.vel = new p.PVector(0, 0.1);

    // obj to return
    var obj = game_object(p, spec);

    obj.get_type = function() {
        return "floater";
    }

    // --- private variables ---
    
    // how far up or down it can move
    var range = 40;
    var btm_lim = obj.get_pos().y + range;
    var top_lim = obj.get_pos().y - range;

    // --- public methods --- 

    // implementing game_object interface
    
    obj.update = function() {
        // if we reach a limit
        var y = obj.get_pos().y;
        if (y <= top_lim || y >= btm_lim) {
            // turn around
            var v = obj.get_vel();
            obj.set_vel(new p.PVector(v.x, -v.y));
        }
        obj.move();
    }

    // (rectangle for now)
    obj.draw = function() {
        var pos = obj.get_pos();
        p.shapeMode(obj.mode);

        p.fill(50);

        p.stroke(0);
        p.strokeWeight(1);

        p.rect(pos.x, pos.y,
                obj.get_width(), obj.get_height());
    }

    obj.is_dead = function() {
        return false;
    }

    return obj;
}
