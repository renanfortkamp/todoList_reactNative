import { View, TextInput, StyleSheet, Button } from 'react-native'
import { commonStyles } from '../../styles/CommonStyles'

export default function Form() {
  return (
    <View style={styles.container}>
      <TextInput
        style={{...commonStyles.input, marginBottom: 20}}
        selectionColor="tomato"
        placeholder='Pesquise por uma tarefa ...'
        autoCapitalize='none'
      />
      <Button title='Adicionar' color="tomato" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  }
})