import Markdown from "react-markdown"
const md = `# Eight Queens Problem
## English Version
The goal of the Eight Queens Problem is to place eight queens on an 8x8 chessboard so that no two queens threaten each other. This means no two queens can share the same row, column or diagonal. There are a total of 92 solutions to this problem.
### Algorithm One: Genetic Algorithm
This aproach mimics nature and how organisms inherit their genes to their offspring. This algroithm has more of an educational purpose since it only yields one solution and in the worst case it doesn't find any solution at all. Because genetics involve a lot of randomness the run time for this algorithm fluctuates heavily.
### Algorithm Two: Backtracking Search
A Backtacking Algorithm builds possible solutions using a tree-like system. Once it recognizes that a branch of this tree cannot create any solutions because all of them share the same flaws it dismisses this branch and starts looking into another branch of possible solutions. This algorithm finds all solutions and always takes the same amount of time.
## Deutsche Version
Das Ziel des Eight Queens Problems ist es acht Damen auf einem 8x8 Schachbrett zu platzieren, so dass keine Damen sich gegenseitig angreifen. Das bedeutet, dass keine Damen in der gleichen Reihe, Spalte or Diagonalen sein dürfen. Es gibt ingesamt 92 Lösungen für dieses Problem.
### Algroithmus Eins: Genetischer Algorithmus
Dieses Herangehensweise immitiert die Natur und wie Organismen ihre Gene an ihre Nachkommen vererben. Dieser Algorithmus hat einen akademischen Zweck und eignet sich nicht für das Lösen von Problemen in der Wirtschaft. Er liefert nur eine Lösung und im schlimmsten Fall sogar gar keine. Da in genetischen Prozessen der Zufall eine Rolle spielt, unterscheiden sich die Laufzeiten für den Algorithmus deutlich.
### Algorithmus Zwei: Backtacking Search
Ein Backtracking Algorithmus erstellt potentielle Lösungen in einer Baum ähnlichen Struktur. Sobald der Algorithmus erkennt, dass ein Zweig keine Lösungen liefern kann, da alle potentiellen Lösungen in diesem Zweig das gleiche Problem haben, verwirft es diesen Zweig und sucht in einem anderen Zweig weiter nach Lösungen. Dieser Algorithmus findet alle Lösungen und bracuht immer die selbe Zeit.
`
export default function Test() {
    return(
    <Markdown>{md}</Markdown>
    )
}