/* eslint-disable*/
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { StyledCardWithTable } from '../../Styling';
import FileSaver from 'file-saver';
import JSZip from 'jszip';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '70%'
  },
  {
    title: '',
    dataIndex: 'actions'
  }
];
const StyledActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 10px;
  font-size: 16px;
`;

const DownloadOutlinedBtn = styled(DownloadOutlined)`
  color: #0486ff;
  align-self: center;
`;

const getNameOfDoc = (document = '') => {
  const docArray = document.split('/');
  return docArray[docArray.length - 1];
};

export default function DocumentsContent(props) {
  const { tenderDocument, additionalDocuments, totId } = props.data;

  const documentsList = tenderDocument ? tenderDocument.split(',') : [];
  const additionalDocumentsList = additionalDocuments ? additionalDocuments.split(',') : [];
  const dataSource = [];

  (documentsList || []).map((doc) =>
    dataSource.push({
      name: getNameOfDoc(doc),
      url: doc,
      actions: (
        <StyledActions>
          <DownloadOutlinedBtn onClick={() => onDownload(doc)} />
        </StyledActions>
      )
    })
  );

  (additionalDocumentsList || []).map((doc) =>
    dataSource.push({
      name: getNameOfDoc(doc),
      url: doc,
      actions: (
        <StyledActions>
          <a href={doc} target="_blank">
            <EyeOutlined />
          </a>
          <DownloadOutlinedBtn onClick={() => onDownload(doc)} />
        </StyledActions>
      )
    })
  );

  const onDownload = (url) => {
    FileSaver.saveAs(url, getNameOfDoc(url));
  };

  const downloadAll = () => {
    const zip = new JSZip();
    const download = async (item) => {
      await fetch(item.url)
        .then((response) => response.blob())
        .then((blob) => {
          console.log(blob);
          zip.file(item.name, blob);
        });
    };

    const arrOfFiles = dataSource.map(async (item) => await download(item)); //create array of promises
    Promise.all(arrOfFiles)
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then(function (blob) {
          FileSaver.saveAs(blob, `${totId}.zip`);
          // FileSaver.saveAs(blob, `TenderDocuments.zip`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StyledCardWithTable
      title={`Documents (${dataSource?.length})`}
      extra={
        <Button type="link" onClick={downloadAll}>
          Download All
        </Button>
      }
    >
      <Table columns={columns} pagination={false} dataSource={dataSource} />
    </StyledCardWithTable>
  );
}
