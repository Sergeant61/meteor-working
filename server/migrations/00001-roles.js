Migrations.add({
  version: 1,
  name: 'Roller tanımlanıyor ve admin user oluşturuluyor.',
  up: function () {
    Roles.createRole('roles.admin');
    Roles.createRole('roles.agent');
    Roles.createRole('roles.personnel');

    const userId = Accounts.createUser({
      email: 'admin@bordo.io',
      password: '123123',
      profile: {
        name: 'Bordo',
        lastName: 'Admin'
      }
    });

    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.isAdmin': true,
      }
    })

    Roles.addUsersToRoles(userId, 'roles.admin', null);
  }
});