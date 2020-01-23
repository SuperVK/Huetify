import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loginWindow: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    signInButton: {
        display: 'flex',
        flexGrow: 1,
        color: 'white',
        backgroundColor: '#424242',
        borderRadius: 5,
        height: 75,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: 5
    }
})