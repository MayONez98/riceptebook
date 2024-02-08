import React from 'react';

export default function ReceptPage({ recipe }) {
  // Функция для добавления в избранное (нужно реализовать)
  // const handleAddToFavorites = () => {
    // ...
  };
  return (
    <div>
      <h1>Страница рецепта</h1>
      {recipe && (
        <div>
          <img src={recipe.img} alt={recipe.title} />
          <h2>{recipe.title}</h2>
          <p>
            Ингредиенты:
            {recipe.ingredient}
          </p>
          <p>
            Инструкция по приготовлению:
            {recipe.body}
          </p>
          <button onClick={handleAddToFavorites}>Добавить в избранное</button>
        </div>
      )}
    </div>
  );
}
