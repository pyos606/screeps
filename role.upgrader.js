var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.canWork) {
            var sources = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			})
            if(sources.length > 0) {
                if(sources[1].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }
        }
		else {
            
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE ) {
				creep.moveTo(creep.room.controller);
			};
            
        }
    }
};

module.exports = roleUpgrader;
