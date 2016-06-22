var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var protoCreep = require('proto.creep');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');

module.exports.loop = function () {
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);
	
	var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('Miners: ' + miners.length);
	
	var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    console.log('Transporters: ' + transporters.length);
    
    if(harvesters.length < 3) {
        var newName = Game.spawns.Home.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    
    if(upgraders.length < 7) {
        var newName = Game.spawns.Home.createCreep([CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    
    if(builders.length < 0) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    
    if(repairers.length < 1) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
    }
	
	if(miners.length < 1) {
        var newName = Game.spawns.Home.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'miner'});
        console.log('Spawning new miner: ' + newName);
    }
	
	if(transporters.length < 1) {
        var newName = Game.spawns.Home.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'transporter'});
        console.log('Spawning new transporter: ' + newName);
    }
    

    console.log('Room E23S28 has '+Game.rooms['E23S28'].energyAvailable+' energy');
	
    for(var name in Game.creeps) {
        

        var creep = Game.creeps[name];
        
        //check if they are empty
        creep.canWork();
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
        }
		if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
        }
		if(creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
        }
		
        if(creep.memory.role == 'repairer') {
            //creep.repair(Memory.toRepair[0]);
        }
		
    }
	

	
	/*
	var allRoadsAndWalls = Game.rooms['E23S28'].find( FIND_STRUCTURES, {
		filter:function(structure) {
    		return structure.structureType == "road" || 
				structure.structureType == "constructedWall";
		}});
	
	console.log('Roads & Walls: ' + allRoadsAndWalls.length);
	*/
	
	//console.log('Roads: ' + allRoadsAndWalls[road].length);
}
