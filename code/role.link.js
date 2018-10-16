var roleLink = {

    transferUpgrade: function() {

        var mainLink = Game.spawns.Home.room.lookForAt('structure', 12, 14)[0];
        var upgradeLink = Game.spawns.Home.room.lookForAt('structure', 12, 14)[0];

        if(mainLink.energy == mainLink.energyCapacity) {
            transferEnergy(upgradeLink);
        }
    },

    refillMain: function() {

        var mainLink = Game.spawns.Home.room.lookForAt('structure', 12, 14)[0];
        var store = Game.spawns.Home.room.lookForAt('structure', 12, 14)[0];

        console.log('main link: ' + mainLink);
        console.log('main store: ' + store);

        if(mainLink.energy < mainLink.energyCapacity) {
            store.transfer(mainLink, RESOURCE_ENERGY);
        }

    }

}

module.exports = roleLink;