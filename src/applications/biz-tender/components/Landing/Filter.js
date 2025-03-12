/*eslint-disable */
import { Button, Col, Divider, Drawer, Form, InputNumber, Row, TreeSelect, Typography } from 'antd';
import apiService from 'apiServices';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import styled from 'styled-components';
import { StyledText } from '../Styling';
import SliderWithInputNumber from './SliderWithInputNumber';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header {
    padding: 16px;

    .ant-drawer-header-title {
      flex-direction: row-reverse;

      .ant-drawer-close {
        margin: 0;
        padding: 1;
      }
    }
  }
  .ant-drawer-body {
    padding: 0;
  }
  .form-container {
    min-height: calc(100vh - 136px);
  }
`;
const FormRow = styled(Row)`
  padding: 16px 16px 0px 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #99a6bf;

  .header-label {
    margin-bottom: 5px;
  }
  .ant-form-item {
    margin: 0;

    label {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      /* Gray/gray-7 */
      color: #99a6bf;
    }
  }

  &.action-btn {
    border-top: 1px solid #e2e6ed;
    padding: 16px;
    margin-top: 16px;
  }
`;

const CustomTreeSelect = styled(TreeSelect)`
  .ant-select-selection-item {
    color: #bfbfbf;
    background: #fff;
    border: 0;
  }
