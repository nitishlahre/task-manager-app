export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const tasks = await res.json();
  
    return {
      props: { tasks }, // Will be passed to the page component as props
    };
  }

export default function Home({ tasks }) {
    return (
      <div>
        <h1>Server-Side Rendered Posts</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }