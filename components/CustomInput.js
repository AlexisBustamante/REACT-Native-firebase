import { View, Text, TextInput,StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
  return (
    <View style={styles.container}>
          <TextInput
              value={value}
              placeholder={placeholder}
              styles={styles.input}
              onChangeText={setValue}
              secureTextEntry={secureTextEntry}
          ></TextInput>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: "100%",
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        padding:10,
    },
    input: {

    },

})

export default CustomInput