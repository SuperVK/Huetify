import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    widgets: {
        display: 'flex',
        width: '90%',
        alignItems: 'center'
    },
    divider: {
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: '#535353',
        marginVertical: 20
    },
    disabled: {
        opacity: 0.5
    }
})