`;

const updateFields = (
  tenderMinValue = '',
  tenderMaxValue = '',
  category = [],
  hsn = [],
  state = [],
  requiredExperience = '',
  requiredComapnyAge = '',
  paymentTerms = [],
  emdCost = ''
) => [
  { name: ['tenderMinValue'], value: tenderMinValue },
  { name: ['tenderMaxValue'], value: tenderMaxValue },
  { name: ['category'], value: category },
  { name: ['hsn'], value: hsn },
  { name: ['state'], value: state },
  { name: ['requiredExperience'], value: requiredExperience },
  { name: ['requiredComapnyAge'], value: requiredComapnyAge },
  { name: ['paymentTerms'], value: paymentTerms },
  { name: ['emdCost'], value: emdCost }
];
export default function Filter(props) {
  const { visible, setVisible } = props;
  const [form] = Form.useForm();

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [hsnOptions, setHsnOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const [categoryCount, setCateroryCount] = useState(0);
  const [stateCount, setStateCount] = useState(0);
  const [hsnCount, setHsnCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const { filters, sortBy, searchText } = useSelector((state) => state.bizTender.TenderList);

  const {
    tenderMinValue,
    tenderMaxValue,
    category,
    hsn,
    state,
    requiredExperience,
    requiredComapnyAge,
    paymentTerms,
    emdCost
  } = filters;

  const [fields, setFields] = useState([]);

  const [range, setRange] = useState({
    tenderMinValue: tenderMinValue,
    tenderMaxValue: tenderMaxValue,
    error: ''
  });

  useEffect(() => {
    setFields(
      updateFields(
        tenderMinValue,
        tenderMaxValue,
        category,
        hsn,
        state,
        requiredExperience,
        requiredComapnyAge,
        paymentTerms,
        emdCost
      )
    );
    setCateroryCount(category.length);
    setStateCount(state.length);
    setHsnCount(hsn.length);
    // setPaymentCount(paymentTerms.length);
  }, [filters]);

  useEffect(() => {
    setRange({
      tenderMinValue,
      tenderMaxValue,
      error: ''
    });
  }, [tenderMinValue, tenderMaxValue]);
  const onChange = (field, allFields) => {
    if (field[0]?.name[0] === 'tenderMinValue' || field[0]?.name[0] === 'tenderMaxValue') {
      const tempRange = { ...range };
      tempRange[field[0].name[0]] = field[0].value;
      if (
        tempRange.tenderMinValue &&
        tempRange.tenderMaxValue &&
        tempRange.tenderMinValue > tempRange.tenderMaxValue
      )
        tempRange.error = 'Please select a valid range';
      else tempRange.error = '';
      setRange(tempRange);
    }
    setFields(allFields);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(actions.fetchTenderFilters(sortBy));

      const asyncFn = async () => {
        const stateList = await apiService.fetchTenderStateList();
        const categoryList = await apiService.fetchTenderCategoryList();
        const hsnCodeList = await apiService.fetchTenderHsnList();
        const paymentTermsList = await apiService.fetchPaymentTermsList();

        setStateOptions(stateList.state_list || []);
        setCategoriesOptions(categoryList.tender_category_list || []);
        setHsnOptions(hsnCodeList.hsn_code_list || []);
        setPaymentOptions(paymentTermsList.payment_term_list || []);
      };
      asyncFn();
    }
  }, [isUserLoggedIn]);

  const getCount = (name) => {
    const field = form.getFieldValue(name);
    if (Array.isArray(field) && field.length) return field.length;
    return 0;
  };

  const handleCountChange = (name) => {
    if (name === 'category') {
      setCateroryCount(getCount(name));
    } else if (name === 'state') {
      setStateCount(getCount(name));
    } else if (name === 'hsn') {
      setHsnCount(getCount(name));
    }
    // else if (name === 'paymentTerms') {
    //   setPaymentCount(getCount(name));
    // }
  };

  const updateFilterData = () => {
    if (!!range.error) return;
    const data = {};
    fields.map((field) => {
      data[field.name[0]] = field.value;
    });
    if (!_.isEqual(filters, data)) dispatch(actions.changeTenderFilter(data, sortBy, searchText));
    setVisible(false);
  };
  const onClose = (e) => {
    if (e.target instanceof HTMLDivElement) {
      updateFilterData();
    } else {
      setVisible(false);
    }
  };
  const onFinish = () => {
    updateFilterData();
  };

  const clearAll = () => {
    form.resetFields();
    setCateroryCount(0);
    setStateCount(0);
    setHsnCount(0);
    setPaymentCount(0);
    setFields(updateFields());
  };

  return (
    <StyledDrawer title="Filter" placement="right" onClose={onClose} visible={visible}>
      <Form
        onFinish={onFinish}
        form={form}
        fields={fields}
        onFieldsChange={(field, allFields) => {
          onChange(field, allFields);
        }}
      >
        <div className="form-container">
          <FormRow>
            <Col xs={24} className="header-label">
              <StyledText>Tender Value</StyledText>
            </Col>
            <Col xs={10}>
              <Form.Item label="Min" name="tenderMinValue" colon={false}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
              to
            </Col>
            <Col xs={10}>
              <Form.Item label="Max" name="tenderMaxValue" colon={false}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </FormRow>

          {!!range.error && (
            <FormRow>
              <Typography.Text type="danger">{range.error}</Typography.Text>
            </FormRow>
          )}
          <FormRow>
            <Col xs={24} className="header-label">
              <StyledText>
                Category <span className="count-class">({categoryCount})</span>
              </StyledText>
            </Col>
            <Col xs={24}>
              <Form.Item name="category">
                <CustomTreeSelect
                  name="category"
                  treeData={categoriesOptions}
                  treeCheckable={true}
                  onChange={() => handleCountChange('category')}
                  placeholder="Search and select Category"
                  showArrow
                  maxTagCount={0}
                  maxTagPlaceholder="Search and select Category"
                />
              </Form.Item>
            </Col>
          </FormRow>

          <FormRow>
            <Col xs={24} className="header-label">
              <StyledText>
                HSN <span className="count-class">({hsnCount})</span>
              </StyledText>
            </Col>
            <Col xs={24}>
              <Form.Item name="hsn">
                <CustomTreeSelect
                  name="hsn"
                  treeData={hsnOptions}
                  treeCheckable={true}
                  onChange={() => handleCountChange('hsn')}
                  placeholder="Search and select HSN"
                  showArrow
                  maxTagCount={0}
                  maxTagPlaceholder="Search and select HSN"
                />
              </Form.Item>
            </Col>
          </FormRow>
          <FormRow>
            <Col xs={24} className="header-label">
              <StyledText>
                State <span className="count-class">({stateCount})</span>
              </StyledText>
            </Col>
            <Col xs={24}>
              <Form.Item name="state">
                <CustomTreeSelect
                  name="state"
                  treeData={stateOptions}
                  treeCheckable={true}
                  onChange={() => handleCountChange('state')}
                  placeholder="Search and select State"
                  showArrow
                  maxTagCount={0}
                  maxTagPlaceholder="Search and select State"
                />
              </Form.Item>
            </Col>
          </FormRow>
          <FormRow>
            <SliderWithInputNumber
              label="Required Experience"
              name="requiredExperience"
              suffix="Years"
              maxRange={50}
              defaultValue={requiredExperience}
            />
          </FormRow>
          <FormRow>
            <SliderWithInputNumber
              label="Required Company Age"
              name="requiredComapnyAge"
              suffix="Years"
              maxRange={50}
              defaultValue={requiredComapnyAge}
            />
          </FormRow>
          {/* <FormRow>
            <Col xs={24} className="header-label">
              <StyledText>
                Payment Terms <span className="count-class">({paymentCount})</span>
              </StyledText>
            </Col>

            <Col xs={24}>
              <Form.Item name="paymentTerms">
                <CustomTreeSelect
                  name="paymentTerms"
                  treeData={paymentOptions}
                  treeCheckable={true}
                  onChange={() => handleCountChange('paymentTerms')}
                  placeholder="Select Payment Terms"
                  tagRender={renderCustomTreeSelectedTag}
                  showArrow
                  maxTagCount={0}
                />
              </Form.Item>
            </Col>
          </FormRow> */}
          <FormRow>
            <SliderWithInputNumber
              label="Maximum EMD Cost"
              name="emdCost"
              suffix="INR"
              maxRange={500000}
              defaultValue={emdCost}
            />
          </FormRow>
        </div>
        <FormRow justify="space-between" className="action-btn">
          <Col>
            <Form.Item>
              <Button type="primary" ghost onClick={clearAll}>
                Clear all
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </FormRow>
      </Form>
    </StyledDrawer>
  );
}
