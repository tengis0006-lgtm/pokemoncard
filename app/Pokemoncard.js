"use client";
import { useEffect, useState } from "react";

const API = "https://pokeapi.co/api/v2/pokemon";

export const PokemonPage = () => {
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const showPokemon = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setHero(data);
      } else {
        setError("HERO......0");
      }
    } catch (fetchError) {
      setError("internet shalga .....");
    }
    setIsLoading(false);
  };
  const showRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    showPokemon(randomId);
  };
  useEffect(() => {
    showPokemon(7);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">⚡ Покемон карт</h1>

      <div className="flex h-[440px] w-80 flex-col items-center justify-center rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
        {isLoading && (
          <p className="animate-pulse text-xl font-semibold text-slate-400">
            Loading rn...
          </p>
        )}

        {!isLoading && error !== "" && (
          <p className="text-xl font-semibold text-slate-400 animate-pulse">
            {error}
          </p>
        )}

        {!isLoading && error === "" && hero !== null && (
          <>
            <p className="self-start text-sm font-bold text-slate-400">
              #{hero.id}
            </p>
            <img
              src={hero.sprites.other["official-artwork"].front_default}
              alt={hero.name}
              className="h-48 w-48"
            />
            <div className="flex flex-col gap-[8px]">
              <p className="text-xl font-bold">{hero.name}</p>
              <p className="text-center rounded-lg bg-pink-700 px-3 py-1 text-white">
                {hero.types.map((item) => item.type.name).join(" / ")}
              </p>
            </div>
            <div className="mt-5 w-full gap-2 text-center flex justify-around px-3">
              <div className="rounded-xl bg-slate-100 w-[100px] py-2">
                <p className="text-xs text-slate-500">❤️ HP</p>
                <p className="text-xl font-bold">{hero.stats[1].base_stat}</p>
              </div>
              <div className="rounded-xl bg-slate-100 w-[100px] py-2">
                <p className="text-xs text-slate-500">❤️ Attack</p>
                <p className="text-xl font-bold">{hero.stats[2].base_stat}</p>
              </div>
              <div className="rounded-xl bg-slate-100 w-[100px] py-2">
                <p className="text-xs text-slate-500">❤️ Defense</p>
                <p className="text-xl font-bold">{hero.stats[3].base_stat}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <button
        onClick={showRandomPokemon}
        disabled={isLoading}
        className="rounded-xl bg-yellow-400 px-8 py-3 text-lg font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-50"
      >
        🎲 Санамсаргүй
      </button>
    </main>
  );
};
