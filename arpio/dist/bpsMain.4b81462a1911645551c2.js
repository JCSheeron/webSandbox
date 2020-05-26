/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "4b81462a1911645551c2";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bpsMain": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: fetchEvent, fetchEventList, fetchStartTimes, fetchEndTimes, fetchTriggers, addStartTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchEvent\", function() { return fetchEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchEventList\", function() { return fetchEventList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchStartTimes\", function() { return fetchStartTimes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchEndTimes\", function() { return fetchEndTimes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTriggers\", function() { return fetchTriggers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addStartTime\", function() { return addStartTime; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n// Api logic\n// // Funcitons to fetch data from api\n // import { inspect } from 'util'; // console.log of objects\n\nvar fetchEvent = function fetchEvent(eventId) {\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(\"/api/events/\".concat(eventId)).then(function (resp) {\n    // console.log('axios resp from api fetchEvent');\n    // console.log(\n    //  inspect(resp, { showHidden: false, depth: null, colors: true })\n    //);\n    return resp.data;\n  });\n};\nvar fetchEventList = function fetchEventList() {\n  // axios returns a promise\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/events').then(function (resp) {\n    return resp.data.events;\n  });\n};\nvar fetchStartTimes = function fetchStartTimes(eventId) {\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(\"/api/events/\".concat(eventId, \"/startTimes\")).then(function (resp) {\n    // console.log('axios resp from api fetchStartTimes');\n    // console.log(\n    //  inspect(resp, { showHidden: false, depth: null, colors: true })\n    //);\n    return resp.data;\n  });\n};\nvar fetchEndTimes = function fetchEndTimes(eventId) {\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(\"/api/events/\".concat(eventId, \"/endTimes\")).then(function (resp) {\n    // console.log('axios resp from api fetchEndTimes');\n    // console.log(\n    //  inspect(resp, { showHidden: false, depth: null, colors: true })\n    //);\n    return resp.data;\n  });\n};\nvar fetchTriggers = function fetchTriggers(eventId) {\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(\"/api/events/\".concat(eventId, \"/triggers\")).then(function (resp) {\n    // console.log('axios resp from api fetchTriggers');\n    // console.log(\n    //  inspect(resp, { showHidden: false, depth: null, colors: true })\n    //);\n    return resp.data;\n  });\n};\nvar addStartTime = function addStartTime(startTime, eventId) {\n  console.log(\"api.js addStartTime.\\n    startTime: \\n    \".concat(inspect(startTime, {\n    showHidden: false,\n    depth: null,\n    colors: true\n  }), \"\\n    eventId: \").concat(eventId));\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/events/startTimes', {\n    startTime: startTime,\n    eventId: eventId\n  }).then(function (resp) {\n    return resp.data;\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS5qcz9kNzIyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEFwaSBsb2dpY1xuLy8gLy8gRnVuY2l0b25zIHRvIGZldGNoIGRhdGEgZnJvbSBhcGlcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG4vLyBpbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCc7IC8vIGNvbnNvbGUubG9nIG9mIG9iamVjdHNcblxuZXhwb3J0IGNvbnN0IGZldGNoRXZlbnQgPSAoZXZlbnRJZCkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KGAvYXBpL2V2ZW50cy8ke2V2ZW50SWR9YCkudGhlbigocmVzcCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdheGlvcyByZXNwIGZyb20gYXBpIGZldGNoRXZlbnQnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgaW5zcGVjdChyZXNwLCB7IHNob3dIaWRkZW46IGZhbHNlLCBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pXG4gICAgLy8pO1xuICAgIHJldHVybiByZXNwLmRhdGE7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRXZlbnRMaXN0ID0gKCkgPT4ge1xuICAvLyBheGlvcyByZXR1cm5zIGEgcHJvbWlzZVxuICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL2V2ZW50cycpLnRoZW4oKHJlc3ApID0+IHJlc3AuZGF0YS5ldmVudHMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoU3RhcnRUaW1lcyA9IChldmVudElkKSA9PiB7XG4gIHJldHVybiBheGlvcy5nZXQoYC9hcGkvZXZlbnRzLyR7ZXZlbnRJZH0vc3RhcnRUaW1lc2ApLnRoZW4oKHJlc3ApID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnYXhpb3MgcmVzcCBmcm9tIGFwaSBmZXRjaFN0YXJ0VGltZXMnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgaW5zcGVjdChyZXNwLCB7IHNob3dIaWRkZW46IGZhbHNlLCBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pXG4gICAgLy8pO1xuICAgIHJldHVybiByZXNwLmRhdGE7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoRW5kVGltZXMgPSAoZXZlbnRJZCkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KGAvYXBpL2V2ZW50cy8ke2V2ZW50SWR9L2VuZFRpbWVzYCkudGhlbigocmVzcCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdheGlvcyByZXNwIGZyb20gYXBpIGZldGNoRW5kVGltZXMnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgaW5zcGVjdChyZXNwLCB7IHNob3dIaWRkZW46IGZhbHNlLCBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pXG4gICAgLy8pO1xuICAgIHJldHVybiByZXNwLmRhdGE7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVHJpZ2dlcnMgPSAoZXZlbnRJZCkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KGAvYXBpL2V2ZW50cy8ke2V2ZW50SWR9L3RyaWdnZXJzYCkudGhlbigocmVzcCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdheGlvcyByZXNwIGZyb20gYXBpIGZldGNoVHJpZ2dlcnMnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgaW5zcGVjdChyZXNwLCB7IHNob3dIaWRkZW46IGZhbHNlLCBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pXG4gICAgLy8pO1xuICAgIHJldHVybiByZXNwLmRhdGE7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFN0YXJ0VGltZSA9IChzdGFydFRpbWUsIGV2ZW50SWQpID0+IHtcbiAgY29uc29sZS5sb2coYGFwaS5qcyBhZGRTdGFydFRpbWUuXG4gICAgc3RhcnRUaW1lOiBcbiAgICAke2luc3BlY3Qoc3RhcnRUaW1lLCB7IHNob3dIaWRkZW46IGZhbHNlLCBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pfVxuICAgIGV2ZW50SWQ6ICR7ZXZlbnRJZH1gKTtcbiAgcmV0dXJuIGF4aW9zXG4gICAgLnBvc3QoJy9hcGkvZXZlbnRzL3N0YXJ0VGltZXMnLCB7IHN0YXJ0VGltZSwgZXZlbnRJZCB9KVxuICAgIC50aGVuKChyZXNwKSA9PiByZXNwLmRhdGEpO1xufTtcblxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/api.js\n");

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _HeaderComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HeaderComponent */ \"./src/components/HeaderComponent.js\");\n/* harmony import */ var _EventList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventList */ \"./src/components/EventList.js\");\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Event */ \"./src/components/Event.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api */ \"./src/api.js\");\n/* harmony import */ var _testData1_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../testData1.json */ \"./src/testData1.json\");\nvar _testData1_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../testData1.json */ \"./src/testData1.json\", 1);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n // import { inspect } from 'util'; //console.log of objects\n// components\n\n\n\n // import api\n\n // simulate data that will eventually come from elsewhere\n\n // Use browser history. HTML5 window.history supported on most browsers\n// Put it in a function so if it needs to change, only the innerds of\n// the function need to change.\n\nvar pushState = function pushState(obj, url) {\n  return window.history.pushState(obj, '', url);\n};\n\nvar onPopState = function onPopState(handler) {\n  window.onpopstate = handler;\n};\n\nvar App = /*#__PURE__*/function (_React$Component) {\n  _inherits(App, _React$Component);\n\n  var _super = _createSuper(App);\n\n  // State using a constructor\n  function App(props) {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _super.call(this, props);\n\n    _defineProperty(_assertThisInitialized(_this), \"fetchEvent\", function (eventId) {\n      // push the event to browser history (which makes it current and adds it to history)\n      pushState({\n        currentEventId: eventId\n      }, \"/events/\".concat(eventId)); // Now look up the event\n      // using the api\n\n      _api__WEBPACK_IMPORTED_MODULE_5__[\"fetchEvent\"](eventId).then(function (dataObj) {\n        _this.setState(function (prevState) {\n          return {\n            arpiData: _objectSpread(_objectSpread({}, prevState.arpiData), {}, {\n              currentEventId: dataObj.currentEventId,\n              events: _objectSpread(_objectSpread({}, prevState.arpiData.events), {}, _defineProperty({}, dataObj.currentEventId, events[dataObj.currentEventId]))\n            })\n          };\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"fetchEventList\", function () {\n      // Clear the event id from browser, which removes is and adds a\n      // non-id entry to the history\n      pushState({\n        currentEventId: null\n      }, '/');\n      _api__WEBPACK_IMPORTED_MODULE_5__[\"fetchEventList\"]().then(function (events) {\n        _this.setState(function (prevState) {\n          return {\n            arpiData: _objectSpread(_objectSpread({}, prevState.arpiData), {}, {\n              currentEventId: null,\n              events: events\n            })\n          };\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"fetchStartTimes\", function (eventId) {\n      _api__WEBPACK_IMPORTED_MODULE_5__[\"fetchStartTimes\"](eventId).then(function (startTimes) {\n        _this.setState(function (prevState) {\n          return {\n            arpiData: _objectSpread(_objectSpread({}, prevState.arpiData), {}, {\n              events: _objectSpread(_objectSpread({}, prevState.arpiData.events), {}, _defineProperty({}, eventId, _objectSpread(_objectSpread({}, prevState.arpiData.events[eventId]), {}, {\n                startTimes: startTimes\n              })))\n            })\n          };\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"currentEvent\", function () {\n      return _this.state.arpiData.events[_this.state.currentEventId];\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"pageHeader\", function () {\n      if (_this.state.currentEventId) {\n        return _this.currentEvent().name;\n      }\n\n      return 'Event List';\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"addStartTimes\", function (newStartTime, eventId) {\n      // use api method to add a start time to the event start times\n      _api__WEBPACK_IMPORTED_MODULE_5__[\"editStartTime\"](newStartTime, eventId).then(function (resp) {\n        console.log('editStartTime api responded'); // TODO: Figure out the \"updatedEvent\" part of the console log statement\n\n        console.log(\"editStartTime api resp updatedEvent: \".concat(inspect(resp.updatedEvent, {\n          showHidden: false,\n          depth: null,\n          colors: true\n        })));\n        /*\n        // TODO: Update state with the updated start time\n        this.setState((prevState) => {\n          return {\n            arpiData: {\n              ...prevState.arpiData,\n              events: {\n                ...prevState.arpiData.events,\n                [eventId]: {\n                  ...prevState.arpiData.events[eventId],\n                  startTimes: startTimes\n                }\n              }\n            }\n          };\n        });\n        */\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"editStartTimes\", function (newStartTime, eventId) {\n      console.log(\"App.js::editStartTime called.\\n        newStartTime: \".concat(newStartTime, \", eventId: \").concat(eventId));\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"editEndTimes\", function (newEndTime, eventId) {\n      console.log(\"App.js::editEndTime called.\\n        newEndTime: \".concat(newEndTime, \", eventId: \").concat(eventId));\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"editTriggers\", function (newTrigger, eventId) {\n      console.log(\"App.js::editTrigger called.\\n        newTrigger: \".concat(newTrigger, \", eventId: \").concat(eventId));\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"editActions\", function (newAction, eventId) {\n      console.log(\"App.js::editAction called.\\n        newAction: \".concat(newAction, \", eventId: \").concat(eventId));\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"currentContent\", function () {\n      // If you have a valid id (from a click on an event), then\n      // display the event, otherwise display the event list\n      if (_this.state.currentEventId) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Event__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _extends({\n          eventListClick: _this.fetchEventList,\n          editStartTimes: _this.editStartTimes,\n          editEndTimes: _this.editStartTimes,\n          editTriggers: _this.editStartTimes,\n          editActions: _this.editStartTimes\n        }, _this.currentEvent()));\n      }\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        events: _this.state.arpiData.events,\n        onEventClick: _this.fetchEvent\n      });\n    });\n\n    _this.state = {\n      // Only put things on state that need to be tracked, and that can't be\n      // computed from other things.\n      // Set initial state value from properties so a default can be passed\n      // Thus, supporting server rendering for example.\n      // eventData is an object contining a events object. The events\n      // object contains event objects.\n      // { arpiData:\n      //    currentEventId: id,\n      //    {events : {_id, name, description,\n      //              startTimes[], endTimes[], triggers[], actions[] }\n      //    }\n      // }\n      arpiData: _this.props.initialData.arpiData,\n      currentEventId: _this.props.initialData.currentEventId\n    };\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      onPopState(function (event) {\n        // console.log(event.state);\n        _this2.setState({\n          currentEventId: (event.state || {}).currentEventId // null or the current id\n\n        });\n      });\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      // clean timers, listeners, events\n      onPopState(null);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return (\n        /*#__PURE__*/\n        // render using currentContent method\n        // which conditionally looks at eventId state to know\n        // how to render\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"App\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n          message: this.pageHeader()\n        }), this.currentContent())\n      );\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(App, \"propTypes\", {\n  initialData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9BcHAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHAuanM/YWZjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbi8vIGltcG9ydCB7IGluc3BlY3QgfSBmcm9tICd1dGlsJzsgLy9jb25zb2xlLmxvZyBvZiBvYmplY3RzXG5cbi8vIGNvbXBvbmVudHNcbmltcG9ydCBIZWFkZXJDb21wb25lbnQgZnJvbSAnLi9IZWFkZXJDb21wb25lbnQnO1xuaW1wb3J0IEV2ZW50TGlzdCBmcm9tICcuL0V2ZW50TGlzdCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9FdmVudCc7XG5cbi8vIGltcG9ydCBhcGlcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9hcGknO1xuXG4vLyBzaW11bGF0ZSBkYXRhIHRoYXQgd2lsbCBldmVudHVhbGx5IGNvbWUgZnJvbSBlbHNld2hlcmVcbmltcG9ydCBkYXRhIGZyb20gJy4uL3Rlc3REYXRhMS5qc29uJztcblxuLy8gVXNlIGJyb3dzZXIgaGlzdG9yeS4gSFRNTDUgd2luZG93Lmhpc3Rvcnkgc3VwcG9ydGVkIG9uIG1vc3QgYnJvd3NlcnNcbi8vIFB1dCBpdCBpbiBhIGZ1bmN0aW9uIHNvIGlmIGl0IG5lZWRzIHRvIGNoYW5nZSwgb25seSB0aGUgaW5uZXJkcyBvZlxuLy8gdGhlIGZ1bmN0aW9uIG5lZWQgdG8gY2hhbmdlLlxuY29uc3QgcHVzaFN0YXRlID0gKG9iaiwgdXJsKSA9PiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUob2JqLCAnJywgdXJsKTtcbmNvbnN0IG9uUG9wU3RhdGUgPSAoaGFuZGxlcikgPT4ge1xuICB3aW5kb3cub25wb3BzdGF0ZSA9IGhhbmRsZXI7XG59O1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAvLyBTdGF0ZSB1c2luZyBhIGNvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAvLyBPbmx5IHB1dCB0aGluZ3Mgb24gc3RhdGUgdGhhdCBuZWVkIHRvIGJlIHRyYWNrZWQsIGFuZCB0aGF0IGNhbid0IGJlXG4gICAgICAvLyBjb21wdXRlZCBmcm9tIG90aGVyIHRoaW5ncy5cblxuICAgICAgLy8gU2V0IGluaXRpYWwgc3RhdGUgdmFsdWUgZnJvbSBwcm9wZXJ0aWVzIHNvIGEgZGVmYXVsdCBjYW4gYmUgcGFzc2VkXG4gICAgICAvLyBUaHVzLCBzdXBwb3J0aW5nIHNlcnZlciByZW5kZXJpbmcgZm9yIGV4YW1wbGUuXG4gICAgICAvLyBldmVudERhdGEgaXMgYW4gb2JqZWN0IGNvbnRpbmluZyBhIGV2ZW50cyBvYmplY3QuIFRoZSBldmVudHNcbiAgICAgIC8vIG9iamVjdCBjb250YWlucyBldmVudCBvYmplY3RzLlxuICAgICAgLy8geyBhcnBpRGF0YTpcbiAgICAgIC8vICAgIGN1cnJlbnRFdmVudElkOiBpZCxcbiAgICAgIC8vICAgIHtldmVudHMgOiB7X2lkLCBuYW1lLCBkZXNjcmlwdGlvbixcbiAgICAgIC8vICAgICAgICAgICAgICBzdGFydFRpbWVzW10sIGVuZFRpbWVzW10sIHRyaWdnZXJzW10sIGFjdGlvbnNbXSB9XG4gICAgICAvLyAgICB9XG4gICAgICAvLyB9XG4gICAgICBhcnBpRGF0YTogdGhpcy5wcm9wcy5pbml0aWFsRGF0YS5hcnBpRGF0YSxcbiAgICAgIGN1cnJlbnRFdmVudElkOiB0aGlzLnByb3BzLmluaXRpYWxEYXRhLmN1cnJlbnRFdmVudElkXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaW5pdGlhbERhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIG9uUG9wU3RhdGUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhldmVudC5zdGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudEV2ZW50SWQ6IChldmVudC5zdGF0ZSB8fCB7fSkuY3VycmVudEV2ZW50SWQgLy8gbnVsbCBvciB0aGUgY3VycmVudCBpZFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAvLyBjbGVhbiB0aW1lcnMsIGxpc3RlbmVycywgZXZlbnRzXG4gICAgb25Qb3BTdGF0ZShudWxsKTtcbiAgfVxuXG4gIGZldGNoRXZlbnQgPSAoZXZlbnRJZCkgPT4ge1xuICAgIC8vIHB1c2ggdGhlIGV2ZW50IHRvIGJyb3dzZXIgaGlzdG9yeSAod2hpY2ggbWFrZXMgaXQgY3VycmVudCBhbmQgYWRkcyBpdCB0byBoaXN0b3J5KVxuICAgIHB1c2hTdGF0ZSh7IGN1cnJlbnRFdmVudElkOiBldmVudElkIH0sIGAvZXZlbnRzLyR7ZXZlbnRJZH1gKTtcbiAgICAvLyBOb3cgbG9vayB1cCB0aGUgZXZlbnRcbiAgICAvLyB1c2luZyB0aGUgYXBpXG4gICAgYXBpLmZldGNoRXZlbnQoZXZlbnRJZCkudGhlbigoZGF0YU9iaikgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYXJwaURhdGE6IHtcbiAgICAgICAgICAgIC4uLnByZXZTdGF0ZS5hcnBpRGF0YSxcbiAgICAgICAgICAgIGN1cnJlbnRFdmVudElkOiBkYXRhT2JqLmN1cnJlbnRFdmVudElkLFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgIC4uLnByZXZTdGF0ZS5hcnBpRGF0YS5ldmVudHMsXG4gICAgICAgICAgICAgIFtkYXRhT2JqLmN1cnJlbnRFdmVudElkXTogZXZlbnRzW2RhdGFPYmouY3VycmVudEV2ZW50SWRdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gRmV0Y2ggdGhlIGV2ZW50cyBvYmplY3QgZnJvbSB0aGUgYXBpIGFuZCBwdXQgdGhlbSBpbnRvIHRoZSBzdGF0ZVxuICBmZXRjaEV2ZW50TGlzdCA9ICgpID0+IHtcbiAgICAvLyBDbGVhciB0aGUgZXZlbnQgaWQgZnJvbSBicm93c2VyLCB3aGljaCByZW1vdmVzIGlzIGFuZCBhZGRzIGFcbiAgICAvLyBub24taWQgZW50cnkgdG8gdGhlIGhpc3RvcnlcbiAgICBwdXNoU3RhdGUoeyBjdXJyZW50RXZlbnRJZDogbnVsbCB9LCAnLycpO1xuICAgIGFwaS5mZXRjaEV2ZW50TGlzdCgpLnRoZW4oKGV2ZW50cykgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYXJwaURhdGE6IHtcbiAgICAgICAgICAgIC4uLnByZXZTdGF0ZS5hcnBpRGF0YSxcbiAgICAgICAgICAgIGN1cnJlbnRFdmVudElkOiBudWxsLFxuICAgICAgICAgICAgZXZlbnRzOiBldmVudHNcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBGZXRjaCB0aGUgc3RhcnQgdGltZXMgZnJvbSB0aGUgYXBpIGFuZCBwdXQgdGhlbSBpbnRvIHRoZSBzdGF0ZS5cbiAgZmV0Y2hTdGFydFRpbWVzID0gKGV2ZW50SWQpID0+IHtcbiAgICBhcGkuZmV0Y2hTdGFydFRpbWVzKGV2ZW50SWQpLnRoZW4oKHN0YXJ0VGltZXMpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFycGlEYXRhOiB7XG4gICAgICAgICAgICAuLi5wcmV2U3RhdGUuYXJwaURhdGEsXG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgLi4ucHJldlN0YXRlLmFycGlEYXRhLmV2ZW50cyxcbiAgICAgICAgICAgICAgW2V2ZW50SWRdOiB7XG4gICAgICAgICAgICAgICAgLi4ucHJldlN0YXRlLmFycGlEYXRhLmV2ZW50c1tldmVudElkXSxcbiAgICAgICAgICAgICAgICBzdGFydFRpbWVzOiBzdGFydFRpbWVzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBnZXQgdGhlIGV2ZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGN1cnJlbnQgaWRcbiAgY3VycmVudEV2ZW50ID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmFycGlEYXRhLmV2ZW50c1t0aGlzLnN0YXRlLmN1cnJlbnRFdmVudElkXTtcbiAgfTtcblxuICAvLyBpbnN0ZWFkIG9mIGhhdmluZyBwYWdlIGhlYWRlciBhcyBhIHN0YXRlIHZhcmlhYmxlLCBkeW5hbWljYWxseSBkZXRlcm1pbmVcbiAgLy8gdGhlIHBhZ2UgaGVhZGVyIHZhbHVlLiBJdCBzaG91bGQgYmUgdGhlIGV2ZW50IG5hbWUgb3IgdGhlIGRlZmF1bHRcbiAgcGFnZUhlYWRlciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50RXZlbnRJZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEV2ZW50KCkubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuICdFdmVudCBMaXN0JztcbiAgfTtcblxuICBhZGRTdGFydFRpbWVzID0gKG5ld1N0YXJ0VGltZSwgZXZlbnRJZCkgPT4ge1xuICAgIC8vIHVzZSBhcGkgbWV0aG9kIHRvIGFkZCBhIHN0YXJ0IHRpbWUgdG8gdGhlIGV2ZW50IHN0YXJ0IHRpbWVzXG4gICAgYXBpLmVkaXRTdGFydFRpbWUobmV3U3RhcnRUaW1lLCBldmVudElkKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZWRpdFN0YXJ0VGltZSBhcGkgcmVzcG9uZGVkJyk7XG4gICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IHRoZSBcInVwZGF0ZWRFdmVudFwiIHBhcnQgb2YgdGhlIGNvbnNvbGUgbG9nIHN0YXRlbWVudFxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBlZGl0U3RhcnRUaW1lIGFwaSByZXNwIHVwZGF0ZWRFdmVudDogJHtpbnNwZWN0KHJlc3AudXBkYXRlZEV2ZW50LCB7XG4gICAgICAgICAgc2hvd0hpZGRlbjogZmFsc2UsXG4gICAgICAgICAgZGVwdGg6IG51bGwsXG4gICAgICAgICAgY29sb3JzOiB0cnVlXG4gICAgICAgIH0pfWBcbiAgICAgICk7XG4gICAgICAvKlxuICAgICAgLy8gVE9ETzogVXBkYXRlIHN0YXRlIHdpdGggdGhlIHVwZGF0ZWQgc3RhcnQgdGltZVxuICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYXJwaURhdGE6IHtcbiAgICAgICAgICAgIC4uLnByZXZTdGF0ZS5hcnBpRGF0YSxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAuLi5wcmV2U3RhdGUuYXJwaURhdGEuZXZlbnRzLFxuICAgICAgICAgICAgICBbZXZlbnRJZF06IHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2U3RhdGUuYXJwaURhdGEuZXZlbnRzW2V2ZW50SWRdLFxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZXM6IHN0YXJ0VGltZXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgKi9cbiAgICB9KTtcbiAgfTtcblxuICBlZGl0U3RhcnRUaW1lcyA9IChuZXdTdGFydFRpbWUsIGV2ZW50SWQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBBcHAuanM6OmVkaXRTdGFydFRpbWUgY2FsbGVkLlxuICAgICAgICBuZXdTdGFydFRpbWU6ICR7bmV3U3RhcnRUaW1lfSwgZXZlbnRJZDogJHtldmVudElkfWBcbiAgICApO1xuICB9O1xuXG4gIGVkaXRFbmRUaW1lcyA9IChuZXdFbmRUaW1lLCBldmVudElkKSA9PiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQXBwLmpzOjplZGl0RW5kVGltZSBjYWxsZWQuXG4gICAgICAgIG5ld0VuZFRpbWU6ICR7bmV3RW5kVGltZX0sIGV2ZW50SWQ6ICR7ZXZlbnRJZH1gXG4gICAgKTtcbiAgfTtcblxuICBlZGl0VHJpZ2dlcnMgPSAobmV3VHJpZ2dlciwgZXZlbnRJZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYEFwcC5qczo6ZWRpdFRyaWdnZXIgY2FsbGVkLlxuICAgICAgICBuZXdUcmlnZ2VyOiAke25ld1RyaWdnZXJ9LCBldmVudElkOiAke2V2ZW50SWR9YFxuICAgICk7XG4gIH07XG5cbiAgZWRpdEFjdGlvbnMgPSAobmV3QWN0aW9uLCBldmVudElkKSA9PiB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQXBwLmpzOjplZGl0QWN0aW9uIGNhbGxlZC5cbiAgICAgICAgbmV3QWN0aW9uOiAke25ld0FjdGlvbn0sIGV2ZW50SWQ6ICR7ZXZlbnRJZH1gXG4gICAgKTtcbiAgfTtcbiAgLy8gcmV0dXJuIGVpdGhlciBhIGxpc3Qgb2YgZXZlbnRzIG9yIGlmIHRoZXJlIGlzIGEgdmFsaWQgaWQsIHRoZVxuICAvLyBldmVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBpZFxuICBjdXJyZW50Q29udGVudCA9ICgpID0+IHtcbiAgICAvLyBJZiB5b3UgaGF2ZSBhIHZhbGlkIGlkIChmcm9tIGEgY2xpY2sgb24gYW4gZXZlbnQpLCB0aGVuXG4gICAgLy8gZGlzcGxheSB0aGUgZXZlbnQsIG90aGVyd2lzZSBkaXNwbGF5IHRoZSBldmVudCBsaXN0XG4gICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudEV2ZW50SWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFdmVudFxuICAgICAgICAgIGV2ZW50TGlzdENsaWNrPXt0aGlzLmZldGNoRXZlbnRMaXN0fVxuICAgICAgICAgIGVkaXRTdGFydFRpbWVzPXt0aGlzLmVkaXRTdGFydFRpbWVzfVxuICAgICAgICAgIGVkaXRFbmRUaW1lcz17dGhpcy5lZGl0U3RhcnRUaW1lc31cbiAgICAgICAgICBlZGl0VHJpZ2dlcnM9e3RoaXMuZWRpdFN0YXJ0VGltZXN9XG4gICAgICAgICAgZWRpdEFjdGlvbnM9e3RoaXMuZWRpdFN0YXJ0VGltZXN9XG4gICAgICAgICAgey4uLnRoaXMuY3VycmVudEV2ZW50KCl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEV2ZW50TGlzdFxuICAgICAgICBldmVudHM9e3RoaXMuc3RhdGUuYXJwaURhdGEuZXZlbnRzfVxuICAgICAgICBvbkV2ZW50Q2xpY2s9e3RoaXMuZmV0Y2hFdmVudH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHJlbmRlciB1c2luZyBjdXJyZW50Q29udGVudCBtZXRob2RcbiAgICAgIC8vIHdoaWNoIGNvbmRpdGlvbmFsbHkgbG9va3MgYXQgZXZlbnRJZCBzdGF0ZSB0byBrbm93XG4gICAgICAvLyBob3cgdG8gcmVuZGVyXG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdBcHAnPlxuICAgICAgICA8SGVhZGVyQ29tcG9uZW50IG1lc3NhZ2U9e3RoaXMucGFnZUhlYWRlcigpfSAvPlxuICAgICAgICB7dGhpcy5jdXJyZW50Q29udGVudCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUF3Q0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSEE7QUFEQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBM0RBO0FBOERBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFIQTtBQURBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUE3RUE7QUFnRkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBSkE7QUFGQTtBQURBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFqR0E7QUFvR0E7QUFDQTtBQUNBO0FBdEdBO0FBMEdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBL0dBO0FBaUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTtBQUNBO0FBQ0E7QUEvSUE7QUFpSkE7QUFJQTtBQUNBO0FBdEpBO0FBd0pBO0FBSUE7QUFDQTtBQTdKQTtBQStKQTtBQUlBO0FBQ0E7QUFwS0E7QUFzS0E7QUFJQTtBQUNBO0FBM0tBO0FBOEtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBU0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQWpNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQUZBO0FBbUJBO0FBQ0E7OztBQUtBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUErSkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQU5BO0FBVUE7Ozs7QUFqTkE7QUFDQTtBQURBO0FBd0JBO0FBREE7QUFDQTtBQTRMQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/App.js\n");

