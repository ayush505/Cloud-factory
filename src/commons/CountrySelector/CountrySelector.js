/* eslint-disable */
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getChildrenOfId } from 'utils/GeoNameApi';

const { Option } = Select;
const Container = styled.div`
  flex: 1;
  justify-content: center;
`;
export default function CountrySelector({
  className,
  onChange,
  onBlur,
  onFocus,
  onSearch,
  countryList,
  defaultValue,
  disabled
}) {
  let [countryListGeoName, setCountryListGeoName] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geoNameContinentIds = [
      '6255146',
      '6255152',
      '6255147',
      '6255148',
      '6255149',
      '6255151',
      '6255150'
    ];
    geoNameContinentIds.map((geoNameContinentId) =>
      getChildrenOfId(geoNameContinentId)
        .then((response) => {
          countryListGeoName = countryListGeoName.concat(response.geonames);
          setCountryListGeoName(countryListGeoName);
          setLoading(false);
        })
        .catch((err) => {
          throw err;
        })
    );
  }, []);
  /* istanbul ignore next */
  const getCountryList = () => {
    if (countryList) {
      return countryListGeoName
        .filter((country) => countryList.includes(country.countryCode))
        .map((country) => country.name);
    }
    return countryListGeoName.map((country) => ({
      name: country.name,
      id: country.geonameId,
      code: country.countryCode
    }));
  };

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      onChange={(countryName) => {
        if (typeof onChange === 'function') {
          onChange(
            countryListGeoName
              .map(({ name, geonameId, countryCode }) => ({
                name,
                id: geonameId,
                sortname: countryCode
              }))
              .filter((country) => country.name === countryName)[0]
          );
        }
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      defaultValue={defaultValue || 'India'}
      data-loc="ui-infra-country-selector-container-select"
      disabled={disabled || false}
    >
      {!loading &&
        getCountryList().map((countryItem) => {
          return (
            <Option value={countryItem.name} key={countryItem.code}>
              {countryItem.name}
            </Option>
          );
        })}
    </Select>
  );
}
