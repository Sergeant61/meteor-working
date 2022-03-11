Migrations.add({
  version: 3,
  name: 'İzinler tanimlaniyor: permissions.job',
  up: function () {
    Roles.createRole('permissions.job');
    Roles.createRole('permissions.job.read');
    Roles.createRole('permissions.job.update');
    Roles.createRole('permissions.job.delete');

    Roles.addRolesToParent([
      'permissions.job.read',
      'permissions.job.update',
      'permissions.job.delete',
    ], 'permissions.job');

    Roles.addRolesToParent([
      'permissions.job.read',
    ], 'roles.job');

    Roles.addRolesToParent([
      'permissions.job',
    ], 'roles.agent');

    Roles.addRolesToParent([
      'permissions.job.read',
    ], 'roles.personnel');

    Roles.addRolesToParent([
      'permissions.job',
    ], 'roles.admin');
  }
});