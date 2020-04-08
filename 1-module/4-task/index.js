/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
	let text = str.toLowerCase();
	if (text.indexOf('1xbet') != -1 || text.indexOf('xxx') != -1) {
		return true;
		} else {
		return false;
	  }
}
