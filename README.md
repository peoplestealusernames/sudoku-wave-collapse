# Sudoku function collapse in react
[Project/Website link](https://peoplestealusernames.github.io/sudoku-wave-collapse/)

This project is a recreation of Sudoku using wave function collapse ([read below](https://github.com/peoplestealusernames/sudoku-wave-collapse#wave-function-collapse)).

![alt text](https://raw.githubusercontent.com/peoplestealusernames/sudoku-wave-collapse/master/Board.png?raw=true)

## Why sudoku
Sudoku is a great game for testing wave function collapse because it has [simple rules](https://github.com/peoplestealusernames/sudoku-wave-collapse#soduku-rules) with cascading effects.
- Because its a game it was made for human interation which means its a user friendly experience.
- Because of its simple rules its a very good trial run of wave function collapse.

Because of those reasons its also very visually appealing as the tiles collapse near the game end.

## Why [react](https://reactjs.org/)
React is the web-dev framework I'm most familar with, and it's state system works very well for this project.
### Why a website
- Eaiser and faster access to the project than downloading and running an exe or similar.
- Eaiser to share.
- No requirement for hardware access.

## What is wave function collapse
Wave function collapse is a generation algorithm, that follows predefined rules and a input to generate an output.
It does this using entropy. Entropy is a value the amount of options remaining.
Step by step it takes the cell with the least entropy, and collapses it by picking one of the remaining options.
From there it remaps the Entropy of the cells by removing cells that would violate the rules.

For example if you had xyz, but x cannot be next to z.
Then if it places a x or a z its neighbor can no longer be its opposite.
This would decrease the cells entropy and on larger rule sets could lead to a larger collapse.

It repeats this process until the whole set is collapsed.
### Wave function in this project
This project using a simple tiled version of wave function collapse with soduku rules.
Sudoku rules are listed [below](https://github.com/peoplestealusernames/sudoku-wave-collapse#soduku-rules).
Using soduku rules this project has a three wave function collapse rules.
In order of execution:
1. Remove number from columns
2. Remove number from row
3. Remove number from 3x3 grid

While removing numbers a update function is called which:
- If the cell has 1 remaining option
- rerun setter with the last option

This leads to a cascading effect where towards the end where lowering entropy may collapse the whole set.

## Soduku rules
* Each row and or column can only contain a number once.
* Every 3x3 grid (Defined by thicker border) can only contain one number once.
* The game is finish when all squares have a number or no more progress can be made.
[sudoku.com - rules](https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/)