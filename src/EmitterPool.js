function EmitterPool() {
	var emitterPool = new Array();
	
	this.CleanEmitterPool = function() {
		emitterPool = [];
	}
	this.PutEmitterToPool = function (emitter) {
		emitter.m_active = false;
	}
	this.GetEmitterFromPool = function (path, layer) {
		var tempEmitter;
		if (emitterPool[path] == null) {
			emitterPool[path] = [];
		}
		else {
			for (var i=0; i<emitterPool[path].length; i++) {
				if (emitterPool[path][i].m_active == false && emitterPool[path][i].m_layer == layer) {
					tempEmitter = emitterPool[path][i];
					break;
				}
			}
		}
		
		if (!tempEmitter) {
			tempEmitter = cc.ParticleSystem.create (path);
			tempEmitter.retain();
			tempEmitter.m_layer = layer;
			tempEmitter.m_layer.addChild(tempEmitter);
			emitterPool[path].push(tempEmitter);
		}
		
		tempEmitter.m_active = true;
		tempEmitter.resetSystem();
		return tempEmitter;
	}
}

var g_emitterPool = new EmitterPool();