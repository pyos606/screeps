var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var protoCreep = require('proto.creep');

module.exports.loop = function () {
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    
    var wallers = _.filter(Game.creeps, (creep) => creep.memory.role == 'waller');
    console.log('Wallers: ' + wallers.length);
    
    if(harvesters.length < 3) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    
    if(upgraders.length < 10) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    
    if(builders.length < 0) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    
    if(wallers.length < 1) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'waller'});
        console.log('Spawning new waller: ' + newName);
    }
    

    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    for(var name in Game.creeps) {
        

        var creep = Game.creeps[name];
        
        //check if they are empty
        if(!creep.canWork() && creep.memory.role != 'harvester') {
            creep.refill();
        };
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'waller') {
            creep.repairWall(60000);
        }
    }
}
