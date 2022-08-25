/* 
Структура БЭМа:

block[_modifier]
  block__element1
  block__element2
  block__element3
    block__element4
    block__element5
    ...

    block__element6[_modifier1_modifier-value]

    block__element6[_modifier-boolean]

Пояснения:
1)  У modifier-boolean нету значения, т.к. у булеановских модификаторов их может быть
    всего 2 (true и false), поэтому значение следует из названия модификатора
    Например - модификатор active означает true если элемент активен и false если неактивен 
2)  У блока также может быть модификатор
    */
