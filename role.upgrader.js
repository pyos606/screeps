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
    },
	
	repairWall: function(creep, hits) {
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
            
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == 'constructedWall' && structure.hits < hits);
				}
			})
			if(targets.length > 0) {
				console.log('Wall to repair: ' + targets.length);
				if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE ) {
					creep.moveTo(targets[0]);
				}
			} else {
				roleUpgrader.run(creep);
			}
        }
	},
	
	build: function (creep) {
		if(creep.memory.canWork) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length > 0) {
				console.log('Constructions to build: ' + targets.length);
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
				   creep.moveTo(targets[0]);
				}
			} else {
				roleUpgrader.repairWall(creep, 60000);
			}
		} else {
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
	}
};

module.exports = roleUpgrader;
