var roleMiner2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('M2');
        if(!creep.memory.canWork) {
            creep.refill(0);
        }
        else {

            var containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
                {
                    filter: {structureType: STRUCTURE_CONTAINER}
                });

            if (containers.length > 0) {
                creep.transfer(containers[0], RESOURCE_ENERGY);
            }

            else {

                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
    }
}

module.exports = roleMiner2;