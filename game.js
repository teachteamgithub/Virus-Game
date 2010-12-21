// *** game ***

var game = function (p) {

    // object to return
    var obj = {};

    // --- constants ---
    var num_of_render_levels = 5;
    
    // --- private variables ---

    var curr_state = "Splash"; //Splash, Game, Pause, Help
    var distance = 0; //x-coordinate of the total distance travelled
    var score = 0;
    
    //Initialize to be a list of num_of_render_levels empty lists
    var game_objects = [];
    for (var i = 0; i < num_of_render_levels; i++) {
        game_objects[i] = [];
    }
    
    //A mapping from game_object types to their rendering levels
    var type_to_level = {"background":0, "particle":1, "cell":2, "wall_cell":2,
	                       "empty_cell":2, "floater":3, "tkiller":3, "info":4}; 
    
    // --- private methods ---
    handle_collision = function(obj1, obj2) {};
	
	//Removes all objs which are either off screen or dead
	remove_objs = function() {
		var filter_fun = function(x) {
            return (! x.off_screen() && ! x.is_dead())
        };  
        for (lst_of_o in game_objects) {
			lst_of_o = lst_of_o.filter(filter_fun);
        }
	};
    
    // --- public methods ---

    //Calls update() on every obj
	//after updating, calls remove_objs
    obj.update_all_objects = function() {
        for (lst_of_o in game_objects) {
            for (o in lst_of_o) {
                o.update();
            }
        }
		
		remove_objs();
    };
    
    //Handles a mouse click at x, y according to which state we are in
    obj.mouse_click= function (x, y) {
        switch (curr_state) {
            case "Splash":
                break;          
            case "Game":
                break;
            case "Pause":
                break;
            case "Help":
                break;
        }
    };
    
    //Calls draw() on every obj
    obj.render = function(){
        for (lst_of_o in game_objects) {
            for (o in lst_of_o) {
                o.draw();
            }
        }
    };
    
    //Checks whether any 2 objs are colliding, and if so calls handle_collision on them
    obj.check_collisions = function() {};
    
    //Adds a game_object to the game world
    obj.add_object = function(o) {
        var type = o.get_type();
        var render_level = type_to_level[type];
        game_objects[render_level].push(o);
    };
    
    return obj;
};