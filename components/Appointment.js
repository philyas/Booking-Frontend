import { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { db } from '../config/config'
import {collection, addDoc, getDocs, query, where} from 'firebase/firestore'
import { Box, NativeBaseProvider, Modal, Button, VStack, FormControl, Input, Divider, Center, Image} from "native-base"
import axios from "axios"

function Appointment({route}) {

    const { slots  } = route.params
    const timeslots = slots.map((slot)=> slot.split("T")[1].split(".")[0])
    const [isOpen, setIsOpen] = useState(false)

    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [time, setTime] = useState("")


    const openModal = (_time)=> {
        setTime(_time)
        setIsOpen(true)
    }

    const closeModal =()=> {
        setIsOpen(false)
    }

    const send = ()=> {
        const dateObject = slots[0].split("T")[0]
        const mergedDate = dateObject+"T"+time+".000Z"

        let sendObject = {
            user:name,
            mail: email,
            phone:phone,
            date: mergedDate
        }

        console.log(sendObject)

        // Post Request 
        axios.post('https://europe-west1-e-therapy-b812c.cloudfunctions.net/appointmentValidation/post', sendObject ).then((res)=> {
             closeModal()
            alert(res.data.msg)
            setName("")
            setPhone("")
            setEmail("")
        }).catch((err)=> alert(err))
    }



    return(
        <NativeBaseProvider>
        <View style={{width:'100%', height:'100%', display:'flex',
            alignItems:'center', justifyContent:'center' ,backgroundColor:'#f0f2f5',
        }}>

      
         <Box flexDirection={'row'} shadow={3} style={{width:'100%', backgroundColor:'white', height:150, display:'flex', justifyContent:'space-around',alignItems:'center'}}>
            <Image size={100} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMchFcVI87TZGyAho5hfhTXRM_Dbb022CsUA&usqp=CAU'}} alt={'time'}></Image>
            <Text style={{fontWeight:'bold', color:'#000080'}}>{slots[0].split("T")[0]}</Text>
         </Box>

          <FlatList style={{
                width:'100%',
                position:'relative',
                flexGrow:0,
                display:'flex',
          }}

          contentContainerStyle={{justifyContent:"center", alignItems:"center"}}

            data={timeslots} 

            renderItem={({item})=> (<Box shadow={4} style={{
               display:'flex' , alignItems:'center',  width:300, height:50, backgroundColor:'white', marginTop:20, 
               borderRadius:5, textAlign:'center', backgroundColor:'white'
            }}><TouchableOpacity style={{ position:'absolute', display:'flex', alignItems:'center',
            justifyContent:'center',
            width:'100%', height:'100%',left:0,top:0
        }} onPress={()=> {openModal(item)}} ><Text style={{color:'#6495ED', fontWeight:'500'}}>{item}</Text></TouchableOpacity></Box>)}

            keyExtractor={item => item}
          />
    
        </View>

        <Modal isOpen={isOpen} onClose={closeModal} size={"lg"} avoidKeyboard>

            <Modal.Content p={5}>
                <Modal.CloseButton></Modal.CloseButton>
                <Modal.Header>Information</Modal.Header>
                <Modal.Body>
                    <VStack>
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input value={name} onChangeText={(text)=> setName(text) } ></Input>
                            <FormControl.Label>E-Mail</FormControl.Label>
                            <Input value={email} onChangeText={(text)=> setEmail(text) } ></Input>
                            <FormControl.Label>Phone</FormControl.Label>
                            <Input value={phone} onChangeText={(number)=> setPhone(number) }  ></Input>
                            <Button onPress={send} bg={"blue.700"} mt={5}>Send</Button>
                        </FormControl>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>

        </NativeBaseProvider>
    )
}

export default Appointment