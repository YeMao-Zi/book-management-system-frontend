import { Button, Form, Input } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    login({
      username: values.username,
      password: values.password,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="w-[400px] my-50 text-center mx-auto">
      <h1>图书管理系统</h1>
      <Form
        form={form}
        autoComplete="off"
        {...formLayout}
        colon={false}
        onSubmit={onSubmit}
      >
        <Form.Item
          label="用户名"
          field="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          field="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button className="w-full" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
