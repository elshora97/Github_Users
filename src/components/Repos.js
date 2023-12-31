import React from "react";
import styled from "styled-components";
import { GithubContext, useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  //Langauges
  const mostUsedLang = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  console.log(mostUsedLang);

  //Stars per lang

  const mostPopularLang = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((lang) => {
      return { ...lang, value: lang.stars };
    })
    .slice(0, 5);
  //stars and forks

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };

      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLang} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopularLang} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    // width: 100% !important;
  }
  svg {
    width: 100% !important;
    min-width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
