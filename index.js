/*
ZonesID: Bluebox-1023 | Caiman-1023 | mongos seems to be dependent on location, are the zone ids the same as orignal location?

Template IDs: Bluebox-88888888 | Caiman-99999999,99999991,99999992 | unknown for mongos
*/

const mobzone = [1023], //zone ids of mobs
	mobtemplate = [88888888];  //template ids of mobs, incl general rare mongo here (spawns anywhere)
	mongoloc[0] = [],	//[0]....[x]= position on the zone id, []=[smallmongoid,raremongoid,superiormongoid] => specific area mongos only.
	mongoloc[1] = []; //repeat lines for x number of zones 
							
	zonelist=[]; //zonelist, list of zone of where mongo is found, where zone is the zone in mongoloc.zone. 
	zoneid=[];//list of corresponding zone id to zonelist
	
	custommsg= 'Bluebox' //change custom message here
	
module.exports = function warnme(dispatch) {
	let zoneno,
		newmobtemplate,
		zonename;
	
	let enabled=false,
		alerted=false	
		mongo=true;
	
	dispatch.hook('C_CHAT', 1, event => {
		if(/^<FONT>!warn on<\/FONT>$/i.test(event.message)) {
			enabled=true,
			message('Warnme enabled');
		};
		
		if(/^<FONT>!warn off<\/FONT>$/i.test(event.message)) {
			enabled=false,
			message('Warnme disabled');
		};
		
		if(/^<FONT>!warn alert<\/FONT>$/i.test(event.message)) {
			if(!alerted) {
				alerted=true,
				message('Warnme alerts enabled');
			}
			else
				alerted=false,
				message('Warnme alerts disabled');
		};
		
		if(/^<FONT>!warn mongo<\/FONT>$/i.test(event.message)) {
			if(!mongo) {
				mongo=false,
				message('Warnme small mongo ignored');
			}
			else
				mongo=true,
				message('Warnme small mongo enabled');
		}; 
		
		if(event.message.includes('!warn'))
			return false;
	});
	
	dispatch.hook('S_LOAD_TOPO', 1, (event) => {      
		if(enabled && zoneid.includes(event.zone)) {
			zoneno=zoneid.indexOf(event.zone),
			zonename=zonelist[(zoneno)];
			message('Warnme entered mongo zone'+' '+zonename)
			newmobtemplate=((mongoloc[zoneno]).concat(mobtemplate))
		};
    });
	
	dispatch.hook('S_SPAWN_NPC', 3, (event) => {
		if(enabled && !mongo) {
			newmobtemplate.shift(),
		};
			
		if(enabled && (mobzone.includes(event.huntingZoneId) && mobtemplate.includes(event.templateId))) {		
			if(alerted) {
				notice('Found'+' '+custommsg),
				message('Found'+' '+custommsg);
			}
			else
				message('Found'+' '+custommsg);
		};
	});
	
		
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: '(Proxy)' + msg
		})
	};
	
	function notice(msg) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
            unk1: 2,
            unk2: 0,
            unk3: 0,
            message: '(Proxy)' + msg
        });
    };
};
