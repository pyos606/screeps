var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.canWork){
            var sources = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			})
            if(sources.length > 0) {
                if(sources[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        } else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			})
			if(targets[1]) {
				if(creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.moveTo(targets[1]);
				}
			}
		}
    }
};

module.exports = roleTransporter;