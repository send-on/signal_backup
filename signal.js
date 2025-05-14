const Analytics = require('analytics-node');

// Replace with your actual Segment Write Key
const writeKey = 'cva7iPpXf2glIRHWyI7UXcGUCX8ukhLl';

const analytics = new Analytics(writeKey);

const eventNames = [
  'SFO to EGE',
  'SFO to JFK',
  'SFO to CHI',
  'SFO to LAX',
  'SFO to LGB',
  'SFO to MCO',
  'SFO to JFK',
  'SFO to LAX',
  'SFO to SEA',
  'SFO to AUS',
  "OAK to LGB",
  "SJC to SNA"
];

function getRandomInterval() {
  // Generate a random interval between 100ms (0.1s) and 2000ms (2s)
  return Math.random() * 500 + 100;
}

function sendRandomEvent() {
  const eventName = eventNames[Math.floor(Math.random() * eventNames.length)];

  analytics.track({
    userId: 'user-' + Math.floor(Math.random() * 1000), // Generate a random user ID for each event
    event: eventName,
  });

  analytics.flush((err, batch) => {
    if (err) {
      console.error('Error flushing event:', err);
    } else {
      console.log(`Flushed event: ${eventName}`);
    }
  });

  console.log(`Sent event (waiting for flush): ${eventName}`);

  // Set the timeout for the next event
  setTimeout(sendRandomEvent, getRandomInterval());
}

// Start sending events
sendRandomEvent();

console.log('Sending and flushing track events to Segment...');
console.log('Press Ctrl+C to stop.');