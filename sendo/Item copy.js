// import React, { PureComponent } from 'react';
// import { TouchableOpacity, ScrollView, Text, StyleSheet, Platform, FlatList } from 'react-native';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';

// const items_queryset = gql`
// query
// {
//   items(first: 2) {
//     pageInfo {
//       startCursor
//       endCursor
//       hasNextPage
//       hasPreviousPage
//     }
//     edges {
//       cursor
//       node {
//         id
//         sItemId
//         name
//         href
//         price
//         finalPrice
//         image
//         image250250
//         image500500
//       }
//     }
//   }
// }
// `;

// class Items extends PureComponent {
//     _renderItem({item}) {
//         return (
//             <TouchableOpacity style={styles.itemContainer}>
//                 <Text style={styles.itemText}>id: {item.id}</Text>
//                 <Text style={styles.itemText}>name: {item.name}</Text>
//             </TouchableOpacity>
//         );
//     }
//     render() {
//         return (
//             <ScrollView style={styles.container}>
//                 {/*Can use an array to override styles for your UI elements.*/}
//                 <Text style={[styles.itemText, styles.headerText]}>Top 25 NFL Players List</Text>
//                 <Query query={items_queryset}>
//                     {/* The props.children of the Query will be a callback with a response, and error parameter. */}
//                     {(response, error) => {
//                         if(error) {
//                             console.log('Response Error-------', error);
//                             return <Text style={styles.errorText}>{error}</Text>
//                         }
//                         if(response) {
//                             console.log(typeof(response.data.images));
//                             console.log(response.data.images);
                            
//                             return <FlatList 
//                                         data={response.data}
//                                         renderItem={(item) => this._renderItem(item)}
//                                     />;
//                         } 
//                     }}
//                 </Query>
//             </ScrollView>
//         );
//     }
// }

// //Define the styles for your component.
// const styles = StyleSheet.create({
//     container: {
//         //Instead of do 100% of height and width is doing flex: 1,
//         flex: 1,
//     },
//     headerText: {
//         fontSize: 30,
//         marginTop: 30,
//     },
//     itemContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         textAlign: 'center',
//         borderWidth: 2,
//         borderStyle: 'solid',
//         borderColor: 'black'
//     },
//     itemText: {
//         fontSize: 20,
//         fontWeight: '500',
//         fontFamily: Platform.select({
//             ios: 'Chalkboard SE',
//             android: 'sans-serif-condensed'
//         })
//     },
//     errorText: {
//         fontSize: 20,
//         fontWeight: '500',
//         fontFamily: Platform.select({
//             ios: 'Chalkboard SE',
//             android: 'sans-serif-condensed'
//         }),
//         color: 'red'
//     },
//     wonSuperBowlText: {
//         color: 'green',
//     }
// })

// export default Items;