import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebase/auth'
import './Auth.css'

const style = {
    welcomeContainer: {
        borderRight: 'solid 2px #C7C7C7'
    },
    welcomeCard: {
        border: 'solid 1px C7C7C7'
    },
    connectContainer: {

    },

}

class Auth extends React.Component {

    state = {
        isSignedIn: false
    };

    uiConfig = {

        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,

        ],
        callbacks: {

            signInSuccessWithAuthResult: (e) => {
                
                console.log('ignInSuccessWithAuthResult : ',e)
                if(e.additionalUserInfo.isNewUser){
                    this.createMember(e.user.uid, e.user.email, e.user.displayName).then(() => {
                        this.createMemberPlaylist(e.user.uid).then(() => {
                            this.createMemberCart(e.user.uid).then(() => {
                                this.createMemberProject(e.user.uid)
                            })
                        })
                    })
                }
                    
                

            }
        }
    };

    createMember(uid, email, displayName) {
        const member = {
            uid: uid,
            email: email,
            displayName: displayName
        }
        return firebase.database().ref('members').child(member.uid).set(member)
    }

    createMemberPlaylist(uid) {
        const playlist = {

        }

        return firebase.database().ref('members/' + uid + '/playlists').set(playlist)
    }

    createMemberCart(uid) {
        const cart = {

        }
        return firebase.database().ref('members/' + uid + '/carts').set(cart)
    }

    createMemberProject(uid) {
        const project = {

        }
        return firebase.database().ref('members/' + uid + '/projects').set(project)
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({ isSignedIn: !!user })
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div className="container pt-5 pb-5">
                    <div className="row pt-1">
                        <div className="col-12 text-center" style={style.connectContainer}>
                            <h2 className="font-weight-light">Sign in or Sign up</h2>
                            <p className="lead constrain-width mt-4 pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. At aliquam rhoncus donec magna turpis, dictum sit amet tellus at, commodo elementum sapien.</p>
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                        </div>
                    </div>
                </div>
            );
        }
        return null
    }
}

export default Auth