/**
 * --- Day 2: Dive! ---
 * This is the solution to the first puzzle of the Advent of Code 2021.
 * It's used to make an endpoint with a bit of logic.
 *
 * @link https://adventofcode.com/2021/day/2
 */

enum Instruction {
  Up = "Up",
  Down = "Down",
  Forward = "Forward",
}

function strToInstruction(value: string): Instruction {
  switch (value) {
    case "forward":
      return Instruction.Forward;
    case "up":
      return Instruction.Up;
    case "down":
      return Instruction.Down;
    default:
      throw new Error("Could not parse instruction");
  }
}

interface Coordinates {
  horizontal: number;
  depth: number;
}

interface InstructionSet {
  instruction: Instruction;
  value: number;
}

export function diveSolve(input: string): number {
  const cords: Coordinates = { horizontal: 0, depth: 0 };
  const lines = input.split("\n");
  lines.pop(); // remove last empty line

  lines
    .map((line: string) => {
      const rawInstruction: string[] = line.trim().split(" ");
      const instructionSet: InstructionSet = {
        instruction: strToInstruction(rawInstruction[0]),
        value: parseInt(rawInstruction[1]),
      };
      return instructionSet;
    })
    .forEach((instructionSet: InstructionSet) => {
      switch (instructionSet.instruction) {
        case Instruction.Forward:
          cords.horizontal += instructionSet.value;
          break;
        case Instruction.Down:
          cords.depth += instructionSet.value;
          break;
        case Instruction.Up:
          cords.depth -= instructionSet.value;
          break;
        default:
          throw new Error("Could not parse instruction");
      }
    });

  return cords.horizontal * cords.depth;
}
