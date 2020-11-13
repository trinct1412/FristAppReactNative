const React = require("react-native");

const { StyleSheet } = React;

export default {
  container:{
    flex:1,
    backgroundColor: '#3498db'
  },
  logoContainer:{
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center',
  },
  logo:{
    width:100,
    height:100
  },
  title:{
    color:'#FFF',
    marginTop:10,
    width:160,
    textAlign: 'center',
    opacity:0.9,
  },
  containerInput:{
    padding:20,
  },
  input:{
    height:40,
    backgroundColor:'rgba(255,255,255,0.2)',
    marginBottom:20,
    color:'#FFF',
    paddingHorizontal:10,
  },
  buttonContainer:{
    backgroundColor:'#2980b9',
    paddingVertical:15
  },
  buttonText:{
    textAlign:'center',
    color:'#FFFFFF',
    fontWeight:'700',
  }
};
