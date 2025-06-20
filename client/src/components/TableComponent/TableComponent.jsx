import { Table } from 'antd'
import React from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

const TableComponent = (props) => {
  const { selectionType = 'checkbox',data = [],columns = [] ,isPending = false   } = props
 
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
    }
  return (
    <LoadingComponent isPending={isPending}> 
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </LoadingComponent>
  )
}

export default TableComponent
