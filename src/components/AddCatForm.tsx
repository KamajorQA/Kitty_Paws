import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { INewCatData } from '../models/data';
import { useAddNewCatMutation } from '../store/services/catsApi';
const { TextArea } = Input;

function AddCatForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [addNewCat] = useAddNewCatMutation();

  const createPost = async (values: INewCatData) => {
    const ok = await addNewCat(values).unwrap();
    if (ok === 'ok') {
      message.success('submit success!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      message.error('submit failed!');
    }
  };

  const imgFiller =
    'https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200c/0_PUSS-IN-BOOTS.jpg';

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const handlePostSubmit = (values: INewCatData) => {
    if (values.image?.length === 0 || values.image === undefined) {
      const arrengedValues = { ...values, image: imgFiller };
      createPost(arrengedValues as INewCatData);
    } else {
      createPost(values);
    }
    form.resetFields();
  };

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleSubmitError = () => {
    message.error('submit failed!');
  };

  return (
    <Form
      name="new-cat-form"
      layout="horizontal"
      {...layout}
      form={form}
      onFinish={handlePostSubmit}
      onFinishFailed={handleSubmitError}
    >
      <Form.Item
        label="Name"
        name={'title'}
        rules={[
          { required: true, message: 'Cat name is required' },
          { type: 'string', min: 2 },
        ]}
        required
      >
        <Input placeholder="Please type your cats name" />
      </Form.Item>
      <Form.Item
        label="Traits"
        name={'brief'}
        rules={[
          { required: true, message: 'Traits are required' },
          { type: 'string', max: 50 },
        ]}
        required
      >
        <Input placeholder="Provide a brief description" />
      </Form.Item>
      <Form.Item
        label="Image"
        name={'image'}
        rules={[{ type: 'url', warningOnly: true }]}
      >
        <Input placeholder="Please type url address for image" />
      </Form.Item>
      <Form.Item
        label="Bio"
        name={'description'}
        rules={[
          { required: true, message: 'Description is required' },
          { type: 'string', min: 15 },
        ]}
        required
      >
        <TextArea rows={6} placeholder="Describe your cat as you like!" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          htmlType="submit"
          style={{
            margin: '0 10px 5px 0',
            fontSize: '1rem',
            minWidth: '72px',
          }}
        >
          Submit
        </Button>
        <Button
          type="dashed"
          htmlType="button"
          onClick={handleFormReset}
          style={{
            fontSize: '1rem',
            minWidth: '72px',
          }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

export { AddCatForm };
