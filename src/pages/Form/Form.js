import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import { commonStyles } from '../../styles/CommonStyles'
import { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'

import { Calendar } from 'react-native-calendars'

import { API } from '../Home/Home'

import {format} from 'date-fns'


export default function Form() {
 /* Forma alternativa
  const dataAtual = format(new Date(), 'yyyy-MM-dd')
  const [date, setDate] = useState(dataAtual)
  */

  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const [date, setDate] = useState(() => {
    const dataAtual = new Date()  
    return format(dataAtual, 'yyyy-MM-dd')
  })

  useEffect(() => {
    console.log('entrei aqui')
    if (description === 'estudar') {
      alert('Estude mesmo')
    }
  }, [description])

  function addNewTask() {

    if (description.length < 4) {
      alert('Digite uma tarefa mais detalhada')
    } else if (category === '') {
      alert('Selecione uma categoria')
    } else {
      fetch(API + '/tasks', {
        method: 'POST',
        body: JSON.stringify({
          description: description,
          status: false,
          category: category,
          date: date
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

      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.select}
      >
        <Picker.Item label='Selecione' value="" />
        <Picker.Item label='Estudos' value="estudos" />
        <Picker.Item label='Casa' value="casa" />
        <Picker.Item label='Outros' value="outros" />
      </Picker>
      <Calendar
        //minDate={dataAtual}
        style={styles.calendar}
        markedDates={{
          [date]: {
            selected: true,
            marked: true,
            selectedColor: '#FFF',
            dotColor: 'red'
          },
        }}
        onDayPress={(currentDate) => setDate(currentDate.dateString)}
        theme={{
          selectedDayTextColor: 'green',
          todayTextColor: '#FFF',
    
          calendarBackground: 'tomato', // cor do calendario em si
          dayTextColor: '#FFF', // cores dos dia 
          arrowColor: '#FFF', // cores do avançar e voltar
          monthTextColor: '#FFF' // cor do mês selecionado
        }}
      />

      <Button title='Adicionar' color="tomato" onPress={addNewTask} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  },
  select: {
    backgroundColor: 'tomato',
    color: '#FFF',
    margin: 10,
    width: '70%',
    height: 54
  },
  calendar: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    marginVertical: 20
  }
})