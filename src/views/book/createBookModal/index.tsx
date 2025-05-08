import { Modal, Form, Input, Message } from "@arco-design/web-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import FileUpload from "@/components/FileUpload";
import * as bookApi from "../api";

export interface Instance {
  open: (id?: number) => void;
}

export interface CreateBookModalProps {
  onSuccess?: () => void;
}

const CreateBookModal = forwardRef(
  ({ onSuccess }: CreateBookModalProps, ref?: React.ForwardedRef<Instance>) => {
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);
    const [id, setId] = useState<number>();
    const formCover = Form.useWatch("cover", form);

    const getDetail = async (id: number) => {
      const res = await bookApi.detail(id);
      form.setFieldsValue(res);
      form.setFieldValue("cover", [
        {
          uid: `${res.id}`,
          name: res.cover.split("/").slice(-1)[0],
          url: res.cover,
          status: "done",
        },
      ]);
      console.log(form.getFieldsValue(), "form.getFieldsValue()");
    };

    const open = (id?: number) => {
      form.resetFields();
      setId(id);
      setVisible(true);
      form.setFieldValue("cover", []);
      console.log(form.getFieldsValue(), "form.getFieldsValue()");
      if (id) getDetail(id);
    };

    useImperativeHandle(ref, () => ({ open }));
    const handleOk = async () => {
      await form.validate();
      const data = form.getFieldsValue();
      const coverItem = data.cover?.[0];
      const cover = coverItem?.response || coverItem?.url;
      const request = id ? bookApi.update : bookApi.create;
      request({ ...data, cover, id })
        .then(() => {
          onSuccess?.();
          Message.success("创建成功");
        })
        .finally(() => {
          setVisible(false);
        });
    };

    const handleCancel = () => {
      setVisible(false);
    };

    return (
      <Modal
        autoFocus={false}
        title="创建图书"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="书名"
            field="name"
            rules={[{ required: true, message: "请输入书名" }]}
          >
            <Input placeholder="请输入书名" />
          </Form.Item>
          <Form.Item
            label="作者"
            field="author"
            rules={[{ required: true, message: "请输入作者" }]}
          >
            <Input placeholder="请输入作者" />
          </Form.Item>
          <Form.Item
            label="描述"
            field="description"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input.TextArea autoSize placeholder="请输入描述" />
          </Form.Item>
          <Form.Item
            label="封面"
            field="cover"
            rules={[{ required: true, message: "请添加封面" }]}
          >
            <FileUpload
              fileList={formCover}
              imagePreview
              listType="picture-card"
              limit={1}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default CreateBookModal;
