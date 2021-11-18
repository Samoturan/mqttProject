import React, { Component} from 'react'
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native'

import * as Mqtt from 'react-native-native-mqtt'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      deviceId:'',
      tankLevel:'',
      mixerLevel:'',
      newData:[],
      flow:'',
      electricPhase:'',
      emergentStopTank:'',
      emergentStopMixer:'',
      pumpOilEntry:'',
      pumpMixerEntrry: '', 
      engineMixer: '', 
      enginePumpUpdown: '', 
      maxLimitMixerTankLevel: '', 
      maxLimitTankLevel: '', 
      valfWater: '', 
      valfChemical: '', 
      valfChemicalTransfer:'', 
      valfEmulsionMeasure: '', 
      valfWaterClean: '', 
      valveError: '',
      deneme:false,
    }
  }
  componentDidMount(){
    this.mqttFunction()
  }
  mqttFunction = () => {
    this.client= new Mqtt.Client('url')

    this.client.connect({
      clientId: 'random',
      username: "***",
      password: "***"
    },err=>{err ? console.log("Connect Error:",err):false});

    this.client.on(Mqtt.Event.Connect, () =>{
      console.log('Connected')
      this.client.subscribe(["***"],[0])
    })

    this.client.on(Mqtt.Event.Error, (error) =>{
      console.log('Mqtt Error: ',error)
    })

    this.client.on(Mqtt.Event.Disconnect, (couse) =>{
      console.log('Disconnect: ',couse)
      this.setState({deneme:true})
      this.denemeFunction()
    })

    this.client.on(Mqtt.Event.Message,(topic,message)=>{
      this.state.newData=JSON.parse(message.toString())
      console.log('New data: ',JSON.parse(message.toString()))
      this.setState({
        deviceId:this.state.newData.deviceId,
        tankLevel:this.state.newData.reading.tankLevel,
        mixerLevel:this.state.newData.reading.mixerLevel,
        flow:this.state.newData.reading.flow,
        electricPhase:this.state.newData.reading.electricPhase,
        emergentStopTank:this.state.newData.reading.emergentStopTank,
        emergentStopMixer:this.state.newData.reading.emergentStopMixer,
        pumpOilEntry:this.state.newData.reading.pumpOilEntry,
        pumpMixerEntrry:this.state.newData.reading.pumpMixerEntrry,
        engineMixer:this.state.newData.reading.engineMixer,
        enginePumpUpdown:this.state.newData.reading.enginePumpUpdown,
        maxLimitMixerTankLevel:this.state.newData.reading.maxLimitMixerTankLevel,
        maxLimitTankLevel:this.state.newData.reading.maxLimitTankLevel,
        valfWater:this.state.newData.reading.valfWater,
        valfChemical:this.state.newData.reading.valfChemical,
        valfChemicalTransfer:this.state.newData.reading.valfChemicalTransfer,
        valfEmulsionMeasure:this.state.newData.reading.valfEmulsionMeasure,
        valfWaterClean:this.state.newData.reading.valfWaterClean,
        valveError:this.state.newData.reading.valveError,
      })
    })
  }
  denemeFunction=()=>{
    this.state.deneme ? this.mqttFunction():this.setState({deneme:false});
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor:'darkgrey', paddingTop:15}}>
        <View style={styles.header}>
          <Text style={{fontSize:20,color:'black'}}>Cihaz-1</Text>
          <Text style={{fontSize:17,color:'black'}}>Tank-1</Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.box}>
              <Text style={{fontSize:17,color:'black'}}>Tank Level</Text>
              <Text style={{color:'black'}}>{this.state.tankLevel}</Text>
            </View>
            <View style={styles.box}>
              <Text style={{fontSize:17,color:'black'}}>Mixer Level</Text>
              <Text style={{color:'black'}}>{this.state.mixerLevel}</Text>
            </View>
            <View style={styles.box}>
              <Text style={{fontSize:17,color:'black'}}>Flow</Text>
              <Text style={{color:'black'}}>{this.state.flow}</Text>
            </View>
            <View style={styles.box}>
              {
                this.state.electricPhase ? <Text style={{fontSize:16,color:'red'}}>Electric Phase</Text>:<Text style={{fontSize:16,color:'green'}}>Electric Phase</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.emergentStopTank ? <Text style={{fontSize:16,color:'red'}}>Emergent Stop Tank</Text>:<Text style={{fontSize:16,color:'green'}}>Emergent Stop Tank</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.emergentStopMixer ? <Text style={{fontSize:16,color:'red'}}>Emergent Stop Mixer</Text>:<Text style={{fontSize:16,color:'green'}}>Emergent Stop Mixer</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.pumpOilEntry ? <Text style={{fontSize:16,color:'red'}}>Pump Oil Entrry</Text>:<Text style={{fontSize:16,color:'green'}}>Pump Oil Entrry</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.pumpMixerEntrry ? <Text style={{fontSize:16,color:'red'}}>Pump Mixer Entrry</Text>:<Text style={{fontSize:16,color:'green'}}>Pump Mixer Entrry</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.engineMixer ? <Text style={{fontSize:16,color:'red'}}>Engine Mixer</Text>:<Text style={{fontSize:16,color:'green'}}>Engine Mixer</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.enginePumpUpdown ? <Text style={{fontSize:16,color:'red'}}>Engine Pump Up Down</Text>:<Text style={{fontSize:16,color:'green'}}>Engine Pump Up Down</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.maxLimitMixerTankLevel ? <Text style={{fontSize:16,color:'red'}}>Max Limit Mixer Tank Level</Text>:<Text style={{fontSize:16,color:'green'}}>Max Limit Mixer Tank Level</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.maxLimitTankLevel ? <Text style={{fontSize:16,color:'red'}}>Max Limit Mixer Tank Level</Text>:<Text style={{fontSize:16,color:'green'}}>Max Limit Mixer Tank Level</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.valfWater ? <Text style={{fontSize:16,color:'red'}}>Valf Water</Text>:<Text style={{fontSize:16,color:'green'}}>Valf Water</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.valfChemical ? <Text style={{fontSize:16,color:'red'}}>Valf Chemical</Text>:<Text style={{fontSize:16,color:'green'}}>Valf Chemical</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.valfChemicalTransfer ? <Text style={{fontSize:16,color:'red'}}>Valf Chemical Transfer</Text>:<Text style={{fontSize:16,color:'green'}}>Valf Chemical Transfer</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.valfEmulsionMeasure ? <Text style={{fontSize:16,color:'red'}}>Valf Emulsion Measure</Text>:<Text style={{fontSize:16,color:'green'}}>Valf Emulsion Measure</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.valfWaterClean ? <Text style={{fontSize:16,color:'red'}}>Valf Water Clean</Text>:<Text style={{fontSize:16,color:'green'}}>Valf Water Clean</Text>
              }
            </View>
            <View style={styles.box}>
              {
                this.state.valveError ? <Text style={{fontSize:16,color:'red'}}>Valve Error</Text>:<Text style={{fontSize:16,color:'green'}}>Valve Error</Text>
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding:20,
    flexWrap:'wrap',
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent:'center',
  },
  box: {
    width:95,
    height:93,
    padding:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:10,
    marginVertical:10,
    backgroundColor:'gainsboro',
    borderRadius:0.5,
    shadowColor:'red',
    shadowOpacity: 0.5,
    shadowRadius:3,
    shadowOffset:{
      width:0,
      height:2,
    },
    elevation:3,
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
  }
});
