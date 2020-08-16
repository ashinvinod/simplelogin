import React from 'react';
import { Button, Container} from 'react-bootstrap';
import history from './history';
import userProfile from './UserProfile';

const Welcome = () => {

		// Logs out the user from the session
		function logoutUser() {
			history.push('/login');
			userProfile.delUserID();
		}

    // Error message when the user is not logged in
		function SessionInActive() {
			return (
				<div>
					<Container className='err401'>
						401 - Unauthorized!
						<br/>
						<div className='errDesc'>
							<a onClick={() => history.push('/login')}> Click here to login and try again.</a>
						</div>
					</Container>
				</div>
			)
		}

    // Welcome page when the user is logged in
		function SessionActive()
		{
			return (
				<div>
        <br />
          <Container className='titlemain'>
	          Hello and welcome {userProfile.getUserID()}!
            <br/>
            <Button variant="primary" onClick={() => logoutUser()}> Logout </Button>
          </Container>
				</div>
			)
		}

    // Checks if the user is logged in
    function logCheck() {
			if (!userProfile.getUserID()) {
				return SessionInActive();
			}
			else {
				return SessionActive();
			}
		}
		return (
			<div>
				{
					logCheck()
				}
			</div>
		);
};

export default Welcome;
