var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.canWork) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
				var repairs = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.hits < structure.hitsMax * 0.9 && structure.structureType != 'constructedWall');
					}
											  
				});
				console.log('Constructions to repair: ' + repairs.length);
				if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
				   creep.moveTo(repairs[0]);
				}
			}
        }
        else {
			/*
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
			*/
			
			var sources = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			})
			
			
            if(sources.length > 0) {
                if(sources[2].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[2]);
                }
            }
			
        }
    }
};

module.exports = roleBuilder;
