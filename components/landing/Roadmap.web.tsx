
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const timelineData = [
  {
    id: 1,
    year: '2024',
    position: 'bottom',
    color: '#f39c12',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    year: '2025',
    position: 'top',
    color: '#e74c3c',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    year: '2026',
    position: 'bottom',
    color: '#2ecc71',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 4,
    year: '2027',
    position: 'top',
    color: '#3498db',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 5,
    year: '2028',
    position: 'bottom',
    color: '#9b59b6',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 6,
    year: '2029',
    position: 'top',
    color: '#1abc9c',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export function Roadmap() {
  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.infographicTitle}>
        <Text style={styles.mainTimelineTitle}>Roadmap</Text>
      </View>

      {/* Timeline Section */}
      <View style={styles.timelineContainer}>
        {/* The horizontal line */}
        <View style={styles.line} />

        {/* The items (dots, cards, years) rendered on top of the line */}
        <View style={styles.itemsContainer}>
          {timelineData.map((item) => (
            <View key={item.id} style={styles.item}>
              {/* For top items, the card is first, then the dot and year */}
              {item.position === 'top' && (
                <>
                  <View style={[styles.card, { borderColor: item.color }]}>
                    <View style={[styles.cardNumber, { backgroundColor: item.color }]}><Text style={styles.cardNumberText}>{item.id}</Text></View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>{item.text}</Text>
                  </View>
                  <View style={styles.dot} />
                  <Text style={styles.year}>{item.year}</Text>
                </>
              )}
              
              {/* For bottom items, the year and dot are first, then the card */}
              {item.position === 'bottom' && (
                <>
                  <Text style={styles.year}>{item.year}</Text>
                  <View style={styles.dot} />
                  <View style={[styles.card, { borderColor: item.color }]}>
                    <View style={[styles.cardNumber, { backgroundColor: item.color }]}><Text style={styles.cardNumberText}>{item.id}</Text></View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>{item.text}</Text>
                  </View>
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
    backgroundColor: '#f7f7f7',
    paddingVertical: 50,
    alignItems: 'center',
    width: '100%',
  },
  infographicTitle: {
    marginBottom: 60,
    alignItems: 'center',
  },
  mainTimelineTitle: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#555',
  },
  timelineContainer: {
    width: '90%',
    maxWidth: 1200,
    position: 'relative',
    height: 450, // Fixed height for the container
    justifyContent: 'center',
  },
  line: {
    height: 6,
    backgroundColor: '#ddd',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -3 }],
    zIndex: 1,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center items vertically
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    zIndex: 3,
    marginVertical: 10,
  },
  year: {
    fontSize: 21,
    fontWeight: '700',
    color: '#333',
    paddingVertical: 5,
    height: 60, // Give space
    textAlign: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 180,
    height: 180, // Fixed height
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    justifyContent: 'center',
  },
  cardNumber: {
    position: 'absolute',
    top: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumberText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  cardTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 1.5 * 13,
    textAlign: 'center',
  },
});

export default Roadmap;
