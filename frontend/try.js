// const getAddressPromise = async ({ latitude, longitude }) => {
//   const getAddress = () => {
//     return new Promise((resolve, reject) => {
//       fetch(
//         new URL(
//           `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
//         )
//       )
//         .then((res) => res.json())
//         .then((response) => resolve(response))
//         .catch((err) => reject(err));
//     });
//   };

//   return await getAddress();
// };

// const coords = { latitude: 19.114424, longitude: 72.867943 };
// try {
//   const res = await getAddressPromise(coords);
//   console.log({
//     ...coords,
//     displayAddress: res.display_name,
//     city: res.address?.city,
//   });
// } catch (error) {
//   console.log(error, "error");
// }
// console.log("totol sync !!!!!");
