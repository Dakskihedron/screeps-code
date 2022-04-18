export default function collectDroppedEnergy(creep: Creep) {
    let dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY}});
    if (dropped) {
        if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropped);
        }
    }
}