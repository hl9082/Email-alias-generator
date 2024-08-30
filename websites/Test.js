axios.get('https://reqres.in/api/users?page=2')
.then(res=>handleData(res.data))
.catch(err=>console.log(err));
function handleData(data){
  console.log(data);
}