function showSalary(users, age) {
  users = users.filter((user)=>user.age <= age);
  let sallariesArr = users.map((user,index,users)=>{
    if (index === users.length - 1){
      return `${user.name}, ${user.balance}`
    }
    return `${user.name}, ${user.balance}\n`
  })
  return sallariesArr.join('');
}
