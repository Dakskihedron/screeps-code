export default function buildStructure(creep: Creep, sites: ConstructionSite<BuildableStructureConstant>[]) {
    if (sites.length > 0) {
        let site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        for (let i=0; i < sites.length; i++) {
            if (sites[i] instanceof StructureTower) {
                site = sites[i];
            }
        }

        if (creep.build(site!) == ERR_NOT_IN_RANGE) {
            creep.moveTo(site!);
        }
    }
}