import roleBuilder from './roles/builder';
import { roleFighter } from './roles/defender';
import roleExplorer from './roles/explorer';
import roleMiner from './roles/miner';
import roleUpgrader from './roles/upgrader';
import roleWorker from './roles/worker';
import runTower from './structures/tower';

export function loop() {
    for (let id in Memory.creeps) {
        if (!Game.creeps[id]) {
            delete Memory.creeps[id];
            console.log(id + ' was cleared from memory.');
        }
    }

    // Tower handling
    let towers = _.filter(Game.structures, (s) => s instanceof StructureTower);
    for (let i = 0; i < towers.length; i++) {
        runTower(towers[i] as StructureTower);
    }

    // Worker spawning
    let workers = _.filter(Game.creeps, (c) => c.memory.role == 'worker');
    if (workers.length < 4) {
        Game.spawns['Alpha'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Worker ' + Game.time, { memory: { role: 'worker', doingTask: true } });
    }

    // Builder spawning
    let builders = _.filter(Game.creeps, (c) => c.memory.role == 'builder');
    if (builders.length < 2) {
        Game.spawns['Alpha'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'Builder ' + Game.time, { memory: { role: 'builder', doingTask: true } });
    }

    // Upgrader spawning
    let upgraders = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader');
    if (upgraders.length < 4) {
        Game.spawns['Alpha'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Upgrader ' + Game.time, { memory: { role: 'upgrader', doingTask: true } });
    }

    // Miner spawning
    let miners = _.filter(Game.creeps, (c) => c.memory.role == 'miner');
    if (miners.length < 2) {
        let assigned = miners.map((c) => c.memory.sourceId);
        let sources = Game.rooms['W5N8'].find(FIND_SOURCES).map((s) => s.id);
        for (let i=0; i < sources.length; i++) {
            if (!assigned.includes(sources[i])) {
                Game.spawns['Alpha'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], 'Miner ' + Game.time, { memory: { role: 'miner', sourceId: sources[i] } });
            }
        }
    }

    // Fighter spawning
    let fighters = _.filter(Game.creeps, (c) => c.memory.role == 'fighter');
    if (fighters.length < 4) {
        Game.spawns['Alpha'].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE], 'Fighter ' + Game.time, { memory: { role: 'fighter' } });    
    }

    // let snipers = _.filter(Game.creeps, (c) => c.memory.role == 'sniper');
    // if (snipers.length < 2) {
    //     Game.spawns['Alpha'].spawnCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE], 'Sniper' + Game.time, { memory: { role: 'sniper' } });
    // }



    console.log(`Workers: ${workers.length}\nBuilders: ${builders.length}\nUpgraders: ${upgraders.length}\nMiners: ${miners.length}\nFighters: ${fighters.length}`);

    // Role handling
    for (let id in Game.creeps) {
        let creep = Game.creeps[id]
        switch (creep.memory.role) {
            case 'miner':
                roleMiner(creep);
                break;
            case 'worker':
                roleWorker(creep);
                break;
            case 'upgrader':
                roleUpgrader(creep);
                break;
            case 'builder':
                roleBuilder(creep);
                break;
            case 'fighter':
                roleFighter(creep);
                break;
            case 'explorer':
                roleExplorer(creep);
                break;
        }
    }
}