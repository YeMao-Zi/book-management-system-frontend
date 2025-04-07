import { Button, Form, Input, RulesProps } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import { register } from "./api";

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    register({
      username: values.username,
      password: values.password,
    }).then(() => {
      navigate("/");
    });
  };

  const password2validator: RulesProps["validator"] = async (
    value: any,
    callback
  ) => {
    if (value !== form.getFieldValue("password")) {
      callback("两次密码不一致!");
    } else {
      callback();
    }
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
        <Form.Item
          label="确认密码"
          field="password2"
          rules={[
            { required: true, message: "请输入确认密码!" },
            {
              validator: password2validator,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <a href="/login">已有账号？去登录</a>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button className="w-full" type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
