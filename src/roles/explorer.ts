export default function roleExplorer(creep: Creep) {
    let destination = new RoomPosition(9, 39, 'W4N8')
    if (creep.room.name != 'W4N8') {
        creep.moveTo(destination);
    } else {
        let controller = creep.room.controller!;
        if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }
    }
}