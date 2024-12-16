// app/greet/[name]/page.js

export default function Greet({ params }) {
  const { name } = params;

  return <h1>Cześć, {name}!</h1>;
}
