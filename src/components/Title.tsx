import { Typography } from 'antd';

const { Title } = Typography;

interface ITitle {
  level: 1 | 2 | 3 | 4 | 5 | undefined;
  children: string | React.ReactNode;
}

function TitleComponent({ level, children }: ITitle) {
  return (
    <Title level={level} style={{ textAlign: 'center', margin: 0 }}>
      {children}
    </Title>
  );
}

export { TitleComponent };
