export default function repairStructure(creep: Creep, damaged: AnyStructure[]) {
    if (creep.repair(damaged[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(damaged[0]);
    }
}