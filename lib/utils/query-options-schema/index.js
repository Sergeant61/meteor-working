import SimpleSchema from 'simpl-schema';

PaginationSchema = new SimpleSchema({
  currentPage: {
    type: SimpleSchema.Integer
  },

  pageItems: {
    type: SimpleSchema.Integer
  }
});

SortingSchema = new SimpleSchema({
  sortField: {
    type: String
  },

  sortOrder: {
    type: String
  }
});

QueryOptionsSchema = new SimpleSchema({
  pagination: {
    type: PaginationSchema,
    optional: true
  },

  sorting: {
    type: SortingSchema,
    optional: true
  },

  filtering: {
    type: Object,
    blackbox: true,
    optional: true
  },

  searching: {
    type: Object,
    blackbox: true,
    optional: true
  }
});