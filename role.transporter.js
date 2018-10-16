var roleTransporter = {

    /** @param {Creep} creep **/
    refill: function(creep) {
        /*
        var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            })
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
            */

        if(Game.rooms.E23S28.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.rooms.E23S28.storage);
        }




    },

    transferSpawn: function() {

    },

    transferExtension: function () {

    },

    transferTower: function() {

    },

    transferStorage: function(creep) {
        if(!creep.memory.target) {
            creep.memory.target = roleTransporter.findTarget(creep, STRUCTURE_STORAGE);
        } else {
            var target = creep.memory.target;
            console.log('Actual target ID: ' + target.id);

            if(creep.transfer.target == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }

        }
    },

    findTarget: function(creep, type) {

        var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == type);
            }
        })
        if (target.length > 0) {
            return target[0];
        } else {
            return false;
        }
    },

    run: function(creep) {
        if(!creep.memory.canWork){
            roleTransporter.refill(creep);
        } else {

            //roleTransporter.transferStorage(creep);


            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER && structure.energy < 600 ) ) && structure.energy < structure.energyCapacity;
                }
            })
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }

            } else {
                var total = _.sum(Game.rooms.E23S28.storage.store);
                console.log('Storage: ' + total);

                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }});
                /*
                if (containers.length > 0) {

                    if(creep.transfer(containers[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                       creep.moveTo(containers[1]);

                    }
                } else {
                    if(creep.transfer(Game.rooms.E23S28.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E23S28.storage);
                    }
                }
                */

            }

        }
    }
};

module.exports = roleTransporter;