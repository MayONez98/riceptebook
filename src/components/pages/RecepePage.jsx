import React from 'react';

export default function ReceptPage({ recept }) {
  const [recept, setRecept] = useState('');

  







export default function RecepePage({ //взять пропс из базы }) {

  return (
    <div>
      <h1>Страница рецепта</h1>
      {recipe && (
        <div>
          <img src={recipe.image} alt={recipe.name} />
          <h2>{recipe.name}</h2>
          <p>Ингредиенты:</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>Инструкция по приготовлению: {recipe.instructions}</p>
          <button onClick={handleAddToFavorites}>Добавить в избранное</button>
        </div>
      )}
    </div>
  );
};