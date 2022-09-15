# Lista 01

## Lívia Belizário Rocha - 418304

---

### **Questão 01 - Realize mudanças de base para os seguintes decimais**

#### **a) 213 para a base 2**

213 / 2 -> 106 resto 1 <br/>
106 / 2 -> 53 resto 0 <br/>
53 / 2 -> 26 resto 1 <br/>
26 / 2 -> 13 resto 0 <br/>
13 / 2 -> 6 resto 1 <br/>
6 / 2 -> 3 resto 0 <br/>
3 / 2 -> 1 resto 1 <br/>

_11010101_

#### **b) 213 para a base 3**

213 / 3 -> 71 resto 0 <br/>
71 / 3 -> 23 resto 2 <br/>
23 / 3 -> 7 resto 2 <br/>
7 / 3 -> 2 resto 1 <br/>

_21220_

#### **c) 197 para a base 2**

197 / 2 -> 98 resto 1 <br/>
98 / 2 -> 49 resto 0 <br/>
49 / 2 -> 24 resto 1 <br/>
24 / 2 -> 12 resto 0 <br/>
12 / 2 -> 6 resto 0 <br/>
6 / 2 -> 3 resto 0 <br/>
3 / 2 -> 1 resto 1 <br/>

_11000101_

#### **d) 197 para a base 4**

197 / 4 -> 49 resto 1 <br/>
49 / 2 -> 12 resto 1 <br/>
12 / 2 -> 3 resto 0 <br/>

_3011_

#### **e) 197 para a base 16**

197 / 16 -> 12 resto 5 <br/>

_C5_

---

### **Questão 02 - Resolva as seguintes questões:**

#### **a) Calcule o resultado de 010101(2) + 001101(2) e confira o resultado na base decimal**

```
  010101
+ 001101
  ------
  100010

010101 -> 21
001101 -> 13
100010 -> 34 ✅
```

#### **b) Tome o resultado dos itens (a) e (c) da questão anterior. Subtraia o primeiro do segundo**

```
  11010101
- 11000101
  --------
  00010000
```

#### **c) Quanto é 1102(3) + 0121(3)?**

```
  1102
+ 0121
  ----
  2000
```

### **d) Qual é o resultado do item anterior na base decimal?**

```
(2000)3 = (2 × 3^3) + (0 × 3^2) + (0 × 3^1) + (0 × 3^0) = 54
```

### **Questão 03**

#### **a) O que é a representação binária por complemento de 2? Para que serve?**
É a representação binária que abrange números negativos. Serve para representar números negativos.

#### **b) O que é overflow? O que é underflow? Como esses fenômenos podem interferir na vida de um programador de jogos?**
1. Overflow: Quando o número é maior que o maior número que pode ser representado naquela base numérica.
2. Underflow: Quando o número é menor que o menor número que pode ser representado naquela base numérica.
3. Quando ocorre um overflow, pode acontecer de o número virar o menor possível, por exemplo, uma base é composta de [1, 2, 3], caso o número seja 3 e ele acabe aumentando, ocorre um overflow e ele vira 1, isso pode dar problema em jogos que dependem de um número parar funcionar. Um sistema de vidas por exemplo, um inteiro de 1 byte pode armazenar 0 - 255, caso ele chegue a 256, ocorre overflow e ele irá virar um 0, fazendo com que ocorra game over.