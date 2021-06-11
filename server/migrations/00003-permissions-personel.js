Migrations.add({
  version: 3,
  name: 'İzinler tanimlaniyor: permissions.personnel',
  up: function () {
    Roles.createRole('permissions.personnel');
    Roles.createRole('permissions.personnel.read');
    Roles.createRole('permissions.personnel.update');
    Roles.createRole('permissions.personnel.delete');

    Roles.addRolesToParent([
      'permissions.personnel.read',
      'permissions.personnel.update',
      'permissions.personnel.delete',
    ], 'permissions.personnel');

    Roles.addRolesToParent([
      'permissions.personnel.read',
    ], 'roles.personnel');

    Roles.addRolesToParent([
      'permissions.personnel',
    ], 'roles.agent');

    Roles.addRolesToParent([
      'permissions.personnel',
    ], 'roles.admin');
  }
});