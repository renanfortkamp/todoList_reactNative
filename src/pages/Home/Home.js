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

import { useIsFocused } from '@react-navigation/native'

export const API = 'http://8b85-2804-29b8-5041-57-7229-6425-7d7f-5fac.ngrok.io'

export default function Home({ navigation }) {

  const telaFocada = useIsFocused()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

  function navigateToForm() {
    navigation.navigate('Form')
  }

  function deleteTask(taskId) {
    fetch(API + '/tasks/' + taskId, {
      method: 'DELETE'
    })
      .then(() => {
        getTasks()
      })
      .catch(() => alert('Houve um erro ao tentar delatar'))
  }

  //http://thecatapi.com.br/cats?color=blue&eyes=red
  //http://8b85-2804-29b8-5041-57-7229-6425-7d7f-5fac.ngrok.io/tasks?description='teste'

  function getTasks() {
    console.log(searchTasks)
    //fetch(API + '/tasks' + '?description=' + searchText) Busca exatamente o texto pesquisado
    fetch(API + '/tasks' + '?description_like=' + searchText)
      .then(async (response) => {
        const data = await response.json()
        console.log(data)

        setTasks(data)
        setLoading(false)

      })
      .catch((error) => console.log(error))
  }

  function showDescriptionTask(description) {
    alert(description)
  }


  function searchTasks() {
    getTasks()
  }

  // GET -> pegar todas informações
  // POST -> cadastrar informacao
  // DELETE -> deletar uma informação por completo
  // PUT -> atualiza um elmento por completo
  // PATCH ->  atualiza uma informaçao parcialmente

  function updateTask(taskId) {
    fetch(API + '/tasks/' + taskId, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        status: true,
      })
    })
      .then(() => {
        alert('Atualizado com sucesso')
        getTasks()
      })
      .catch(() => alert('Houve um erro ao tentar atualizar a tarefa'))
  }

  useEffect(() => {
    if (telaFocada === true) {
      getTasks()
    }

  }, [telaFocada])

  useEffect(() => {
    getTasks()
  }, [searchText])

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={searchTasks}>
          <Icon name='search' size={32} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAdd} onPress={navigateToForm}>
          <Icon name='add-comment' size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      {loading === true && <Text>Loading</Text>}

      <ScrollView>
        {
          tasks.map((task) => (
            <View
              style={{ ...styles.cardTask, backgroundColor: task.status === true ? 'green' : 'tomato' }}
              key={task.id}
            >
              <TouchableOpacity
                style={styles.descriptionCardTask}
                onPress={() => showDescriptionTask(task.description)}
              >
                <Text numberOfLines={1} ellipsizeMode="tail">{task.description}</Text>
              </TouchableOpacity>

              {
                task.status === false &&
                <TouchableOpacity style={styles.buttonCheckTask} onPress={() => updateTask(task.id)}>
                  <Icon name="update" size={32} color="#FFF" />
                </TouchableOpacity>
              }

              <TouchableOpacity style={styles.buttonDeleteTask} onPress={() => deleteTask(task.id)}>
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