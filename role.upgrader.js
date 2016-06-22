var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /*
        if(!creep.canWork()) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        */
        if(creep.room.controller) {
            if(creep.memory.canWork) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(creep.room.controller);
                };
            }
        }
    }
};

module.exports = roleUpgrader;
