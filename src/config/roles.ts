const allRoles = {
  user: ['getMenu', 'getOrder', 'manageOrder'],
  admin: ['getUsers', 'manageUsers'],
  chef: ['manageMeals', 'getOrder', 'getMenu'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
