var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
		if(!creep.memory.canWork) {
			var containers = creep.room.find(FIND_STRUCTURES, 
				{
					filter: {structureType: STRUCTURE_CONTAINER}
				});
			console.log('containers[0].store.length: ' + containers[0].store.length);
			console.log('containers[1].store.length: ' + containers[1].store.length);
			console.log('containers[2].store.length: ' + containers[2].store.length);
			
			if(containers[0].store.length > containers[2].store.length) {
				var t = 0;
			}
			else {
				var t = 1;
			}
			if( containers[t].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
				creep.moveTo(containers[t]);
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
				creep.moveTo(targets[0]);
			}
        }
        
    }
}

module.exports = roleHarvester;