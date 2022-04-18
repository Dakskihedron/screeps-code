import collectEnergy from "../task/collectEnergy";
import upgradeController from "../task/upgradeController";

export default function roleUpgrader(creep: Creep) {
    if (creep.memory.doingTask && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.doingTask = false;
    }

    if (!creep.memory.doingTask && creep.store.getFreeCapacity() == 0) {
        creep.memory.doingTask = true;
    }

    if (creep.memory.doingTask) {
        upgradeController(creep);
    } else {
        collectEnergy(creep);
    }
}