export default function collectEnergy(creep: Creep) {
    if (creep.store.getFreeCapacity() > 0) {
        let closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
        let closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => { return (s instanceof StructureContainer || s instanceof StructureStorage)
                                && s.store[RESOURCE_ENERGY] && s.store.getCapacity() > 500 }
        });

        if (closestContainer) {
            if (creep.withdraw(Game.getObjectById(closestContainer.id as Id<any>), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(closestContainer.id as Id<any>));
            }
        } else if (closestSource) {
            if (creep.harvest(Game.getObjectById(closestSource.id as Id<any>)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(closestSource.id as Id<any>));
            }  
        } else {
            creep.say('❓');
        }
    }
}