import SimpleSchema from 'simpl-schema';

Personnels = new Mongo.Collection('personnel');

PersonnelIDInformationSchema = new SimpleSchema({
  tc: {
    type: String,
    optional: true
  },

  populationNo: { // nüfus
    type: String,
    optional: true
  },

  driverLicenseNo: {
    type: String,
    optional: true
  },

  insuranceNo: { // sigorta
    type: String,
    optional: true
  },

  specialInsuranceNo: { // özel sigorta
    type: String,
    optional: true
  },

  placeOfbirth: { // doğum yeri
    type: String,
    optional: true
  },

  bornDate: {
    type: Date,
    optional: true
  },

  maritalStatus: {
    type: String,
    allowedValues: ['married', 'single', 'widow'],
    optional: true
  },

  gender: {
    type: String,
    allowedValues: ['male', 'female'],
    optional: true
  },

  numberOfChildren: {
    type: Number,
    optional: true
  },

  emailAddress: {
    type: String,
    optional: true
  },

  fatherName: {
    type: String,
    optional: true
  },

  motherName: {
    type: String,
    optional: true
  },

});

PersonnelFinancialInformationSchema = new SimpleSchema({
  bankName: {
    type: String,
    optional: true
  },

  branchNumber: { // şube no
    type: String,
    optional: true
  },

  ibanNo: {
    type: String,
    optional: true
  },

  accountNumber: {
    type: String,
    optional: true
  },
});

PersonnelSchema = new SimpleSchema({
  name: String,

  lastName: String,

  phoneNumber: {
    type: String,
    optional: true
  },

  address: {
    type: String,
    optional: true
  },

  description: {
    type: String,
    optional: true
  },

  departmentId: SimpleSchema.RegEx.Id,
  jobId: SimpleSchema.RegEx.Id,
  operationType: SimpleSchema.RegEx.Id,

  workStartSate: {
    type: Date,
    optional: true
  },

  operationType: {
    type: String,
    allowedValues: ['full', 'part-time', 'intern']
  },

  status: {
    type: String,
    allowedValues: ['working', 'not-working', 'left']
  },

  iDInformation: {
    type: PersonnelIDInformationSchema,
    optional: true
  },

  financialInformation: {
    type: PersonnelFinancialInformationSchema,
    optional: true
  },

  payload: {
    type: Object,
    blackbox: true,
    optional: true
  }
});

Personnels.attachSchema(PersonnelSchema);
Personnels.softRemovable();
Personnels.autoDates();
Personnels.lastEditUser();
Personnels.createdUser();