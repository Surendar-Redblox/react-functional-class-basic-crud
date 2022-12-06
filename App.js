import {Component, useState} from 'react';
import uuid from 'react-uuid'; // https://www.npmjs.com/package/react-uuid

const isFunction = true

const FunctionApp = () => {
  const [state , setState] = useState(
    {
      name:'',
      age:null,
      employeeData : [],
      isEditing: false,
      currentEmployeeEditId: null
    }
  );
  const handleEdit = (e,currentEmployeeEditId) => {
    e.preventDefault();
    setState((prevState)=> {
     const {name, age} =  (prevState.employeeData.filter(employee => employee.id === currentEmployeeEditId))[0];
        return {
          ...prevState,
          name,
          age,
          isEditing:true,
          currentEmployeeEditId
        }
    })
  }

  const handleChange = ({target:{name, value}})=>  setState((prevState)=>({...prevState, [name]: value}));
  

  const handleSubmit = (e) => {

    e.preventDefault();
  
    if (state.isEditing){
      return setState(prevState => {
        const {id} = (prevState.employeeData.filter((employee) => employee.id === prevState.currentEmployeeEditId))[0];
        const remainingEmployeeData = prevState.employeeData.filter((employee) => employee.id !== prevState.currentEmployeeEditId);
        if(remainingEmployeeData){
          return {
            ...prevState,
            name:'',
            age:'',
            isEditing: false,
            currentEmployeeEditId: null,
            employeeData: [...remainingEmployeeData, {id, name: state.name, age: state.age }]
          }
        }
        return {
          ...prevState,
          name:'',
          age:'',
          isEditing: false,
          currentEmployeeEditId: null,
          employeeData: [{id, name: state.name, age: state.age }]
        }
      })
    }
  
    const id = uuid();
    setState((prevState)=> (
        {...prevState, 
          name: '',
          age: null,
          employeeData: [...prevState.employeeData, {id,name: state.name, age:state.age}]
        }
      )
    )
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    setState((prevState)=> {
      const updateEmployeeDataArray =  prevState.employeeData.filter(employee => employee.id !== id);
         return {
           ...prevState,
           name:'',
           age:'',
          employeeData: [
            ...updateEmployeeDataArray
          ]
         }
     })
  }
  return (
    <div>
      <h1>Function Syntax</h1>
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" onChange={handleChange} placeholder="Enter a name" value={state.name? state.name : ''}/>
      <label>Age</label>
      <input type="text" name="age" onChange={handleChange} placeholder="Enter a age" value={  state.age ?  state.age : ''}/>
      <button>Save</button>
    </form>
    <table>
      <thead>
        <th>Name</th>
        <th>Age</th>
      </thead>
      <tbody>
      {
        state.employeeData?.map(({name,age,id})=>
        <tr key={id}>
          <td>{name}</td>
          <td>{age}</td>
          <td>
            <button onClick={(e)=>handleEdit( e, id)}>Edit</button>
          </td>
          <td>
            <button onClick={(e)=>handleDelete(e, id)}>Delete</button>
          </td>
        </tr>)
      }
      </tbody>
    </table>
    </div>

  )

}

class App extends Component{
  constructor(props){
  super(props);
  this.state={
    name:'',
    age:null,
    employeeData : [],
    isEditing: false,
    currentEmployeeEditId: null
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleEdit = this.handleEdit.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
}

handleChange({target:{name, value}}){
  this.setState((prevState)=>({...prevState, [name]: value}));
}
handleSubmit(e){

  e.preventDefault();

  if (this.state.isEditing){
    return this.setState(prevState => {
      const {id} = (prevState.employeeData.filter((employee) => employee.id === prevState.currentEmployeeEditId))[0];

      const remainingEmployeeData = prevState.employeeData.filter((employee) => employee.id !== prevState.currentEmployeeEditId);
      if(remainingEmployeeData){
        return {
          ...prevState,
          name:'',
          age:'',
          isEditing: false,
          currentEmployeeEditId: null,
          employeeData: [...remainingEmployeeData, {id, name: this.state.name, age: this.state.age }]
        }
      }
      return {
        ...prevState,
        name:'',
        age:'',
        isEditing: false,
        currentEmployeeEditId: null,
        employeeData: [{id, name: this.state.name, age: this.state.age }]
      }
    })
  }

  const id = uuid();
  this.setState((prevState)=> (
      {...prevState, 
        name: '',
        age: null,
        employeeData: [...prevState.employeeData, {id,name: this.state.name, age:this.state.age}]
      }
    )
  )
}

handleEdit(e,currentEmployeeEditId){

  e.preventDefault();
  this.setState((prevState)=> {
   const {name, age} =  (prevState.employeeData.filter(employee => employee.id === currentEmployeeEditId))[0];
      return {
        ...prevState,
        name,
        age,
        isEditing:true,
        currentEmployeeEditId
      }
  })
}

handleDelete(e, id){
  e.preventDefault();
  this.setState((prevState)=> {
    const updateEmployeeDataArray =  prevState.employeeData.filter(employee => employee.id !== id);
       return {
         ...prevState,
         name:'',
         age:'',
        employeeData: [
          ...updateEmployeeDataArray
        ]
       }
   })
}
render(){
  let employeeData = this.state.employeeData;
  return(
    <div>
    <h1>Class Syntax</h1>
    <form onSubmit={this.handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" onChange={this.handleChange} placeholder="Enter a name" value={this.state.name? this.state.name : ''}/>
      <label>Age</label>
      <input type="text" name="age" onChange={this.handleChange} placeholder="Enter a age" value={  this.state.age ?  this.state.age : ''}/>
      <button>Save</button>
    </form>
    <table>
      <thead>
        <th>Name</th>
        <th>Age</th>
      </thead>
      <tbody>
      {
        employeeData?.map(({name,age,id})=>
        <tr key={id}>
          <td>{name}</td>
          <td>{age}</td>
          <td>
            <button onClick={(e)=>this.handleEdit( e, id)}>Edit</button>
          </td>
          <td>
            <button onClick={(e)=>this.handleDelete(e, id)}>Delete</button>
          </td>
        </tr>)
      }
      </tbody>
    </table>
    </div>
  )
}
}
export default isFunction ? FunctionApp : App;