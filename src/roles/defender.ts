export function roleFighter(creep: Creep) {
    let hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (hostile) {
        if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hostile);
        }
    } else {
        creep.moveTo(Game.flags['Rally']);
    }
}

export function roleSniper(creep: Creep) {
    let hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (hostile) {
        if (creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3)) {
            creep.rangedAttack(hostile);
        } else {
            creep.moveTo(hostile);
        }
    } else {
        creep.moveTo(Game.flags['Rally']);
    }
}