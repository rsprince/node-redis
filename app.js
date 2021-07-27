const redis = require('redis');
// By default, redis.createClient() will use hostname: 127.0.0.1 and port: 6379 
const client = redis.createClient(); // redis.createClient(port, host) to specify

client.on('connect', function() {
  console.log('Connected!');
});

// set a key/value pair with callback
client.set('appName', 'NG-TOS', (err, reply) => {
  console.log(reply); // OK
});

// get a value
client.get('appName', (err, reply) => {
  console.log(reply);
});

// set a hash/object, with callback
client.hmset('user_sprince.richard', 
	{
		'first': 'Richard',
		'last': 'Sprince',
		'permissions': 'Admin'
	}, 
	(err, reply) => {
			console.log("Set hash/object: ", reply); // OK
			if (err) console.log("Error: ", err);
	});

// get value of key, return value
client.hgetall('user_sprince.richard', function(err, object) {
  console.log(object);
});

// set a list (array)
client.rpush(['fruits', 'bananas', 'peaches', 'blueberries'], function(err, reply) {
  console.log("Added list 'fruits': ", reply); // returns length of list
});

// get list 'fruits' starting at [0]. 3rd argument  -1 gets all elements
client.lrange('fruits', 0, -1, (err, reply) => {
  console.log("fruits: ", reply);
});

// sets are lists that don't allow duplicates
client.sadd(['vegatables', 'tomato', 'onion', 'onion', 'spinach', 'beets'], (err, reply) => {
  console.log("Added set 'vegatables': ", reply);
});

// get members of a set
client.smembers('vegatables', (err, reply) => {
  console.log("vegatables: ", reply);
});

// check if a key exists
client.exists('vegatables', (err, reply) => {
  if (reply === 1) {
    console.log("vegatables Exist!");
  } else {
    console.log("vegatables Don't Exist!");
  }
});

// delete a key
client.del('fruit', (err, reply) => {
  console.log("Deleted 'fruit': ", reply); 
});

// expire a key
client.set('status', 'logged_in');
client.expire('status', 3, (err, reply) => { // seconds
	console.log("Setting expiration of 'status'...");
});

// check if status has been expired
setTimeout( () => {
	client.exists('status', (err, reply) => {
		if (reply === 1) {
			console.log("status Exists!");
		} else {
			console.log("status Doesn't Exist!");
		}
	});
}, 5000);