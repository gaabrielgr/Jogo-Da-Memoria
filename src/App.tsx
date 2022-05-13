import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import { Button } from "./components/Button/Index";
import { InfoItem } from "./components/InfoItem";
import RestartIcon from "./svgs/restart.svg";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/Items";
import { GridItem } from "./components/GridItem";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { formatTImeElapsed } from "./helpers/formatTimeElapsed";
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  useEffect(() => {
    resetAndCreateGrid();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);
  //verifica se os items abertos sao iguais
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        //se os itens sao iguais, tornar permanentes
        if (opened[0].item === opened[1].item) {
          let tempGrid = [...gridItems];

          for (let i in tempGrid) {
            if (tempGrid[i].shown) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);
          setShownCount(0);
        } else {
          //se nao for igual desvirar as cartas
          setTimeout(() => {
            let tempGrid = [...gridItems];
            for (let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setShownCount(0);
          }, 500);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);
  //fim de jogo
  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);
  const pausedGame = () => {
    if (playing) {
      setPause(true);
      setPlaying(false);
    } else {
      setPause(false);
      setPlaying(true);
    }
  };
  const resetAndCreateGrid = () => {
    //1 passo - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    //2 passo  - criar o grid
    //2.1 - criar um grid vazio
    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }
    //2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }
    //2.3 - jogar no state
    setGridItems(tempGrid);

    //3 passo - começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems];

      if (
        tempGrid[index].permanentShown === false &&
        tempGrid[index].shown === false
      ) {
        tempGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tempGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.Logo>
          <h1>Jogo da Memória</h1>
        </C.Logo>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTImeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <C.ContainerButtons>
          <Button
            label="Reiniciar"
            icon={RestartIcon}
            onClick={resetAndCreateGrid}
          />
          <Button label={pause ? "Continuar" : "Pausar"} onClick={pausedGame} />
        </C.ContainerButtons>
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
      .
    </C.Container>
  );
};
export default App;
