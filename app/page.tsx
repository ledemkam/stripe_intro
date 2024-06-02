import List from "./components/List";
import data from "./data/data.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <List data={data} />
    </main>
  );
}
