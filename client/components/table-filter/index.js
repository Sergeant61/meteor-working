import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Lightpick from 'lightpick';
import 'lightpick/css/lightpick.css';

Template.componentsTableFilter.helpers({
  isSelected: function (filterKey, key) {
    const filtering = Template.instance().data.filtering.all();
    if (filtering[filterKey] == key) {
      return true
    }
    return false
  },
  numberIsSelectedStart: function (filterKey) {
    const filtering = Template.instance().data.filtering.all();

    if (filtering[filterKey]) {
      return filtering[filterKey].$gte
    }
    return ''
  },
  numberIsSelectedEnd: function (filterKey) {
    const filtering = Template.instance().data.filtering.all();

    if (filtering[filterKey]) {
      return filtering[filterKey].$lte
    }
    return ''
  }
});

Template.componentsTableFilter.onRendered(function () {
  const self = this;
  self.dropdownEl = document.querySelector(`#tableFilter${self.data.id || ''}`);
  self.dropdownEl.addEventListener('hide.bs.dropdown', function (e) {
    if (e.clickEvent) {
      e.preventDefault();
    }
  });

  this.autorun(function () {
    const filteringData = self.data.filteringData.get();
    self.dataPicker = {};

    filteringData.forEach(filter => {
      const filterKey = filter.filterKey

      if (filter.type == 'data-range') {
        self.dataPicker[filterKey] = new Lightpick({
          field: document.querySelector(`#brd_${self.data.id || ''}_${filterKey}`),
          singleDate: false,
          footer: true,
          onSelect: function (start, end) {
            self.dataPicker[`start_${filterKey}`] = start;
            self.dataPicker[`end_${filterKey}`] = end;
          }
        });
      }
    });
  });

  this.autorun(function () {
    const id = self.data.id || '';

    AppUtil.refreshTokens.get(`tableFilter${id}`);

    const filteringData = self.data.filteringData.get();

    const _filtering = {}
    filteringData.forEach(filter => {
      const filterKey = filter.filterKey

      if (filter.type == 'select-box') {
        const value = FlowRouter.getQueryParam(`brd-${id}-${filterKey}`)
        if (!value || value == "-1") {
          return;
        }
        _filtering[filterKey] = value;
      }

      if (filter.type == 'data-range') {
        const startDate = FlowRouter.getQueryParam(`brd-start-${id}-${filterKey}`);
        const endDate = FlowRouter.getQueryParam(`brd-end-${id}-${filterKey}`);

        if (startDate && endDate) {
          _filtering[filterKey] = {
            $gte: moment(startDate, 'MM-DD-YYYY').toDate(),
            $lte: moment(endDate, 'MM-DD-YYYY').toDate()
          };
          self.dataPicker[filterKey].setDateRange(_filtering[filterKey].$gte, _filtering[filterKey].$lte)
        }
      }

      if (filter.type == 'number-range') {
        const startValue = parseFloat(FlowRouter.getQueryParam(`brd-start-${id}-${filterKey}`));
        const endValue = parseFloat(FlowRouter.getQueryParam(`brd-end-${id}-${filterKey}`));

        const obj = {}

        if (!isNaN(startValue)) {
          obj.$gte = startValue
        }

        if (!isNaN(endValue)) {
          obj.$lte = endValue
        }

        if (Object.keys(obj).length > 0) {
          _filtering[filterKey] = obj
        }
      }

    });

    self.data.filtering.clear()
    self.data.filtering.set(_filtering);
  });
});

Template.componentsTableFilter.events({
  'submit form': function (event, template) {
    event.preventDefault();

    const filteringData = template.data.filteringData.get();
    const id = template.data.id || '';
    const filteringParams = new ReactiveDict();

    filteringData.forEach(filter => {
      const filterKey = filter.filterKey

      if (filter.type == 'select-box') {
        const value = event.target[`brd_${id}_${filterKey}`].value;
        if (value == "-1") {
          return;
        }
        filteringParams.set(`brd-${id}-${filterKey}`, value)
      }

      if (filter.type == 'data-range') {
        const startDate = template.dataPicker[`start_${filterKey}`];
        const endDate = template.dataPicker[`end_${filterKey}`];
        if (startDate && endDate) {
          const datePicker = template.dataPicker[filterKey];

          filteringParams.set(`brd-start-${id}-${filterKey}`, moment(datePicker.getStartDate()).format('MM-DD-YYYY'))
          filteringParams.set(`brd-end-${id}-${filterKey}`, moment(datePicker.getEndDate()).format('MM-DD-YYYY'))
        }
      }

      if (filter.type == 'number-range') {
        const startValue = parseFloat(event.target[`brd_start_${id}_${filterKey}`].value);
        const endValue = parseFloat(event.target[`brd_end_${id}_${filterKey}`].value);

        if (!isNaN(startValue)) {
          filteringParams.set(`brd-start-${id}-${filterKey}`, startValue)

        }

        if (!isNaN(endValue)) {
          filteringParams.set(`brd-end-${id}-${filterKey}`, endValue)
        }
      }
    });

    const queryParams = filteringParams.all();
    Object.keys(FlowRouter.current().queryParams).forEach(queryParam => {

      const index = filteringData.findIndex(filter => {
        const filterKey = filter.filterKey;

        if (`brd-${id}-${filterKey}` == queryParam) {
          return true;
        }

        if (`brd-start-${id}-${filterKey}` == queryParam) {
          return true;
        }

        if (`brd-end-${id}-${filterKey}` == queryParam) {
          return true;
        }

        return false;
      });

      if (index != -1 && !queryParams[queryParam]) {
        FlowRouter.setQueryParams({ [queryParam]: null });
      }
    });

    FlowRouter.setQueryParams(queryParams);
    AppUtil.refreshTokens.set(`tableFilter${id}`, Random.id());
  }
});