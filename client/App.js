import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import RNEventSource from 'react-native-event-source'
import { pathOr } from 'ramda'

const REMOTE_HOSTNAME = "192.168.0.14"
const REMOTE_PORT = 5000

export default class App extends React.Component {

  state = {
    data: {}
  }

  componentDidMount() {
    this.eventSource = new RNEventSource(`http://${REMOTE_HOSTNAME}:${REMOTE_PORT}/stream`);
    this.eventSource.addEventListener('message', ({ type, data }) => {
      if (type === 'message') {
        console.log(JSON.parse(data))
        this.setState({ data: JSON.parse(data) })
      }
    });
  }

  componentDidUmnount() {
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  }

  render() {

    const name = pathOr('Unkown GPU', ['product_name'], this.state.data);
    const gpu_temp = pathOr('N/A', ['temperature', 'gpu_temp'], this.state.data);
    const gpu_util = pathOr('N/A', ['utilization', 'gpu_util'], this.state.data);
    const memory_util = pathOr('N/A', ['utilization', 'memory_util'], this.state.data);

    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text>Temperature: {gpu_temp}</Text>
        <Text>GPU Utilization: {gpu_util}</Text>
        <Text>VRAM Utilization: {memory_util}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 10
  }
});
