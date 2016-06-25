var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.canWork){
            var sources = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			})
			/*
			console.log('sources[0].store.length: ' + _.sum(sources[0].store));
			console.log('sources[1].store.length: ' + _.sum(sources[1].store));
			console.log('sources[2].store.length: ' + _.sum(sources[2].store));
			*/
			
			
            if(sources.length > 0) {
				if(_.sum(sources[0].store) >= _.sum(sources[2].store)) {
					var t = 0;
				} else {
					var t = 2;
				}
				console.log('Energy picked form container: ' + t);
			
                if(sources[t].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[t]);
                }
            }
        } else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER && structure.energy < 400 )  ) && structure.energy < structure.energyCapacity ;
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