/***/ }),

/***/ "./src/components/Event.js":
/*!*********************************!*\
  !*** ./src/components/Event.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar Event = /*#__PURE__*/function (_Component) {\n  _inherits(Event, _Component);\n\n  var _super = _createSuper(Event);\n\n  function Event() {\n    var _this;\n\n    _classCallCheck(this, Event);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super.call.apply(_super, [this].concat(args));\n\n    _defineProperty(_assertThisInitialized(_this), \"handleEditStartTimes\", function (event) {\n      event.preventDefault();\n      console.log('Edit Start Times Pressed');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"handleEditEndTimes\", function (event) {\n      event.preventDefault();\n      console.log('Edit End Times Pressed');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"handleEditTriggers\", function (event) {\n      event.preventDefault();\n      console.log('Edit Triggers Pressed');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"handleEditActions\", function (event) {\n      event.preventDefault();\n      console.log('Edit Actions Pressed');\n    });\n\n    return _this;\n  }\n\n  _createClass(Event, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {//console.log(this.props);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"Event\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel panel-default\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-heading\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        className: \"panel-title\"\n      }, \"Event Name\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-body\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"event-name\"\n      }, this.props.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-heading\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        className: \"panel-title\"\n      }, \"Event Description\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-body\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"event-description\"\n      }, this.props.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel panel-default\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-heading\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        className: \"panel-title\"\n      }, \"Start Times\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-body\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"list-group\"\n      }, this.props.startTimes.map(function (startTime, idx) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          key: idx,\n          className: \"list-group-item\"\n        }, ' ', startTime, ' ');\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"edit-group\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"edit-group-btn\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        type: \"button\",\n        className: \"btn btn-info\",\n        onClick: this.handleEditStartTimes\n      }, \"Edit Start Times\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel panel-default\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-heading\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        className: \"panel-title\"\n      }, \"End Times\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-body\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"list-group\"\n      }, this.props.endTimes.map(function (endTime, idx) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          key: idx,\n          className: \"list-group-item\"\n        }, ' ', endTime, ' ');\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"edit-group\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"edit-group-btn\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        type: \"button\",\n        className: \"btn btn-info\",\n        onClick: this.handleEditEndTimes\n      }, \"Edit End Times\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel panel-default\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-heading\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        className: \"panel-title\"\n      }, \"Triggers\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-body\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"list-group\"\n      }, this.props.triggers.map(function (trigger, idx) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          key: idx,\n          className: \"list-group-item\"\n        }, ' ', trigger, ' ');\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"edit-group\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"edit-group-btn\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        type: \"button\",\n        className: \"btn btn-info\",\n        onClick: this.handleEditTriggers\n      }, \"Edit Triggers\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel panel-default\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-heading\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        className: \"panel-title\"\n      }, \"Actions\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"panel-body\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"list-group\"\n      }, this.props.actions.map(function (actions, idx) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          key: idx,\n          className: \"list-group-item\"\n        }, ' ', actions, ' ');\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"edit-group\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"edit-group-btn\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        type: \"button\",\n        className: \"btn btn-info\",\n        onClick: this.handleEditActions\n      }, \"Edit Actions\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"home-link link\",\n        onClick: this.props.eventListClick\n      }, \"Event List\"));\n    }\n  }]);\n\n  return Event;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nEvent.propTypes = {\n  eventListClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  editStartTimes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  editEndTimes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  editTriggers: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  editActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  _id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  startTimes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,\n  endTimes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,\n  triggers: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,\n  actions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Event);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9FdmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50LmpzPzlhNTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIEV2ZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcbiAgfVxuXG4gIGhhbmRsZUVkaXRTdGFydFRpbWVzID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZygnRWRpdCBTdGFydCBUaW1lcyBQcmVzc2VkJyk7XG4gIH07XG5cbiAgaGFuZGxlRWRpdEVuZFRpbWVzID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZygnRWRpdCBFbmQgVGltZXMgUHJlc3NlZCcpO1xuICB9O1xuXG4gIGhhbmRsZUVkaXRUcmlnZ2VycyA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2coJ0VkaXQgVHJpZ2dlcnMgUHJlc3NlZCcpO1xuICB9O1xuXG4gIGhhbmRsZUVkaXRBY3Rpb25zID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZygnRWRpdCBBY3Rpb25zIFByZXNzZWQnKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdFdmVudCc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+RXZlbnQgTmFtZTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2V2ZW50LW5hbWUnPnt0aGlzLnByb3BzLm5hbWV9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPkV2ZW50IERlc2NyaXB0aW9uPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZXZlbnQtZGVzY3JpcHRpb24nPnt0aGlzLnByb3BzLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtZGVmYXVsdCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWhlYWRpbmcnPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0ncGFuZWwtdGl0bGUnPlN0YXJ0IFRpbWVzPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdsaXN0LWdyb3VwJz5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuc3RhcnRUaW1lcy5tYXAoKHN0YXJ0VGltZSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17aWR4fSBjbGFzc05hbWU9J2xpc3QtZ3JvdXAtaXRlbSc+XG4gICAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgICAge3N0YXJ0VGltZX17JyAnfVxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlZGl0LWdyb3VwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdlZGl0LWdyb3VwLWJ0bic+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdidG4gYnRuLWluZm8nXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRTdGFydFRpbWVzfT5cbiAgICAgICAgICAgICAgICAgIEVkaXQgU3RhcnQgVGltZXNcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1kZWZhdWx0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtaGVhZGluZyc+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdwYW5lbC10aXRsZSc+RW5kIFRpbWVzPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdsaXN0LWdyb3VwJz5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuZW5kVGltZXMubWFwKChlbmRUaW1lLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtpZHh9IGNsYXNzTmFtZT0nbGlzdC1ncm91cC1pdGVtJz5cbiAgICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAgICB7ZW5kVGltZX17JyAnfVxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlZGl0LWdyb3VwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdlZGl0LWdyb3VwLWJ0bic+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdidG4gYnRuLWluZm8nXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRFbmRUaW1lc30+XG4gICAgICAgICAgICAgICAgICBFZGl0IEVuZCBUaW1lc1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz5UcmlnZ2VyczwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsLWJvZHknPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nbGlzdC1ncm91cCc+XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRyaWdnZXJzLm1hcCgodHJpZ2dlciwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17aWR4fSBjbGFzc05hbWU9J2xpc3QtZ3JvdXAtaXRlbSc+XG4gICAgICAgICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgICAgICAge3RyaWdnZXJ9eycgJ31cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZWRpdC1ncm91cCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZWRpdC1ncm91cC1idG4nPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYnRuIGJ0bi1pbmZvJ1xuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVFZGl0VHJpZ2dlcnN9PlxuICAgICAgICAgICAgICAgICAgRWRpdCBUcmlnZ2Vyc1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BhbmVsIHBhbmVsLWRlZmF1bHQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwYW5lbC1oZWFkaW5nJz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J3BhbmVsLXRpdGxlJz5BY3Rpb25zPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwtYm9keSc+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdsaXN0LWdyb3VwJz5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWN0aW9ucy5tYXAoKGFjdGlvbnMsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgIDxsaSBrZXk9e2lkeH0gY2xhc3NOYW1lPSdsaXN0LWdyb3VwLWl0ZW0nPlxuICAgICAgICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgICAgICAgIHthY3Rpb25zfXsnICd9XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VkaXQtZ3JvdXAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2VkaXQtZ3JvdXAtYnRuJz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2J0biBidG4taW5mbydcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRWRpdEFjdGlvbnN9PlxuICAgICAgICAgICAgICAgICAgRWRpdCBBY3Rpb25zXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naG9tZS1saW5rIGxpbmsnIG9uQ2xpY2s9e3RoaXMucHJvcHMuZXZlbnRMaXN0Q2xpY2t9PlxuICAgICAgICAgIEV2ZW50IExpc3RcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkV2ZW50LnByb3BUeXBlcyA9IHtcbiAgZXZlbnRMaXN0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGVkaXRTdGFydFRpbWVzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBlZGl0RW5kVGltZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGVkaXRUcmlnZ2VyczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZWRpdEFjdGlvbnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIF9pZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHN0YXJ0VGltZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICBlbmRUaW1lczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gIHRyaWdnZXJzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgYWN0aW9uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBdkJBO0FBRUE7OztBQXNCQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQU9BO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFXQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFPQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBV0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBT0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQVdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQU9BO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFXQTtBQUFBO0FBQUE7QUFLQTs7OztBQXhKQTtBQUNBO0FBMEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFlQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Event.js\n");

/***/ }),

