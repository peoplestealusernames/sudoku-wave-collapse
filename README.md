# Sudoku function collapse in react
[Website link](https://peoplestealusernames.github.io/sudoku-wave-collapse/)
This project is a recreation of Sudoku using wave function collapse ([read below](https://github.com/peoplestealusernames/sudoku-wave-collapse#wave-function-collapse)).

## Wave function collapse
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
Each row and or column can only contain a number once.
Every 3x3 grid (Defined by thicker border) can only contain one number once.
The game is finish when all squares have a number or no more progress can be made.