import buildStructure from "../task/buildStructure";
import collectEnergy from "../task/collectEnergy";
import transferEnergy from "../task/transferEnergy";

export default function roleBuilder(creep: Creep) {
    if (creep.memory.doingTask && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.doingTask = false;
    }

    if (!creep.memory.doingTask && creep.store.getFreeCapacity() == 0) {
        creep.memory.doingTask = true;
    }

    if (creep.memory.doingTask) {
        let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length > 0) {
            buildStructure(creep, constructionSites);
        } else {
            let transferTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => { return (s instanceof StructureTower || s instanceof StructureExtension) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 }
            });
    
            if (transferTargets.length > 0) {
                transferEnergy(creep, transferTargets);
            } else {
                creep.moveTo(Game.flags['Idle']);
            }
        }
    } else {
        collectEnergy(creep);
    }
}