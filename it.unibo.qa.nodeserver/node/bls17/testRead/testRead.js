exports.testRead = function (test) {
    console.log("STARTS");
    var ev = new events.EventEmitter();

    process.openStdin = function () { return ev; };
    process.exit = test.done;

    doubled.read();
    ev.emit('data', '12');
    console.log("ENDS");
};

/*
stdin is an EventEmitter, so we create our own EventEmitter object and override process.openStdin to return it. 
Next we override process.exit with the test.done function, 
so this test will only complete successfully if the read function calls process.exit.
 Next, we call the read function we're testing. 
 This should wait for stdin to emit a 'data' event before doing anything. 
 This is where our custom EventEmitter comes in handy. 
 Now, we can use it to emit data events to simulate a user entering input.
*/

/*
exports.read = function () {
    var stdin = process.openStdin();

    stdin.on('data', function (chunk) {
        process.exit();
    });
};
*/
/*
Success! But wait, we've forgotten to do anything with the data 
(in fact, the read function could just be calling process.exit and still pass). 
We want this function to output the doubled number using console.log. 
Time to revisit the tests:
*/