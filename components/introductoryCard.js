import React from 'react'
import { View, Dimensions } from 'react-native'
import Text from './text'
import { Button } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

export default () => {
  return (
    <View style={styles.introductoryCard}>
      <Text style={[styles.text]}>
        Hi! I'm Alfonso Gomez, I've been an informatics enthusiast for over eight years. I believe that Javascript is the most practical programming language, thus I love using it for almost everything I do.
      </Text>
      <Text style={[styles.text]}>
        Nonetheless, I have also learned to code in many other web-oriented programming languages such as PHP and MySQL at junior to mid level. I am passionate about automation and problem-solving.
      </Text>
      <Button
        title='Give me a call'
        titleStyle={{
          fontFamily: 'regular',
          textTransform: 'uppercase'
        }}
        buttonStyle={{ backgroundColor: '#1B9FC6' }}
        containerStyle={{ marginVertical: 10 }}
        raised
      />
      <Button
        title='Shoot me an email'
        titleStyle={{
          fontFamily: 'regular',
          textTransform: 'uppercase'
        }}
        buttonStyle={{ backgroundColor: '#1B9FC6' }}
        containerStyle={{ marginVertical: 10 }}
        raised
      />
    </View>
  )
}

const styles = {
  introductoryCard: {
    elevation: 4,
    marginHorizontal: '5%',
    backgroundColor: 'white',
    padding: 25,
    marginTop: height / 1.5,
    marginBottom: 500
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20
  }
}