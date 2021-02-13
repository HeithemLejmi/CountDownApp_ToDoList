
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import EventCard from './EventCard';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F3F3F3'
  },
});

class EventList extends Component {
  // Initialize the events variable with an empty array
  state = {
    events: [],
  }

  // Fill the events variable with data from the db json file
  componentDidMount() {
    setInterval(() => {
      this.setState({
        events: this.state.events.map(evt => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    const events = require('./db.json').events.map(e => ({
      ...e,
      date: new Date(e.date),
    }));
    this.setState({ events });
  }

  // Method to handle navigation from EventList to EventForm
  handleAddEvent = () => {
    this.props.navigation.navigate('form')
  }

  render() {
    return [
      // The FlatList should pass the event data to the child component EventCard
      <FlatList
        key="flatlist"
        data={this.state.events}
        style={styles.list}
        keyExtractor={item => item.id}
        renderItem={({ item, separators }) => (
          <EventCard
            event={item}
          />
        )}
      />,
      <ActionButton
        key="fab"
        buttonColor="rgba(231,76,60,1)"
        onPress={this.handleAddEvent}
      />,
    ];
  }
}

export default EventList;