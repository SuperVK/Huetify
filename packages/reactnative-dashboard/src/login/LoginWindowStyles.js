import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loginWindow: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signInButton: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: '#424242',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    },
    signInButtonConnected: {
        backgroundColor: "#388E3C",
    },
    bridgeSelect: {
        flex: 1,
        alignContent: 'center'
    },
    brbuffer: {
        flex: 1,
        flexGrow: 0.5
    },
    bridge: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#535353",
        textAlign: "center",
        borderRadius: 5
    }
})