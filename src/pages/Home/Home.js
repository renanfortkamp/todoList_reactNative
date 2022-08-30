import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import {useEffect, useState} from 'react'

import Icon from '@expo/vector-icons/MaterialIcons'


export default function Home() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://521f-2804-29b8-5041-57-8149-4dfa-4fe4-5598.ngrok.io/tasks')
    .then(async (response) => {
      const data = await response.json()
      setTasks(data)
    })
    .catch(() => alert('Houve um erro ao recuperar a lista de tarefa'))
  }, [])

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="tomato" />
      <View style={styles.header}>
        
        <Text style={styles.title}>ToDo</Text>
        <Image
          source={{ uri: 'https://pps.whatsapp.net/v/t61.24694-24/296237395_799475051406658_8345571438606669084_n.jpg?ccb=11-4&oh=01_AVz3hcJ9UgKzPGeg2ZD4wXjBtqaoNB4kI7DymLYcJn_YIg&oe=631DF42A' }}
          style={styles.thumb}
        />
      </View>

      <TextInput
        style={styles.input}
        selectionColor="tomato"
        placeholder='Pesquise por uma tarefa ...'
        autoCapitalize='none'
      />

      <ScrollView>

        <View style={styles.cardTask}>

          <TouchableOpacity style={styles.descriptionCardTask}>
            <Text>Estudar curso DevInHouse</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCheckTask}>
          <Icon name="update" size={32} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDeleteTask}>
           <Icon name="delete-outline" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'tomato'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20
  },
  input: {
    height: 44,
    width: '90%',
    borderColor: 'tomato',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20
  },
  cardTask: {
    height: 50,
    width: '90%',
    backgroundColor: 'tomato',
    borderRadius: 5,
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-around'
  },
  descriptionCardTask: {
    width: '60%',
   
  },
  buttonCheckTask: {
    width: '15%',
   
  },
  buttonDeleteTask: {
    width: '15%',
  }
})