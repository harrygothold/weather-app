var asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        },1500);
    });
};

asyncAdd(5, '7').then((res) => {
    console.log('Result: ', res);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log('Should be 45', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
})


// // Defining new promise with r+r cases as arguments
// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // If promise is fulfilled
//         resolve('It worked');
//         // If promise is not fulfilled
//         reject('Unable to fulfill promise');
//     },2500);
// });

// // What to do if promise is successful/unsuccessful
// somePromise.then((message) => {
//     // What to do if successful
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     // What to do if unsuccessful
//     console.log('Error: ', errorMessage);
// });
