export default function transferEnergy(creep: Creep, targets: AnyStructure[]) {
    let target = 0;
    for (let i=0; i < targets.length; i++) {
        if (targets[i] instanceof StructureSpawn) {
            target = i;
        }
    }
    if (creep.transfer(targets[target], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[target]);
    }
}