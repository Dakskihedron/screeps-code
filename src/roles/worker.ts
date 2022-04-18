import collectDroppedEnergy from "../task/collectDroppedEnergy";
import collectEnergy from "../task/collectEnergy";
import transferEnergy from "../task/transferEnergy";
import upgradeController from "../task/upgradeController";

export default function roleWorker(creep: Creep) {
    if (creep.memory.doingTask && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.doingTask = false;
    }

    if (!creep.memory.doingTask && creep.store.getFreeCapacity() == 0) {
        creep.memory.doingTask = true;
    }

    if (creep.memory.doingTask) {
        let transferTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => { return (s instanceof StructureSpawn || s instanceof StructureExtension || s instanceof StructureTower)
                                        && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 }
        });

        if (transferTargets.length > 0) {
            transferEnergy(creep, transferTargets);
        } else {
            upgradeController(creep);
        }
    } else {
        collectDroppedEnergy(creep);
        collectEnergy(creep);
    }
}