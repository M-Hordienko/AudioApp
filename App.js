/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;

import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import WaveForm from 'react-native-audiowaveform';
import filesample from './filesample.json'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      pressPlayTime: null,
      pressPlayProgress: null,
      play: false,
      stop: false,
      authIndicator: true
    }
  }
  Item = (time) => {
    var obj = filesample;
    return (
      <View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          style={{
            width: '90%',
            height: 100,
            marginTop: 50,
          }}>
          {
            obj.sections[0].words.map((value, index) => {
              return (
                <Text
                  style={[
                    {marginHorizontal: 2},
                    {textDecorationLine: time / 1000 > value.start_time && value.end_time > time / 1000 ? 'underline' : 'none'},
                    {fontWeight: time / 1000 > value.start_time && value.end_time > time / 1000 ? 'bold' : '100'}
                  ]}>
                  {value.text}
                </Text>
              )
            })
          }
          {
            obj.sections[1].words.map((value, index) => {
              return (
                <Text
                  style={[
                    {marginHorizontal: 2},
                    {textDecorationLine: time / 1000 > value.start_time && value.end_time > time / 1000 ? 'underline' : 'none'},
                    {fontWeight: time / 1000 > value.start_time && value.end_time > time / 1000 ? 'bold' : '100'}
                  ]}>
                  {value.text}
                </Text>
              )
            })
          }
          {
            obj.sections[2].words.map((value, index) => {
              return (
                <Text
                  style={[
                    {marginHorizontal: 2},
                    {textDecorationLine: time / 1000 > value.start_time && value.end_time > time / 1000 ? 'underline' : 'none'},
                    {fontWeight: time / 1000 > value.start_time && value.end_time > time / 1000 ? 'bold' : '100'}
                  ]}>
                  {value.text}
                </Text>
              )
            })
          }
        </ScrollView>
      </View>
    );
  };

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
      }, 200);
    setTimeout(() => {
      this.setState({authIndicator: false})
    }, 3000)
  }

  render() {
    var obj = filesample;
    return (
      <View style={styles.container}>
        <WaveForm
          style={{
            marginTop: 500,
            alignSelf: 'center',
            width: '90%',
            height: 50,
            marginHorizontal: 15,
          }}
          source={{uri:'https://transcription-asr.s3-ap-southeast-1.amazonaws.com/GCjWdk8GZNmL04DS9hfzYM2dm2EtcOG3yMN63go6.mpga'}}
          waveFormStyle={{waveColor:'rgb(50, 50, 50)', scrubColor:'rgb(50, 50, 50)'}}
          autoPlay={false}
          play={!!this.state.play}
          stop={!!this.state.stop}
        />
        <View>
          {!this.state.play
            ?
            <TouchableOpacity
              onPress={() => {
                if(!!this.state.pressPlayProgress) {
                  this.setState({pressPlayTime: new Date().getTime() - this.state.pressPlayProgress, play: true, stop: false})
                } else {
                  this.setState({play: true, stop: false, pressPlayTime: new Date().getTime()})
                }
              }}>
              <Text
                style={{
                  marginTop: 50,
                  fontSize: 16,
                  color: 'black',
                }}>
                Play
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => {
                this.setState({play: false, stop: true, pressPlayProgress: new Date().getTime() - this.state.pressPlayTime})
              }}>
              <Text
                style={{
                  marginTop: 50,
                  fontSize: 16,
                  color: 'black',
                }}>
                Stop
              </Text>
            </TouchableOpacity>
          }
        </View>
        {!!this.state.play ? this.Item(!!this.state.pressPlayProgress ? new Date().getTime() - this.state.pressPlayTime : new Date().getTime() - this.state.pressPlayTime) : this.Item(this.state.pressPlayProgress)}
        {!!this.state.authIndicator &&
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 9,
              backgroundColor: 'rgba(250, 250, 250, 0.8)'
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(250, 250, 250)',
  }
});
