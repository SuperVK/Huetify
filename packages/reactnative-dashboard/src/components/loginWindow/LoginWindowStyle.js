import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loginWindow: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "baseline",
        color: "white",
        textAlign: "center",
        fontSize: 64
    },
    signInButton: {
        height: "auto",
        width: "auto",
        marginTop: 15,
        padding: 20,
        backgroundColor: "#424242",
        borderRadius: 5
    },
    signInButtonConnected: {
        backgroundColor: "#388E3C",
    },
    bridge: {
        backgroundColor: "#535353",
        textAlign: "center",
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    }
})