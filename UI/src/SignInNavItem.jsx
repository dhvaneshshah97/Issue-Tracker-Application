import React from 'react';
import { NavItem, Button, Modal, NavDropdown, MenuItem } from 'react-bootstrap';
import { render } from 'react-dom';
// import SingleValue from 'react-select/src/components/SingleValue';

export default class SignInNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            disabled: true,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        const clientId = window.ENV.GOOGLE_CLIENT_ID;
        if (!clientId) return;
        window.gapi.load('auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init({ client_id: clientId }).then(() => {
                    this.setState({ disabled: false });
                });
            }
        });
    }


    showModal() {
        const clientId = window.ENV.GOOGLE_CLIENT_ID;
        if (!clientId) {
            alert('Missing environment variable GOOGLE_CLIENT_ID');
            return;
        }
        this.setState({ showing: true });
    }
    hideModal() {
        this.setState({ showing: false });
    }
    async signIn() {
        this.hideModal();
        let googleToken;
        try {
            const auth2 = window.gapi.auth2.getAuthInstance();
            const googleUser = await auth2.signIn();
            googleToken = googleUser.getAuthResponse().id_token;
        } catch (error) {
            alert(`Error authenticating with google: ${error.error}`);
        }
        try {
            const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
            const rawResponse = await fetch(`${apiEndpoint}/signin`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ google_token: googleToken }),
            });
            const response = await rawResponse.json();
            const { signedIn, givenName } = response;
            // this.setState({ user: { signedIn: signedIn, givenName: givenName } });
            const { onUserChange } = this.props;
            onUserChange({ signedIn: signedIn, givenName: givenName });
        } catch (error) {
            alert(`Error signing into the app: ${error.error}`);
        }

    }

    async signOut() {
        const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
        try {
            await fetch(`${apiEndpoint}/signout`, {
                method: 'POST',
                credentials: 'include',
            });
            const auth2 = window.gapi.auth2.getAuthInstance();
            await auth2.signOut();
            // this.setState({ user: { signedIn: false, givenName: '' } });
            const { onUserChange } = this.props;
            onUserChange({ signedIn: false, givenName: ' ' });
        } catch (error) {
            alert(`Error signing out: ${error}`);
        }
    }

    render() {
        const { user } = this.props;
        if (user.signedIn) {
            return (
                <NavDropdown title={
                    // <div className="pull-left">
                    //     <img className="thumbnail-image" style={{width:'25px', height:'25px', borderRadius:'50px'}}
                    //         src={user.image}
                    //         alt="user pic"
                    //     />{' '}
                    user.givenName}
                    // </div>} 
                    id="user">
                    <MenuItem onClick={this.signOut}>Sign out</MenuItem>
                </NavDropdown>
            );
        }

        const { showing, disabled } = this.state;
        return (
            <React.Fragment>
                <NavItem onClick={this.showModal}>
                    Sign in
            </NavItem>
                <Modal keyboard show={showing} onHide={this.hideModal} bsSize="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button block bsStyle="primary" onClick={this.signIn} disabled={disabled}>
                            <img src="https://goo.gl/4yjp6B" alt="Sign In" />
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}