/***/ "./src/components/EventList.js":
/*!*************************************!*\
  !*** ./src/components/EventList.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _EventPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventPreview */ \"./src/components/EventPreview.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\nvar EventList = function EventList(_ref) {\n  var events = _ref.events,\n      onEventClick = _ref.onEventClick;\n  return (\n    /*#__PURE__*/\n    // Events is an object full of events with an id key\n    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"EventList\"\n    }, Object.keys(events).map(function (eventId) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventPreview__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _extends({\n        key: eventId,\n        onClick: onEventClick\n      }, events[eventId]));\n    }))\n  );\n};\n\nEventList.propTypes = {\n  events: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,\n  onEventClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventList);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9FdmVudExpc3QuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudExpc3QuanM/NTdkMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IEV2ZW50UHJldmlldyBmcm9tICcuL0V2ZW50UHJldmlldyc7XG5cbmNvbnN0IEV2ZW50TGlzdCA9ICh7IGV2ZW50cywgb25FdmVudENsaWNrIH0pID0+IChcbiAgLy8gRXZlbnRzIGlzIGFuIG9iamVjdCBmdWxsIG9mIGV2ZW50cyB3aXRoIGFuIGlkIGtleVxuICA8ZGl2IGNsYXNzTmFtZT0nRXZlbnRMaXN0Jz5cbiAgICB7T2JqZWN0LmtleXMoZXZlbnRzKS5tYXAoKGV2ZW50SWQpID0+IChcbiAgICAgIDxFdmVudFByZXZpZXcga2V5PXtldmVudElkfSBvbkNsaWNrPXtvbkV2ZW50Q2xpY2t9IHsuLi5ldmVudHNbZXZlbnRJZF19IC8+XG4gICAgKSl9XG4gIDwvZGl2PlxuKTtcblxuRXZlbnRMaXN0LnByb3BUeXBlcyA9IHtcbiAgZXZlbnRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBvbkV2ZW50Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TGlzdDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFIQTtBQUFBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/EventList.js\n");

