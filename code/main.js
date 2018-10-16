var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var protoCreep = require('proto.creep');
var roleMiner = require('role.miner');
var roleMiner2 = require('role.miner2');
var roleTransporter = require('role.transporter');
var roleTower = require('role.tower');
var roleLink = require('role.link');
var roleStorer = require('role.storer');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    console.log('Builders: ' + builders.length);

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    console.log('Repairers: ' + repairers.length);

    var miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
    console.log('Miners: ' + miners.length);

    var miners2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner2');
    console.log('Miners2: ' + miners2.length);

    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role === 'transporter');
    console.log('Transporters: ' + transporters.length);

    var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role === 'soldier');
    console.log('Soldiers: ' + soldiers.length);

    var storers = _.filter(Game.creeps, (creep) => creep.memory.role === 'storer');
    console.log('Storers: ' + storers.length);

    if (harvesters.length < 1) {
        var harvester = Game.spawns.Home.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + harvester);
    }

    if (upgraders.length < 8) {
        var upgrader = Game.spawns.Home.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
            undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + upgrader);
    }

    if (builders.length < 2) {
        var builder = Game.spawns.Home.createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + builder);
    }

    if (repairers.length < 0) {
        var repairer = Game.spawns.Home.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + repairer);
    }

    if (miners.length < 3) {
        var miner = Game.spawns.Home.createCreep([WORK, CARRY, MOVE], undefined, {role: 'miner'});
        console.log('Spawning new miner: ' + miner);
    }

    if (miners2.length < 3) {
        var miner2 = Game.spawns.Home.createCreep([WORK, CARRY, MOVE], undefined, {role: 'miner2'});
        console.log('Spawning new miner2: ' + miner2);
    }

    if (transporters.length < 0) {
        var transporter = Game.spawns.Home.createCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            undefined, {role: 'transporter'});
        console.log('Spawning new transporter: ' + transporter);
    }
    /*
    if(transporters.length < 1) {
        var newName = Game.spawns.Home.createCreep([MOVE,MOVE,CARRY,CARRY], undefined, {role: 'transporter'});
        console.log('Spawning new transporter: ' + newName);
    }
	*/
// 	if(soldiers.length < 0) {
//         var newName = Game.spawns.Home.createCreep([ATTACK,TOUGH,MOVE,ATTACK,TOUGH,MOVE,ATTACK,TOUGH,MOVE,ATTACK,TOUGH,MOVE,ATTACK,TOUGH,MOVE], undefined, {role: 'soldiers'});
//         console.log('Spawning new solder: ' + newName);
//     }
    if (storers.length < 1) {
        var newName = Game.spawns.Home.createCreep([MOVE, CARRY, CARRY], undefined, {role: 'storer'});
        console.log('Spawning new storer: ' + newName);
    }

    console.log('Room E2N22 has ' + Game.rooms['E2N22'].energyAvailable + ' energy');

    for (var name in Game.creeps) {


        var creep = Game.creeps[name];

        //check if they are empty
        creep.canWork();

        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
            //roleUpgrader.repairWall(creep, 100000);
            //roleUpgrader.build(creep);
        }
        if (creep.memory.role === 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role === 'miner2') {
            roleMiner2.run(creep);
        }
        if (creep.memory.role === 'transporter') {
            roleTransporter.run(creep);
        }

        if (creep.memory.role === 'repairer') {
            //creep.repair(Memory.toRepair[0]);
            roleBuilder.run(creep);
        }

        if (creep.memory.role === 'solder') {
            //creep.repair(Memory.toRepair[0]);
            roleBuilder.run(creep);
        }


        if (creep.memory.role === 'storer') {
            //creep.repair(Memory.toRepair[0]);
            roleStorer.run(creep);
        }


    }

// 	roleTower.defend('E2N22');
// 	roleTower.repair('E2N22');


// 	roleLink.refillMain();

// 	roleLink.transferUpgrade();


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


