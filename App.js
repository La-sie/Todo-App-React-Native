import { Text,
SafeAreaView,
View, 
StyleSheet, 
FlatList,
TouchableOpacity,
TextInput,
Button,
Alert,
TouchableWithoutFeedback,
Keyboard} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function App() {
  const [todos, setTodos] = useState([
{text: 'Latte', key: '1'},
{text: 'Frappaccino', key: '2'},
{text: 'Mochaccino', key: '3'},
  ]);
  const [text,setText] = useState('');

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {
    if(text.length > 3){
      setTodos((prevTodos) => {
      return [
        {text: text, key: Math.random().toString()},
        ...prevTodos
      ];
    }); 
    }
    else{
     Alert.alert('Sorry!', 'Todos must be over 3 words long', [
       { text: 'Ok', onPress:() =>  console.log('alert closed')}
     ]) ;
    }
  }

  const changeHandler=(val) =>{
    setText(val);
  }

  return (
    <TouchableWithoutFeedback onPress={()=> {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
    <SafeAreaView style={styles.container}>
    
         <View style={styles.header}>
           <Text style={styles.title}> Todo App</Text>
         </View>
         <View style={styles.addTodo}>
            <TextInput
             style={styles.input}
             placeholder='New Todo...'
             onChangeText={changeHandler}>
            </TextInput>
         </View>
      <View style={styles.btn}>
         <Button 
         onPress={() => submitHandler(text)} 
         title= 'add todo'
         color= 'purple'/>
         </View>
      <View style={styles.list}>
        <FlatList  
         data={todos}
         renderItem={({item}) => (
          <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style={styles.item}> 
              <MaterialIcons name='delete' size={20} color={'purple'}/>
               <Text style={styles.itemText}>
                {item.text} 
               </Text>
            </View> 
              
          </TouchableOpacity>
        )}/>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 70,
    width: '100%',
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 700
  },
  item:{
    padding: 15,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    marginTop: 15,
    flexDirection: 'row'
  },
  list:{
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    marginBottom: 10
  },
  addTodo:{
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input:{
    padding: 5,
    color: '#ddd'
  },
  btn:{
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 20
  },
  itemText:{
    marginLeft: 10
  }
});
