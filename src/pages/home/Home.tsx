import axios from "axios";
import "./Home.scss";
import { useEffect, useState } from "react";

interface Person {
  id: string;
  name: string;
  comment: string;
}

const Home = () => {
  const [todo, setTodo] = useState<Person[]>([]);
  const [done, setDone] = useState<Person[]>([]);

  async function GetApi() {
    try {
      const res = await axios.get<Person[]>(
        `https://68916c9b447ff4f11fbc8524.mockapi.io/todo/Commenta`
      );
      setTodo(res.data);
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    }
    CancelTodo;
  }

  console.log(todo);

  function AddDone(item: Person) {
    if (!done.find((el) => el.id === item.id)) {
      const updatedDone = [...done, item];
      setDone(updatedDone);
      localStorage.setItem("done", JSON.stringify(updatedDone));
    }
  }

  function DoneDel(item: Person) {
    const updatedDone = done.filter((el) => el.id !== item.id);
    setDone(updatedDone);
    localStorage.setItem("done", JSON.stringify(updatedDone));
  }

  async function CancelTodo(item: Person) {
    await axios.delete(
      `https://68916c9b447ff4f11fbc8524.mockapi.io/todo/Commenta/${item.id}`
    );
  }

  // Загрузка done из localStorage при монтировании
  useEffect(() => {
    const savedDone: Person[] = JSON.parse(
      localStorage.getItem("done") || "[]"
    );
    setDone(savedDone);
  }, []);

  return (
    <section id="home">
      <div className="container">
        <div className="home">
          <div className="home--header">
            <h1>Get random task</h1>
            <select>
              <option value="">Select category</option>
            </select>
            <button onClick={GetApi}>Get</button>
            <h3>Your Points: {done.length}</h3>
          </div>

          <div className="home--todo">
            <h1>Todo</h1>
            <div className="home--todo__blocks">
              {todo.map((el) => (
                <div className="home--todo__blocks--block" key={el.id}>
                  <h2>
                    {el.name} <br />
                    <span>{el.comment}</span>
                  </h2>
                  <div className="home--todo__blocks--block__btn">
                    <button onClick={() => AddDone(el)}>Done</button>
                    <button onClick={() => CancelTodo(el)}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home--done">
            <h1>Done</h1>
            <div className="home--done__blocks">
              {done.map((el) => (
                <div className="home--done__blocks--block" key={el.id}>
                  <h2>
                    {el.name} <br />
                    <span>{el.comment}</span>
                  </h2>
                  <button onClick={() => DoneDel(el)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
