import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import { commonStyles } from '../../styles/CommonStyles'
import { useState, useEffect } from 'react'

import { API } from '../Home/Home'

export default function Form() {

  const [description, setDescription] = useState('')

  
  useEffect(() =>  {
    console.log('entrei aqui')
    if(description === 'estudar') {
      alert('Estude mesmo')
    }
  }, [description])

  function addNewTask() {
    if (description.length > 3) {
      fetch(API + '/tasks', {
        method: 'POST',
        body: JSON.stringify({
          description: description,
          status: false
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(async () => {
          alert('Tarefa cadastrada com sucesso')
          setDescription('')
          //const data = await response.json()
          //console.log(data)
        })
        .catch(() => alert('Houve ao erro tentar cadastrar a tarefa'))
    } else {
      alert('Digite uma tarefa mais detalhada')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...commonStyles.input, marginBottom: 20 }}
        selectionColor="tomato"
        placeholder='Digite uma tarefa ...'
        autoCapitalize='none'
        value={description}
        onChangeText={setDescription}
        autoFocus
      />
      <Button title='Adicionar' color="tomato" onPress={addNewTask} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  }
})