var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        creep.say('Harvester')
        if (!creep.memory.canWork) {
            //  creep.refill(0);
            var containers = creep.room.find(FIND_STRUCTURES,
                {
                    filter: {structureType: STRUCTURE_CONTAINER}
                });

            if (containers[0].transfer(creep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        }

        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN
                        || (structure.structureType === STRUCTURE_TOWER && structure.energy < 600))
                        && structure.energy < structure.energyCapacity;
                }
            });

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }

    },

    findTarget: function (creep, type) {

        var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === type);
            }
        })
        if (target.length > 0) {
            return target[0];
        } else {
            return false;
        }
    },
}

module.exports = roleHarvester;