/***/ }),

/***/ "./src/components/EventPreview.js":
/*!****************************************!*\
  !*** ./src/components/EventPreview.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar EventPreview = /*#__PURE__*/function (_React$Component) {\n  _inherits(EventPreview, _React$Component);\n\n  var _super = _createSuper(EventPreview);\n\n  function EventPreview() {\n    var _this;\n\n    _classCallCheck(this, EventPreview);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super.call.apply(_super, [this].concat(args));\n\n    _defineProperty(_assertThisInitialized(_this), \"handleClick\", function () {\n      _this.props.onClick(_this.props._id);\n    });\n\n    return _this;\n  }\n\n  _createClass(EventPreview, [{\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"link EventPreview\",\n        onClick: this.handleClick\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"event-name\"\n      }, this.props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"event-desc\"\n      }, this.props.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"event-actions\"\n      }, this.props.actions));\n    }\n  }]);\n\n  return EventPreview;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nEventPreview.propTypes = {\n  _id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,\n  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,\n  actions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventPreview);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9FdmVudFByZXZpZXcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFByZXZpZXcuanM/YmRhZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRXZlbnRQcmV2aWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMuX2lkKTtcbiAgfTtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbGluayBFdmVudFByZXZpZXcnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZXZlbnQtbmFtZSc+e3RoaXMucHJvcHMubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2V2ZW50LWRlc2MnPnt0aGlzLnByb3BzLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZXZlbnQtYWN0aW9ucyc+e3RoaXMucHJvcHMuYWN0aW9uc308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRXZlbnRQcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgX2lkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgYWN0aW9uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50UHJldmlldztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBR0E7Ozs7QUFaQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/EventPreview.js\n");

/***/ }),

