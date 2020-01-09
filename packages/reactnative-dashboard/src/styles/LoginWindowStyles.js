import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loginWindow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%'
    },
    signInButtonFlex: {
        display: 'flex',
        flexGrow: 1
    },
    signInButton: {
        color: 'white',
        backgroundColor: '#424242',
        padding: 20,
        borderRadius: 5
    },
    spotifyLogin: {
        marginRight: '2%'
    },
    hueLogin: {
        marginLeft: '2%'
    },
    signInText: {
        fontSize: 16,
        textAlign: 'center'
    },
    signInButtonConnected: {
        backgroundColor: "#388E3C",
    },
    bridge: {
        color: 'white',
        backgroundColor: "#535353",
        textAlign: "center",
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    }
})