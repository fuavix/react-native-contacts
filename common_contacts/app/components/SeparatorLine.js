/**
 * 列表的分割线
 */

import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

function SeparatorLine(props) {
  const leftInset = props.leftInset ? props.leftInset : 0
  const rightInset = props.rightInset ? props.rightInset : 0
  const color = props.color ? props.color : 'rgb(220,220,220)'
  return (
    <View style={[
        {
            marginLeft: leftInset,
            marginRight: rightInset,
            backgroundColor: color,
            height: 1
        },
        props.style
    ]} />
  )
}

export default SeparatorLine