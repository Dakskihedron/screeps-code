export default function runTower(tower: StructureTower) {
    let closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => { return (s instanceof StructureWall && s.hits < 10000 && s instanceof StructureWall) }
    });

    let closestDamagedStruct = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => { return (!(s instanceof StructureWall) && s.hits < s.hitsMax) }
    });

    let closestEnemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    let closestDamagedCreep = tower.pos.findClosestByRange(FIND_CREEPS, {
        filter: (c) => c.hits < c.hitsMax
    });

    if (closestDamagedWall) {
        tower.repair(closestDamagedWall);
    }

    if (closestDamagedStruct) {
        tower.repair(closestDamagedStruct);
    }

    if (closestEnemy) {
        tower.attack(closestEnemy);
    }

    if (closestDamagedCreep) {
        tower.heal(closestDamagedCreep);
    }
}