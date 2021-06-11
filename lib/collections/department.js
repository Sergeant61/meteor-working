import SimpleSchema from 'simpl-schema';

Departments = new Mongo.Collection('department');

DepartmentSchema = new SimpleSchema({
  name: String,
  
  description:  {
    type: String,
    optional: true
  }
});

Departments.attachSchema(DepartmentSchema);
Departments.softRemovable();
Departments.autoDates();
Departments.lastEditUser();
Departments.createdUser();