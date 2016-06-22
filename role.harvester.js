var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
		if(!creep.memory.canWork) {
			var containers = creep.room.find(FIND_STRUCTURES, 
				{
					filter: {structureType: STRUCTURE_CONTAINER}
				});
			if( containers[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
				creep.moveTo(containers[0]);
			}
		}
			
		else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
				creep.moveTo(Game.spawns.Home);
			}
        }
        
    }
}

module.exports = roleHarvester;