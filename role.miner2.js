var roleMiner2 = {

    /** @param {Creep} creep **/
  run: function(creep) {
	if(!creep.memory.canWork) {
		creep.refill(0);
	}
	else {
		var containers = creep.pos.findInRange(FIND_STRUCTURES, 1, 
			{
				filter: {structureType: STRUCTURE_CONTAINER}
			});
		
		creep.transfer(containers[0], RESOURCE_ENERGY);
	}
}
}

module.exports = roleMiner2;