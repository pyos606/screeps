var roleMiner = {

    /** @param {Creep} creep **/
  run: function(creep) {
        if(!creep.memory.canWork) {
            /*
			var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
			*/
			creep.refill(1);
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

module.exports = roleMiner;