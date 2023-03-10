const allRoles = {
  user: ['getMenu', 'getOrders', 'manageOrders'],
  admin: ['getUsers', 'manageUsers'],
  chef: ['manageMeals', 'getOrders', 'getMenu'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
