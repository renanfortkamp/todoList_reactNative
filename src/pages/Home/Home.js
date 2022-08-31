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

import { useEffect, useState } from 'react'

import Icon from '@expo/vector-icons/MaterialIcons'

import { commonStyles } from '../../styles/CommonStyles'


export const API = 'http://5db4-2804-29b8-5041-57-6ad5-4a50-2512-9ca2.ngrok.io'

export default function Home({ navigation }) {

  const [tasks, setTasks] = useState([])

  function navigateToForm() {
    navigation.navigate('Form')
  }

  useEffect(() => {
    fetch(API + '/tasks')
      .then(async (response) => {
        const data = await response.json()
        console.log(data)
        setTasks(data)
      })
      .catch((error) => console.log(error))
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

      <View style={styles.inputContainer}>
        <TextInput
          style={commonStyles.input}
          selectionColor="tomato"
          placeholder='Pesquise por uma tarefa ...'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={navigateToForm}>
          <Icon name='add-comment' size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {
          tasks.map((task) => (
            <View style={styles.cardTask} key={task.id}>
              <TouchableOpacity style={styles.descriptionCardTask}>
                <Text>{task.description}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonCheckTask}>
                <Icon name="update" size={32} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonDeleteTask}>
                <Icon name="delete-outline" size={32} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}


      </ScrollView>

    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  buttonAdd: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})