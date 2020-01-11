import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    widgets: {
        top: 25,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    divider: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: '#535353',
        marginVertical: 10
    }
})