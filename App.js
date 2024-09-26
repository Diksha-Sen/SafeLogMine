import React,{useState,useEffect} from 'react'
import { supabase } from './createClient';
import './App.css';

const App = () => {
  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({
    name:'' ,phno:'',
    email:'' ,sf:''
  })

  const [user2,setUser2] = useState({
    id:'' ,name:'',phno:'',email:'' 
  })

  console.log(user)

  useEffect(() => {
    fetchUsers();
  }, [])
  
  async function fetchUsers() {
    const {data} = await supabase.from('users').select('*')
    setUsers(data);
    //console.log(data);
  }

  function handleChange(event){
    setUser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value 
      }
    })
  }
  function handleChange2(event){
    setUser2(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value 
      }
    })
  }

  async function createUser() {
  await supabase.from('users').insert({ name: user.name, phno: user.phno ,email:user.email})

  fetchUsers()
  }

  async function deleteUser(userId) {
   await supabase.from('users').delete().eq('id', userId)
  
    fetchUsers()
  }
  function shiftAllotment(){
    let shift = ["Shift A","Shift B","Shift C"];
    let i =0;
    users.map((user)=>{


      async function allocate(){
      await supabase.from('users')
      .update({sf:shift[i%3]}).eq('id',user.id)
      }
      allocate()
      i++;
    })
    fetchUsers()
  }
  function displayUser(userId){
    users.map((user)=>{
      if(user.id === userId){
      setUser2({id: user.id, name: user.name, phno: user.phno ,email: user.email})
    }
    })
    
  }

  async function updateUser(userId){

    const {data, error } = await supabase
  .from('users')
  .update({ id: user2.id, name: user2.name, phno: user2.phno, email: user2.email })
  .eq('id', userId)

  fetchUsers()

  if(data){
    console.log(data)
  }
  if(error){
    console.log(error)
  }

  }



  return (
    <div>
      <header>
      <h2>Workers Management</h2>
      </header>
      <h5>Add New Worker</h5>
<form onSubmit={createUser}>
  
  <input
  type='text'
  placeholder='Name'
  name='name'
  onChange={handleChange}
  />
  <input
  type='number'
  placeholder='Phone Number'
  name='phno'
  onChange={handleChange}
  />
  <input
  type='email'
  placeholder='Email Id'
  name='email'
  onChange={handleChange}
  />
  <button type='submit' class="btn btn-success add">Create</button>

</form>
<h5>Update an existing worker</h5>
<form onSubmit={()=>updateUser(user2.id)}>

  <input
  type='text'
  defaultValue={user2.name}
  name='name'
  onChange={handleChange2}
  />
  <input
  type='number'
  defaultValue={user2.phno}
  name='phno'
  onChange={handleChange2}
  />
  <input
  type='email'
  defaultValue={user2.email}
  name='email'
  onChange={handleChange2}
  />
  <button type='submit' class="btn btn-primary">Save</button>

</form>

<div>
  <button type="button" class="btn btn-info" onClick={()=>{shiftAllotment()}}>Assign Shift</button>
</div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone No</th>
            <th>Email Id</th>
            <th>Shift Allotment</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {
            users.map((user)=>

          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.phno}</td>
            <td>{user.email}</td>
            <td>{user.sf}</td>
            <td>
              
              <button  type ="button" class="btn btn-primary mv" onClick={()=>{displayUser(user.id)}}>Edit</button>
              <button type ="button" class="btn btn-danger mv" onClick={()=>{deleteUser(user.id)}}>Delete</button>
              </td>
             
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App

