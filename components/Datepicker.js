import {Calendar} from 'react-native-calendars'
import {  View } from 'react-native';
import {useEffect, useState} from 'react'
import { NativeBaseProvider, Box, Input, Button, Text, Image } from "native-base";
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons'; 

function Datepicker ({ navigation}) {


const [month, setMonth] = useState(new Date().toDateString().split(' ')[1]+" "+ new Date().getFullYear().toString())
const [appointments, setAppointments] = useState({})


const [dateNow, setDateNow] = useState(new Date().toString())
const [dateEnd, setDateEnd] = useState(new Date().toString())

const [ALL_DAYS, setALL_DAYS] = useState([])

  const contentLoaded = async ()=> {
       const app_object = {}
       const res = await axios("https://europe-west1-e-therapy-b812c.cloudfunctions.net/appointmentValidation")
      
       setALL_DAYS(res.data.msg)

       res.data.msg.forEach((item)=> {
        app_object[item.split("T")[0]] = { selected:true, selectedColor: "#9370DB" }
       })

       setDateNow(new Date(res.data.msg[0]).toString())
       setDateEnd(new Date(res.data.msg[res.data.msg.length-1]).toString())
       setAppointments(app_object)

    }


    useEffect(()=> {
      contentLoaded() 
    }, [])


    return(
      <NativeBaseProvider>
      <View style={{flex:1, backgroundColor:'white'}}>
        <Box padding={5} alignItems={'center'} background={'white'} >
          <View style={{display:'flex', width:'100%',height:50, justifyContent:'center', alignItems:'center'}}>
            <Text fontFamily={'heading'} fontSize={20} fontWeight={'bold'} color={'#9370DB'} >Doctor Appointments</Text>
          </View>
        </Box>
        <Box w={'100%'} h={'50%'}>
        <Calendar style={{width:'100%', height:'100%', backgroundColor:'white' }}
  
  // For TimeSlots! ------------------------------------
  markedDates={appointments}

 // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
 minDate={dateNow}
 // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined

 maxDate={dateEnd}

  // -----------------------------------------------------
 renderArrow={(direction)=> {
    if (direction === "left") {
     return(<AntDesign name="leftcircleo" size={24} color={'#9370DB'} />) 
   }
    else {
     return(<AntDesign name="rightcircleo" size={24} color="#9370DB" />) 
   }
 }}

 // Handler which gets executed on day press. Default = undefined
 onDayPress={(date)=> {
    const matchDate = ALL_DAYS.filter((dateString)=> dateString.split("T")[0] === date.dateString ) 
    if (matchDate.length > 0) {
     navigation.navigate("Appointment", {slots: matchDate})
    }
   else {
     alert("Not available")
   }

 }}

 // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
 monthFormat={'yyyy MM'}
 // Handler which gets executed when visible month changes in calendar. Default = undefined
 onMonthChange={(date)=> {setMonth(new Date(date.dateString).toDateString().split(' ')[1]+" "+ new Date().getFullYear().toString())}}

 // Do not show days of other months in month page. Default = false
 hideExtraDays={true}
 // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
 // day from another month that is visible in calendar page. Default = false

 // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
 firstDay={1}
 // Hide day names. Default = false

 // Show week numbers to the left. Default = false
 showWeekNumbers={false}

 // Replace default month and year title with custom one. the function receive a date as parameter
 renderHeader={() => {
  return (<Text fontSize={16} fontWeight={'medium'} color={'#9370DB'}>{month}</Text>)
 }}
 // Enable the option to swipe between months. Default = false
 enableSwipeMonths={true}
> </Calendar>
        </Box>
    
          <Box w={'100%'} bg={'white'} h={200} alignItems={'center'} justifyContent={'center'}>
         <Image size={200} alt='calendar' source={{uri:'https://static.vecteezy.com/system/resources/previews/012/958/783/original/3d-calendar-reminder-icon-purple-calender-with-empty-date-bell-clock-floating-on-transparent-scheduled-event-holiday-plan-business-notification-concept-cartoon-icon-smooth-3d-rendering-png.png'}}></Image>
      </Box>
  
      </View>
      </NativeBaseProvider>
    )
}


export default Datepicker;