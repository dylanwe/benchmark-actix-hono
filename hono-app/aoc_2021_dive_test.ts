import { diveSolve } from "./aoc_2021_dive.ts";
import { assertEquals } from "@std/assert";

Deno.test("diveSolve example test", () => {
  // arrange
  const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2
  `;

  // act
  const result = diveSolve(input);

  // assert
  assertEquals(result, 150);
});
