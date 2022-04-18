export default function upgradeController(creep: Creep) {
    let controller = creep.room.controller;

    if (controller) {
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }
    } else {
        creep.say('❓');
    }
}