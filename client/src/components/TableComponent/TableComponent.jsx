import { Table } from 'antd'
import React, { useMemo, useState } from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import {Excel} from "antd-table-saveas-excel"

const TableComponent = (props) => {
  const { selectionType = 'checkbox',data = [], handleDeleteProductMany,handleDeleteUserMany,columns = [] ,isPending = false   } = props
  const [selectRowKeys,setSelectedRowKeys] = useState('')
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  },[columns])
 
  const rowSelection = {
    onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //     disabled: record.name === 'Disabled User',
    //     name: record.name,
    // }),
    }

  const handleDataID = () => {
    if(handleDeleteProductMany) {
      handleDeleteProductMany(selectRowKeys)
      setSelectedRowKeys('')
    }
    if(handleDeleteUserMany) {
      handleDeleteUserMany(selectRowKeys)
      setSelectedRowKeys('')
    }
  }

  const handleExportExcel = () => {
    const excel = new Excel()
    excel
      .addSheet("")
      .addColumns(newColumnExport)
      .addDataSource(data,{
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  }

  return (
    <LoadingComponent isPending={isPending}> 
     {selectRowKeys.length > 0 &&  (
      <div onClick={handleDataID} style={{
        background:'#1d1ddd',
        color:'#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        padding: '10px',
        width: 'fit-content',
        margin: '5px',
        cursor: 'pointer'
      }
      }>
         Xóa tất cả
      </div>
     )
    }
    <button onClick={handleExportExcel}>Export Excel</button>
    <Table
      id="table-xls"
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
      {...props}
      pagination={{ pageSize: 5 }}
    />
    </LoadingComponent>
  )
}

export default TableComponent