/***/ "./src/components/HeaderComponent.js":
/*!*******************************************!*\
  !*** ./src/components/HeaderComponent.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n // React.PropTypes moved out of React since v15.5\n\nvar HeaderComponent = function HeaderComponent(_ref) {\n  var message = _ref.message;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n    style: {\n      textAlign: 'center',\n      color: 'blue'\n    },\n    className: \"HeaderComponent\"\n  }, message);\n}; // Optional but recommended property type check.\n// The .isRequired is optional, but specifies that\n// a message must be provided.\n\n\nHeaderComponent.propTypes = {\n  //headerMessage: PropTypes.string\n  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired\n}; // Optional are default values\n\nHeaderComponent.defaultProps = {\n  message: 'Hello in a weak, shallow, not very sincere way (I was made to say Hello).'\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (HeaderComponent);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9IZWFkZXJDb21wb25lbnQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9IZWFkZXJDb21wb25lbnQuanM/NjgxNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJzsgLy8gUmVhY3QuUHJvcFR5cGVzIG1vdmVkIG91dCBvZiBSZWFjdCBzaW5jZSB2MTUuNVxuXG5jb25zdCBIZWFkZXJDb21wb25lbnQgPSAoeyBtZXNzYWdlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8aDJcbiAgICAgIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIGNvbG9yOiAnYmx1ZScgfX1cbiAgICAgIGNsYXNzTmFtZT0nSGVhZGVyQ29tcG9uZW50Jz5cbiAgICAgIHttZXNzYWdlfVxuICAgIDwvaDI+XG4gICk7XG59O1xuXG4vLyBPcHRpb25hbCBidXQgcmVjb21tZW5kZWQgcHJvcGVydHkgdHlwZSBjaGVjay5cbi8vIFRoZSAuaXNSZXF1aXJlZCBpcyBvcHRpb25hbCwgYnV0IHNwZWNpZmllcyB0aGF0XG4vLyBhIG1lc3NhZ2UgbXVzdCBiZSBwcm92aWRlZC5cbkhlYWRlckNvbXBvbmVudC5wcm9wVHlwZXMgPSB7XG4gIC8vaGVhZGVyTWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZ1xuICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cbi8vIE9wdGlvbmFsIGFyZSBkZWZhdWx0IHZhbHVlc1xuSGVhZGVyQ29tcG9uZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgbWVzc2FnZTpcbiAgICAnSGVsbG8gaW4gYSB3ZWFrLCBzaGFsbG93LCBub3QgdmVyeSBzaW5jZXJlIHdheSAoSSB3YXMgbWFkZSB0byBzYXkgSGVsbG8pLidcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckNvbXBvbmVudDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQU1BO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBS0E7QUFDQTtBQURBO0FBS0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/HeaderComponent.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ \"./src/components/App.js\");\n\n\n // ReactDOM.render(\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(\n/*#__PURE__*/\n// Use hydrate for server side rendering (render being deprecated)\n// Render initial data from local window variable instead of\n// empty string, or from a call to the server here.  This\n// is why the server render returned an object with the\n// rendered data and the raw data we stored in window.\nreact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  initialData: window.initialData\n}), document.getElementById('root'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCc7XG5cbi8vIFJlYWN0RE9NLnJlbmRlcihcblJlYWN0RE9NLmh5ZHJhdGUoXG4gIC8vIFVzZSBoeWRyYXRlIGZvciBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgKHJlbmRlciBiZWluZyBkZXByZWNhdGVkKVxuICAvLyBSZW5kZXIgaW5pdGlhbCBkYXRhIGZyb20gbG9jYWwgd2luZG93IHZhcmlhYmxlIGluc3RlYWQgb2ZcbiAgLy8gZW1wdHkgc3RyaW5nLCBvciBmcm9tIGEgY2FsbCB0byB0aGUgc2VydmVyIGhlcmUuICBUaGlzXG4gIC8vIGlzIHdoeSB0aGUgc2VydmVyIHJlbmRlciByZXR1cm5lZCBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgLy8gcmVuZGVyZWQgZGF0YSBhbmQgdGhlIHJhdyBkYXRhIHdlIHN0b3JlZCBpbiB3aW5kb3cuXG4gIDxBcHAgaW5pdGlhbERhdGE9e3dpbmRvdy5pbml0aWFsRGF0YX0gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbik7XG5cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/testData1.json":
/*!****************************!*\
  !*** ./src/testData1.json ***!
  \****************************/
/*! exports provided: arpiData, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"arpiData\\\":{\\\"currentEventId\\\":null,\\\"events\\\":{\\\"1\\\":{\\\"_id\\\":\\\"1\\\",\\\"name\\\":\\\"Event 1 Name\\\",\\\"description\\\":\\\"Event 1 desc: Lorem ipsum dolor sit amet, consectetur adipisicing elit\\\",\\\"startTimes\\\":[1,2,3],\\\"endTimes\\\":[4,5,6],\\\"actions\\\":[7,8,9],\\\"triggers\\\":[10,11,12]},\\\"2\\\":{\\\"_id\\\":\\\"<id>\\\",\\\"name\\\":\\\"Event 2 Name\\\",\\\"description\\\":\\\"Event 2 desc: Lorem ipsum dolor sit amet, consectetur adipisicing elit\\\",\\\"startTimes\\\":[13,14,15],\\\"endTimes\\\":[16,17,18],\\\"actions\\\":[19,20,21],\\\"triggers\\\":[22,23,24]}}}}\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGVzdERhdGExLmpzb24uanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/testData1.json\n");

/***/ })

/******/ });