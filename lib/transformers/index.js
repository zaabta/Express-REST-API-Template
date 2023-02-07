const userTransformer = user => {
  if (user)
    return {
      name: user?.username,
      email: user?.email,
      avatar: user?.Photo?.url,
      type: user?.UserType.type
    };
  return user;
};

const usersTransformer = users => {
    if(Array.isArray(users) && users?.length > 0)
     return users.map(user => userTransformer(user))
}

module.exports = {
  userTransformer,
  usersTransformer
};
