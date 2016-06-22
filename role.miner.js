var roleMiner = {

    /** @param {Creep} creep **/
  run: function(creep) {
	if(!creep.memory.canWork) {
		creep.refill(1);
	}
	else {
		var containers = creep.pos.findInRange(FIND_STRUCTURES, 4, 
			{
				filter: {structureType: STRUCTURE_CONTAINER}
			});
		
		console.log('Container hits: ' + containers[0].hits + ', Max: ' + containers[0].hitsMax);
		/*
		if(containers[0].hits < containers[0].hitsMax * 0.99 && !creep.isEmpty()) {
			if(creep.repair(containers[0]) == ERR_NOT_IN_RANGE ) {
				creep.moveTo(containers[0]);
			}
		} else {
			creep.repair(containers[0]);
			creep.transfer(containers[0], RESOURCE_ENERGY);
			
		}
		*/
		creep.repair(containers[0]);
		creep.transfer(containers[0], RESOURCE_ENERGY);
	}
}
}

module.exports = roleMiner;