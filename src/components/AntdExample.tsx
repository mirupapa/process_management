import React from 'react';
import { Button, DatePicker, Space } from 'antd';

export const AntdExample: React.FC = () => {
  return (
    <Space direction="vertical">
      <Button type="primary">ボタン</Button>
      <DatePicker placeholder="日付を選択" />
    </Space>
  );
};
