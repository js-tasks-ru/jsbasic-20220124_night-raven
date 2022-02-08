function makeFriendsList(friends) {
  const ul = document.createElement('UL');
  for (const friend of friends){
    const li = document.createElement('LI');
    li.innerText = `${friend.firstName} ${friend.lastName}`
    ul.appendChild(li);
  }
  return ul;
}
