
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const timelineData = [
  {
    id: 1,
    year: '2024',
    color: '#f39c12',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    year: '2025',
    color: '#e74c3c',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    year: '2026',
    color: '#2ecc71',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 4,
    year: '2027',
    color: '#3498db',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 5,
    year: '2028',
    color: '#9b59b6',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 6,
    year: '2029',
    color: '#1abc9c',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export function Roadmap() {
  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <View style={styles.line}>
          {timelineData.map((item) => (
            <View key={`line-${item.id}`} style={[styles.lineSegment, { backgroundColor: item.color }]} />
          ))}
        </View>
        <View style={styles.itemsContainer}>
          {timelineData.map((item, index) => (
            <View key={item.id} style={styles.item}>
              {index % 2 !== 0 ? (
                <>
                  <Text style={styles.year}>{item.year}</Text>
                  <View style={styles.connector} />
                  <View style={[styles.card, { borderColor: item.color }]}>
                    <View style={styles.dottedContainer} />
                    <View style={[styles.cardNumber, { borderColor: item.color }]}>
                        <Text style={[styles.cardNumberText, { color: item.color }]}>{item.id}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>{item.text}</Text>
                    <View style={[styles.cardBottomBar, { backgroundColor: item.color }]} />
                  </View>
                </>
              ) : (
                <>
                  <View style={[styles.card, { borderColor: item.color }]}>
                    <View style={styles.dottedContainer} />
                    <View style={[styles.cardNumber, { borderColor: item.color }]}>
                        <Text style={[styles.cardNumberText, { color: item.color }]}>{item.id}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>{item.text}</Text>
                    <View style={[styles.cardBottomBar, { backgroundColor: item.color }]} />
                  </View>
                  <View style={styles.connector} />
                  <Text style={styles.year}>{item.year}</Text>
                </>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  timelineContainer: {
    width: '100%',
    maxWidth: 1200,
    position: 'relative',
    justifyContent: 'center',
  },
  line: {
    height: 10,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -5 }],
    zIndex: 1,
    flexDirection: 'row',
  },
  lineSegment: {
    flex: 1,
    height: '100%',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 400, // Fixed height to align items
  },
  connector: {
    width: 3,
    height: 50, // Adjust length of the connector line
    backgroundColor: '#333',
  },
  year: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    width: '95%',
    maxWidth: 200, // Adjusted for better spacing
    height: 220, // Fixed height for cards
    backgroundColor: 'white',
    borderWidth: 4,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    overflow: 'visible', // Allow number to pop out
  },
  dottedContainer: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 20,
  },
  cardNumber: {
    position: 'absolute',
    top: -25, // Position outside the card
    left: '50%',
    transform: [{ translateX: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 4, 
    zIndex: 5, 
  },
  cardNumberText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardTitle: {
    marginTop: 20, // Space for the number
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  cardBottomBar: {
    position: 'absolute',
    bottom: 12,
    left: '15%',
    right: '15%',
    height: 8,
    borderRadius: 4,
  },
});

export default Roadmap;
