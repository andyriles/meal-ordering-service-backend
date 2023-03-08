const allRoles = {
  user: ['manageMenu', 'getMeals'],
  admin: ['getUsers', 'manageUsers'],
  chef: ['manageMeals', 'getOrders', 'getMeals'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
