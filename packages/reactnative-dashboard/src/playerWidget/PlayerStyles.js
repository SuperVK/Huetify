import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    player: {
        flex: 1,
        width: '100%'
    },
    playerWidget: {
        padding: 15,
        width: '100%',
        paddingBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#535353',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    thumbnailImg: {
        height: 96,
        width: 96
    },
    thumbnail: { 
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#292929',
        marginRight: 10,
        marginBottom: 10
    },
    details: {
        marginLeft: 5,
    },
    songTitle: {
        color: 'white',
        borderBottomWidth: 2,
        borderStyle: 'solid', 
        borderBottomColor: 'gray',
        fontSize: 30,
        paddingBottom: 5
    },
    artists: {
        color: '#a5a5a5',
        fontSize: 20,
        marginTop: 5
    }
})