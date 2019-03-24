module.exports = function solveSudoku(matrix) {

  var newArray = [];
  function copy(arr) {//копирую matrix в новый массив newArray с [1-9] вместо 0;
      newArray = [[],[],[],[],[],[],[],[],[]];
      var i = 0;
      var j = 0;
      while (i < arr.length) {
          while (j < arr[i].length) {
              if (arr[i][j]    > 0) {
                  newArray[i].push(arr[i][j]);
              } else {
                  newArray[i].push([1,2,3,4,5,6,7,8,9])
              }
              
              j++;
          }
          i++;
          j = 0;
      }
  } 
     
  copy(matrix)
  
  function check(arr) {
  
      var i = 0;
      var j = 0;
  
      function row(arr) {// фильтрация по строке
          var k = 0;
          while (k < 9) { 
              if (!isNaN(arr[i][k])) {
                  var index = arr[i][j].indexOf(arr[i][k]);
                  if (index > -1) {arr[i][j].splice(index, 1);
                  }
              }
              k++;
          }
      }
  
      function col (arr) {// фильтрация по столбцу
          var x = 0;
          var y = 0;
          while ( x < 9) {
              if (!isNaN(arr[y][j])) {
                  var index = arr[i][j].indexOf(arr[y][j]);
                  if (index > -1) {arr[i][j].splice(index, 1);
                  }
              }
              y++;
              x++;
          }
      }
  
      function square(arr) {// фильтрация по квадрату
          var x = 0;
          var y = 0;
          var sq = [];
          function definitionXY(arr) {//определяю координаты начального элемента внутреннего квадрата 
              if (i >=6) {
                  x = 6;
              } else if (i >= 3) {
                  x = 3;
              } else {
                  x = 0;
              }
              if (j >=6) {
                  y = 6;
              } else if (j >= 3) {
                  y = 3;
              } else {
                  y = 0;
              }
          }
          definitionXY(arr);
          function createSquare(arr) {//заполняю временный массив данными квадрата
              sq.push(arr[x][y])
              sq.push(arr[x][y+1])
              sq.push(arr[x][y+2])
              sq.push(arr[x+1][y])
              sq.push(arr[x+1][y+1])
              sq.push(arr[x+1][y+2])
              sq.push(arr[x+2][y])
              sq.push(arr[x+2][y+1])
              sq.push(arr[x+2][y+2])
          }
          createSquare(arr);
          function filterSquare(arr) {//фильтр по квадрату
              var k = 0;
              while (k < 9) {
                  if(!isNaN(arr[k])) {
                      var index = newArray[i][j].indexOf(arr[k]);
                      if (index > -1) {newArray[i][j].splice(index, 1);
                      }
                  }
                  k++;
              }
          }
          filterSquare(sq);
      }
      
      function neighbors(arr) {// фильтрация по соседним строкам/столбцам
          var x = 0;
          var y = 0;
          var neighborsNumbers = [];
          function definitionXY(arr) {//определяю координаты начального элемента внутреннего квадрата 
              if (i >=6) {
                  x = 6;
              } else if (i >= 3) {
                  x = 3;
              } else {
                  x = 0;
              }
              if (j >=6) {
                  y = 6;
              } else if (j >= 3) {
                  y = 3;
              } else {
                  y = 0;
              }
          }
          definitionXY(arr);
          function neighborsRow(arr) {//пушу числа из соседних строк в дополнительный массив
              var k = 0;
              var f = x;
              while (k < 3) {
                  if (f != i) {
                      var g = 0;
                      while (g < 9) {
                          if (!isNaN(arr[f][g])&& (g != y) && (g != (y+1)) && (g != (y+2))) {
                              neighborsNumbers.push(arr[f][g]);
                          }  
                          g++;
                      }    
                  }
                  f++;
                  k++;
              }
          }
          neighborsRow(arr);
          function neighborsCol(arr) {//пушу числа из соседних столбцов в дополнительный массив
              var k = 0;
              var f = y;
              while (k < 3) {
                  if (f != j) {
                      var g = 0;
                      while (g < 9) {
                          if (!isNaN(arr[g][f]) && (g != x) && (g != (x+1)) && (g != (x+2))) {
                              neighborsNumbers.push(arr[g][f]);
                          }  
                          g++;
                      }    
                  }
                  f++;
                  k++;
              }
          }
          neighborsCol(arr);
  
          neighborsNumbers.sort();
          function find(arr) {//вычисляю, есть ли в ячейке только одно единственное возможное значение и объявляю его
              var k = 0;
              while (k < arr.length) {
                  if (arr[k] == arr[(k+3)]) {
                      newArray[i][j] = arr[k];
                  }
                  k++;
              }
              
          }
          find(neighborsNumbers);        
      }
  
      function foreverAlone(arr) {//ищу одиночки в квадратах
          var x = 0;
          var y = 0;
          var squareNumbers = [];
          function definitionXY(arr) {//определяю координаты начального элемента внутреннего квадрата 
              if (i >=6) {
                  x = 6;
              } else if (i >= 3) {
                  x = 3;
              } else {
                  x = 0;
              }
              if (j >=6) {
                  y = 6;
              } else if (j >= 3) {
                  y = 3;
              } else {
                  y = 0;
              }
          }
          definitionXY(arr);
          function concat() {//формирую общий массив с всеми допустимыми значениями в квадрате
              if (isNaN(newArray[x][y])) {
                  squareNumbers=squareNumbers.concat(newArray[x][y]);  
                  };
              if (isNaN(newArray[x][y+1])) {
                  squareNumbers=squareNumbers.concat(newArray[x][y+1]); 
                  };
              if (isNaN(newArray[x][y+2])) {
                  squareNumbers=squareNumbers.concat(newArray[x][y+2]); 
                  };
              if (isNaN(newArray[x+1][y])) {
                  squareNumbers=squareNumbers.concat(newArray[x+1][y]);  
                  };
              if (isNaN(newArray[x+1][y+1])) {
                  squareNumbers=squareNumbers.concat(newArray[x+1][y+1]);  
                  };
              if (isNaN(newArray[x+1][y+2])) {
                  squareNumbers=squareNumbers.concat(newArray[x+1][y+2]);  
                  }
              if (isNaN(newArray[x+2][y])) {
                  squareNumbers=squareNumbers.concat(newArray[x+2][y]);  
                  };
              if (isNaN(newArray[x+2][y+1])) {
                  squareNumbers=squareNumbers.concat(newArray[x+2][y+1]);  
                  };
              if (isNaN(newArray[x+2][y+2])) {
                  squareNumbers=squareNumbers.concat(newArray[x+2][y+2]); 
                  };
          }
          concat();
          squareNumbers.sort();
          function aloneValue(arr) {
              var k = 0;
              var alone = -1;
              while (k < arr.length) {
                  if ((k == 0 && arr[k] != arr[k+1]) ||
                  (k == (arr.length - 1)  && arr[k] != arr[k-1]) ||
                  (arr[k] != arr[k-1] && arr[k] != arr[k+1]) ) {
                      alone = arr[k];
                  }
                  k++;
  
              }
              if (isNaN(newArray[x][y])) {
                  if (newArray[x][y].indexOf(alone) != (-1)) {
                      newArray[x][y] = newArray[x][y][newArray[x][y].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x][y+1])) {
                  if (newArray[x][y+1].indexOf(alone) != -1) {
                      newArray[x][y+1] = newArray[x][y+1][newArray[x][y+1].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x][y+2])) {
                  if (newArray[x][y+2].indexOf(alone) != -1) {
                      newArray[x][y+2] = newArray[x][y+2][newArray[x][y+2].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x+1][y])) {
                  if (newArray[x+1][y].indexOf(alone) != -1) {
                      newArray[x+1][y] = newArray[x+1][y][newArray[x+1][y].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x+1][y+1])) {
                  if (newArray[x+1][y+1].indexOf(alone) != -1) {
                      newArray[x+1][y+1] = newArray[x+1][y+1][newArray[x+1][y+1].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x+1][y+2])) {
                  if (newArray[x+1][y+2].indexOf(alone) != -1) {
                      newArray[x+1][y+2] = newArray[x+1][y+2][newArray[x+1][y+2].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x+2][y])) {
                  if (newArray[x+2][y].indexOf(alone) != -1) {
                      newArray[x+2][y] = newArray[x+2][y][newArray[x+2][y].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x+2][y+1])) {
                  if (newArray[x+2][y+1].indexOf(alone) != -1) {
                      newArray[x+2][y+1] = newArray[x+2][y+1][newArray[x+2][y+1].indexOf(alone)];
                  }
              }
              if (isNaN(newArray[x+2][y+2])) {
                  if (newArray[x+2][y+2].indexOf(alone) != -1) {
                      newArray[x+2][y+2] = newArray[x+2][y+2][newArray[x+2][y+2].indexOf(alone)];
                  }
              }   
          }
          aloneValue(squareNumbers);
      }
   
      function foreverAloneRow(arr) {//ищу одиночки в рядах
  
          var rowNumbers = [];
  
          var k = 0;
          while (k < 9) {
              if (isNaN(newArray[i][k])) {
              rowNumbers=rowNumbers.concat(newArray[i][k]);
              }
              k++;
          }
          rowNumbers.sort();
          function aloneValueRow(arr) {
              var k = 0;
              var alone = -1;
              while (k < arr.length) {
                  if ((k == 0 && arr[k] != arr[k+1]) ||
                  (k == (arr.length - 1)  && arr[k] != arr[k-1]) ||
                  (arr[k] != arr[k-1] && arr[k] != arr[k+1]) ) {
                      alone = arr[k];
                      }
                      k++;
                  }
              let f = 0; 
              while (f < 9) {
              if (isNaN(newArray[i][f])) {
                  if (newArray[i][f].indexOf(alone) != (-1)) {
                      newArray[i][f] = newArray[i][f][newArray[i][f].indexOf(alone)];
                  }
              }
              f++; 
  
          }
          }
          aloneValueRow(rowNumbers);
      }
      
      function useAloneRow(arr) {//использовать одиночку по ряду
          while (i < arr.length) {//перебор всех ячеек массивов построчно
              while (j < arr[i].length) {
                  if (isNaN(arr[i][j])) {
                      foreverAloneRow(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  j++
                  }            
              i++;
              j = 0;          
          }
      } 
      function useAlone(arr) {//использовать одиночку по квадрату
          while (i < arr.length) {//перебор всех ячеек массивов построчно
              while (j < arr[i].length) {
                  if (isNaN(arr[i][j])) {
                      foreverAlone(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  j++
                  }            
              i++;
              j = 0;          
          }
      } 
      function useNeighbors(arr) {//использовать поиск по соседям
          while (i < arr.length) {//перебор всех ячеек массивов построчно
              while (j < arr[i].length) {
                  if (isNaN(arr[i][j])) {
                      foreverAlone(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  j++
                  }            
              i++;
              j = 0;
  
          }
      }
      function useRowColSquare(arr) {//использовать фильтры
          while (i < arr.length) {//перебор всех ячеек массивов построчно
              while (j < arr[i].length) {
                  if (isNaN(arr[i][j])) {
                      row(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  if (isNaN(arr[i][j])) {
                      col(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  if (isNaN(arr[i][j])) {
                      square(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  if (isNaN(arr[i][j])) {
                      neighbors(arr);
                      if (arr[i][j].length == 1) {
                          arr[i][j] = arr[i][j][0];
                      }
                  }
                  j++
                  }            
              i++;
              j = 0;
  
          }
          i = 0;
          j = 0;
      }
        
      useRowColSquare(arr);    
      useRowColSquare(arr); 
      useRowColSquare(arr); 
    
     
      useAloneRow(arr);
      i = 0;
      j = 0;
  
      useRowColSquare(arr);    
      useRowColSquare(arr);
      useRowColSquare(arr); 
  
  
      useNeighbors(arr);
      i = 0;
      j = 0;
  
      useRowColSquare(arr);    
      useRowColSquare(arr);   
      useRowColSquare(arr);  
     
  
      useAlone(arr);
      i = 0;
      j = 0;
  
      useRowColSquare(arr);    
      useRowColSquare(arr);
      useRowColSquare(arr); 
    

      useNeighbors(arr);
      i = 0;
      j = 0;

     
  
  
  
  
  }
  check(newArray)//фильтрую значения в неизвестных ячейках
  
  
  
  return newArray;
  }
