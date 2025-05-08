import { useEffect, useRef, useState } from "react";
import * as bookApi from "./api";
import { Button, Form, Input } from "@arco-design/web-react";
import BookCard from "./bookCard";
import CreateBookModal, { Instance } from "./createBookModal";
import type { Book } from "@/types/book";

const FormItem = Form.Item;
function BookManger() {
  const [form] = Form.useForm();
  const [bookList, setBookList] = useState<Book[]>([]);

  const createBookModalRef = useRef<Instance>(null);

  const onSubmit = (values: any) => {
    getList(values.name);
  };

  const openCreateModal = (id?: number) => {
    createBookModalRef.current?.open(id);
  };

  const handleDelete = async (data: Book) => {
    await bookApi.deleteBook(data.id);
    getList(form.getFieldsValue()?.name);
  };
  const handleCreateBookSuccess = () => {
    getList(form.getFieldsValue()?.name);
  };

  const getList = async (name?: string) => {
    const res = await bookApi.list({ name });
    setBookList(res);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="flex flex-col h-screen box-border overflow-hidden px-10">
      <div className="shrink-0">
        <h1>图书管理系统</h1>
        <Form form={form} layout="inline" onSubmit={onSubmit}>
          <FormItem label="图书名称" field="name">
            <Input placeholder="请输入图书名称" />
          </FormItem>
          <FormItem>
            <div className="flex gap-2">
              <Button type="primary" htmlType="submit">
                搜索图书
              </Button>
              <Button type="primary" onClick={() => openCreateModal()}>
                新增图书
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>

      <div className="flex-1 overflow-auto py-2 box-border flex flex-row gap-2">
        {bookList.map((item) => (
          <div key={item.id}>
            <BookCard
              data={item}
              key={item.id}
              onEdit={(data) => openCreateModal(data.id)}
              onDelete={(data) => handleDelete(data)}
            />
          </div>
        ))}
      </div>

      <CreateBookModal
        ref={createBookModalRef}
        onSuccess={handleCreateBookSuccess}
      />
    </div>
  );
}

export default BookManger;
