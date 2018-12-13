
import axios from "axios";

export const FETCHING_REQUEST = "FETCHING_REQUEST";
export const FETCHING_SUCCESS = "FETCHING_SUCCESS";
export const FETCHING_FAILURE = "FETCHING_FAILURE";
export const ADDING = "ADDING";
export const ADDING_SUCCESS = "ADDING_SUCCESS";
export const ADDING_FAILURE = "ADDING_FAILURE";

export const DELETING = "DELETING";
export const DELETING_SUCCESS = "DELETING_SUCCESS";
export const DELETING_FAILURE = "DELETING_FAILURE";

export const EDITING_REQUEST = "EDITING_REQUEST";
export const EDITING_SUCCESS = "EDITING_SUCCESS";
export const EDITING_FAILURE = "EDITING_FAILURE";

const server_URL = "http://localhost:9000/api/"

const token = localStorage.getItem('secret_token');
const options = {
  headers: {
    authorization: token,
  },
};

// if (token) {
//   axios.get(`${url}/api/jokes`, options)


export const fetchNotes = () => dispatch => {
  // let's do some async stuff! Thanks react-thunk :)
  dispatch({ type: FETCHING_REQUEST });
 
    axios.get(`${server_URL}notes`)
    .then(response => {
      // console.log('fetchNotes  response = ', response);
      dispatch({ type: FETCHING_SUCCESS, payload: response.data });
    })
    .catch(error => dispatch({ type: FETCHING_FAILURE, payload: error }));
};

export const addNote = Note => dispatch => {
  console.log('addNote in Actions ');

  dispatch({ type: "ADDING" });
  axios
    .post(`${server_URL}addnote`, Note)
    .then(response => {
     console.log('action dispatch adding  response.data = ', response.data);
      dispatch({ type: ADDING_SUCCESS, payload: {...Note, id: response.data[0]} });
    })
    .catch(error => {
      dispatch({ type: ADDING_FAILURE, payload: error });
    });

};

export const deleteNote = id => dispatch => {
  // let's do some async stuff! Thanks react-thunk :)
  dispatch({ type: "DELETING" });
  axios
    .delete(`${server_URL}notes/${id}`)
    .then(response => {
      dispatch({ type: DELETING_SUCCESS, payload: id });
    })
    .catch(error => {
      dispatch({ type: DELETING_FAILURE, payload: error });
    });
};

export const editNote = Note => dispatch => {

  const editedNote = {
    "title": Note.title,
    "textBody": Note.textBody,
  }

  dispatch({ type: "EDITING_REQUEST" });

  axios
    .put(`${server_URL}notes/${Note.id}`, editedNote)
    .then(response => {
      console.log('edit axios  response.data = ', response.data);
      dispatch({ type: EDITING_SUCCESS, payload: Note });
    })
    .catch(error => {
      dispatch({ type: EDITING_FAILURE, payload: error });
    });
};

export const setSearchBoolean = (bool) =>  {
  // let's do some async stuff! Thanks react-thunk :)
 if (bool) return({type:"SEARCHTRUE"});
 else return({type:"SEARCHFALSE"})
};
 
export  async function serverSearchFunc(query) {
//  console.log('Server Search Func in actions/index  query = ', query);
 
 

  const temp = await axios.get(`${server_URL}search?query=${query}`)

  return temp.data;



  // axios.get(`${server_URL}search?query=${query}`)
    // .then(response => {
    //   console.log('rsponse ', response);
    //      return response.data;
    // })
    // .catch(err => console.log('Error in search func ', err));


 
};
 
 
  // return notes.filter(
  //   note => note.title.includes(query) || note.textBody.includes(query)
  // );

  // export const cloneNote = Note => {
  
  
    
  //   axios
  //     .post(`${server_URL}addnote`, Note)
  //     .then(response => {
  //      console.log('action dispatch adding  response.data = ', response.data);
        
  //     })
  //     .catch(error => {
       
  //     });
  
  // };

// };