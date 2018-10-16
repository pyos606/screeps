var roleTower = {
    defend: function(roomName) {

        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);

        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    },

    repair: function(roomName) {
        var toRepair = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (structure) =>  {
                return (structure.hits < structure.hitsMax * 0.9 && structure.structureType != 'constructedWall' && structure.structureType != STRUCTURE_RAMPART);
            }
        });

        if(toRepair.length > 0) {
            console.log('To repair from tower: ' + toRepair.length);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach( tower => tower.repair(toRepair[0]));
        }

    }
};

module.exports = roleTower;