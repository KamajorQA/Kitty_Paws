import { Col, Layout, Row } from 'antd';

import { TitleComponent } from '../components/Title';
import { AddCatForm } from '../components/AddCatForm';
const { Content } = Layout;

function CreateCatPage() {
  return (
    <Content
      style={{
        padding: '20px 50px',
      }}
    >
      <TitleComponent level={2}>Describe your cat</TitleComponent>

      <main className="contentWrapper">
        <Row justify="center">
          <Col span={12}>
            <AddCatForm />
          </Col>
        </Row>
      </main>
    </Content>
  );
}

export { CreateCatPage };
