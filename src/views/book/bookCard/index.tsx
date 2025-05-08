import React from "react";
import { Book } from "@/types/book";
import { Button, Card } from "@arco-design/web-react";

interface BookCardProps {
  data: Book;
  onEdit?: (data: Book) => void;
  onDelete?: (data: Book) => void;
  onDetail?: (data: Book) => void;
}
const BookCard: React.FC<BookCardProps> = ({
  data,
  onEdit,
  onDelete,
  onDetail,
}) => {
  return (
    <Card
      style={{ width: 250 }}
      hoverable
      cover={
        <img
          className="w-full h-[250px] object-cover"
          src={data.cover}
        />
      }
    >
      <div className="flex flex-col gap-1">
        <div>{data.name}</div>
        <div>{data.author}</div>
        <div className="flex justify-between mt-2">
          <Button type="text" onClick={() => onDetail?.(data)}>
            详情
          </Button>
          <Button type="text" onClick={() => onEdit?.(data)}>编辑</Button>
          <Button type="text" onClick={() => onDelete?.(data)}>删除</Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
