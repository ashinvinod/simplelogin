
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const UserProfile = (function () {

  let userID = '';
	let password = '';
	const getPassword = function() { return password; };
	const setPassword = function(password1) { password = password1; };

	let getUserID = function() { return cookies.get('userID') };
	let setUserID = function(userID1) {
		userID = userID1;
		cookies.set('userID', userID, { path: '/' });
	};
	let delUserID = function() {
		cookies.remove('userID', { path: '/' })
	}

  return {
		getUserID: getUserID,
		setUserID: setUserID,
		delUserID: delUserID,
		getPassword: getPassword,
		setPassword: setPassword
  }

})();

export default UserProfile;
