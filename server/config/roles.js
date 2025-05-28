const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  MEMBER: 'member'
};

const COUNTRIES = {
  INDIA: 'India',
  AMERICA: 'America'
};

const PERMISSIONS = {
  VIEW_RESTAURANTS: 'view_restaurants',
  CREATE_ORDER: 'create_order',
  PLACE_ORDER: 'place_order',
  CANCEL_ORDER: 'cancel_order',
  UPDATE_PAYMENT: 'update_payment',
  ADD_RESTAURANT: 'add_restaurant'
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_RESTAURANTS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.PLACE_ORDER,
    PERMISSIONS.CANCEL_ORDER
  ],
  [ROLES.MEMBER]: [
    PERMISSIONS.VIEW_RESTAURANTS,
    PERMISSIONS.CREATE_ORDER
  ]
};

module.exports = {
  ROLES,
  COUNTRIES,
  PERMISSIONS,
  ROLE_PERMISSIONS
};