function Card({ title, description }) {
  return (
    <div className="bg-card-gradient rounded-xl shadow-xl p-8 text-white">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Card;