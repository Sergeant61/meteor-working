import query from 'array-query';

Migrations.add({
  version: 2,
  name: 'Türkiye lokasyonları yükleniyor',
  up: function () {
    const countries = JSON.parse(Assets.getText('seeds/locations/turkey/countries.json'));
    const cities = JSON.parse(Assets.getText('seeds/locations/turkey/cities.json'));
    const districts = JSON.parse(Assets.getText('seeds/locations/turkey/districts.json'));
    const neighborhoods = JSON.parse(Assets.getText('seeds/locations/turkey/neighborhoods.json'));

    countries.forEach(function (country) {
      const countryId = Locations.insert({
        name: country.name,
        isParent: true,
        labelKey: 'locations.country',
        childLabelKey: 'locations.city'
      });

      cities.forEach(function (city) {
        const cityId = Locations.insert({
          name: city.name,
          isParent: true,
          labelKey: 'locations.city',
          childLabelKey: 'locations.district',
          parentLocationId: countryId
        });

        const childDistricts = query('parent').is(city.code).on(districts);

        childDistricts.forEach(function (district) {
          const districtId = Locations.insert({
            name: district.name,
            isParent: true,
            labelKey: 'locations.district',
            childLabelKey: 'locations.neighborhood',
            parentLocationId: cityId
          });

          const childNeighborhoods = query('parent').is(district.code).on(neighborhoods);

          childNeighborhoods.forEach(function (neighborhood) {
            Locations.insert({
              name: neighborhood.name,
              isParent: false,
              labelKey: 'locations.neighborhood',
              parentLocationId: districtId
            });
          });
        });
      });
    });
  }
});