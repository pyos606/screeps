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
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
				}
			})
			if(targets.length > 0) {
				if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.moveTo(targets[0]);
				}
			} else {
				var containers = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}});
				if (containers.length > 0) {
					if(creep.transfer(containers[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.moveTo(containers[1]);
					}
				}	
			
			}
		}
    }
};

module.exports = roleTransporter;