import { View, Text, SafeAreaView, Image, StyleSheet, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native'

export default function Home() {
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
        <View>
          <TouchableOpacity>
            <Text>Estudar curso DevInHouse</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text>Lixeira</Text>
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
  }
})