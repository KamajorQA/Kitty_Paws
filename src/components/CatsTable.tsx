import { Button, Table } from 'antd';

import { useControlTable } from '../hooks/useControlTable';

function CatsTable() {
  const {
    setCharmSort,
    clearCharmSort,
    handleTableChange,
    columns,
    arrangedKittensData,
  } = useControlTable();

  return (
    <>
      <article className="flexCenter mobileAdaptive tableControls">
        <Button onClick={setCharmSort}>Sort by popularity</Button>
        <Button onClick={clearCharmSort}>Clear sorter</Button>
      </article>
      <Table
        columns={columns}
        dataSource={arrangedKittensData}
        onChange={handleTableChange}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          pageSize: 3,
        }}
      />
    </>
  );
}

export { CatsTable };
