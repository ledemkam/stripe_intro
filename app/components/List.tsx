import { SchemaData } from "../types";
import Card from "./Card";

type ListProps = {
  data: SchemaData[];
};

const List = ({ data }: ListProps) => {
  return (
    <section className="p-3">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
export default List;
