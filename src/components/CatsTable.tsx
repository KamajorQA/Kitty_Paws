import { Button, Table } from 'antd';

import { useControlTable } from '../hooks/useControlTable';
import { IKittensDataArranged } from '../models/data';

function CatsTable() {
  const { setCharmSort, clearCharmSort, handleTableChange, columns, data } =
    useControlTable();

  return (
    <>
      <article className="flexCenter mobileAdaptive tableControls">
        <Button onClick={setCharmSort}>Sort by popularity</Button>
        <Button onClick={clearCharmSort}>Clear sorter</Button>
      </article>
      <Table
        columns={columns}
        dataSource={data as IKittensDataArranged[]}
        onChange={handleTableChange}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          pageSize: 5,
        }}
      />
    </>
  );
}

export { CatsTable };
