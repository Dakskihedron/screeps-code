export default function mineEnergy(creep: Creep) {
    let source = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (s) => { return s.id == creep.memory.sourceId } });
    if (source) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        } else {
            creep.harvest(source);
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => { return (s instanceof StructureContainer) } });
            if (container) {
                creep.transfer(container, RESOURCE_ENERGY);
            } else {
                creep.say('❓');
            }
        }
    } else {
        creep.say('❓');
    }
}