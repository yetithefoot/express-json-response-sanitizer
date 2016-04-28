
/**
 * Sanitize response by removing unwanted attributes from response.
 * @param  {[type]}   src        data object
 * @param  {[type]}   forbiddens Array of infected fields. Default: ['password']
 * @param  {[type]}   ignores    Array of ignored fields. This fields wont be check and always Default: []
 * @param  {Function} done       [description]
 */
function sanitizeKeys(src, forbiddens, ignores, done) {

	// possible calls:
	// - sanitizeKeys(src, done)
	// - sanitizeKeys(src, forbiddens, done)
	// - sanitizeKeys(src, forbiddens, ignores, done)
	// if(arguments.length == 2) {
	// 	done = forbiddens;
	// }else if(arguments.length == 3) {
	// 	done = ignores;
	// }else if(arguments.length != 4) {
	// 	return console.log('Incorrect arguments list')
	// }

	// defaults for 
	forbiddens = forbiddens || ['password'];
	ignores = ignores || [];

	var result = {}
	if (!src || src.constructor != Object) {
		done && done(null, src)
		return
	}

	var keys = Object.keys(src);
	keys.forEach(function(key){
		// key is forbidden
		if (forbiddens.indexOf(key) != -1) {
			delete src[key];
		}
		// // key is ignored
		// else if (ignores.indexOf(key) != -1) {
		// }
		else if (src[key] && src[key].constructor == Object) {
			sanitizeKeys(src[key], forbiddens, ignores, function(err, sanitized) {
				src[key] = sanitized
			})
		}
	})
	done && done(null, src);
}


/**
 * Configures sanitizer by passed params
 * @param  {[type]} forbiddens [description]
 * @param  {[type]} ignores    [description]
 * @return {[type]}            [description]
 */
exports.middleware = function middleware(forbiddens, ignores) {

	return function(req, res, next) {
		var fn = res.json;
		res.json = function(st, infected) {
			// // infected object
			sanitizeKeys(infected, forbiddens, ignores, function(err, sanitized) {
				// call original with sanitized data
				fn.apply(res, [st, sanitized])
			})
		}
		next()
	}
}


