/* Basic methods for Creeps
** Checking essential states, such as carry energy or empty -> can work
*/

Creep.prototype.repair = function(wallHits) {
    
	/*
    var walls = this.room.find( FIND_STRUCTURES, {
        filter: function(structure) {
            return structure.structureType == 'constructedWall' && structure.hits < wallHits;
			return structure.structureType == 'road' && structure.hits < structure.hitsMax;
        }
    });
	*/
	
	
	
	
	/*
	var roads = this.room.find( FIND_STRUCTURES, {
        filter: function(structure) {
            return structure.structureType == 'road' && structure.hits < structure.hitsMax;
        }
    });
    
    console.log('walls left to repair: ' + walls.length);
	console.log('roads left to repair: ' + roads.length);
    */
    if(this.memory.canWork) {
        if(this.repair(walls[0]) == ERR_NOT_IN_RANGE) {
            this.moveTo(walls[0]);
        }
    }
    
    
};

Creep.prototype.refill = function(target) {
	if (!target) { target = 0 };
    if(this.memory.canWork) {
        return;
    }
    if(this.carry.energy < this.carryCapacity) {
        var sources = this.room.find(FIND_SOURCES);
            if(this.harvest(sources[target]) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources[target]);
            }
    }

    
}

Creep.prototype.isEmpty = function() {
    if(this.carry.energy > 0) {
        return false;
    }
    if(this.carry.energy == 0) {
        return true;
    }
}


Creep.prototype.isFull = function() {
    if(this.carry.energy == 0) {
        return false;
    }
    if(this.carry.energy == this.carryCapacity) {
        return true;
    }
}

Creep.prototype.canWork = function() {
    if(this.isFull() && !this.memory.canWork) {
        this.memory.canWork = true;
        return true;
    }
    if(this.isEmpty() && this.memory.canWork) {
        this.memory.canWork = false;
        return false;
    }
}


var protoCreep = {
    
};

module.exports = protoCreep;