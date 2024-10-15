enum Instruction {
    Forward,
    Up,
    Down,
}

fn str_to_instruction(value: &str) -> Result<Instruction, String> {
    return match value {
        "forward" => Ok(Instruction::Forward),
        "up" => Ok(Instruction::Up),
        "down" => Ok(Instruction::Down),
        _ => Err("Invalid instruction".to_string()),   
    };
}

struct Coordinates {
    horizontal: i32,
    depth: i32
}

struct InstructionSet {
    instruction: Instruction,
    value: i32
}

pub fn dive_solve(input: &String) -> Result<i32, String> {
    let mut cords = Coordinates { horizontal: 0, depth: 0 };

    for line in input.lines() {
        let mut raw_instruction: Vec<&str> = line.split(' ').collect();

        if raw_instruction.last().unwrap().is_empty() {
            raw_instruction.pop();
        }

        if raw_instruction.len() != 2 {
            return Err("Invalid instruction".to_string());
        }

        let instruction = match str_to_instruction(raw_instruction.get(0).unwrap()) {
            Ok(instruction) => instruction,
            Err(e) => return Err(e),
        };

        let instruction_set = InstructionSet {
            instruction,
            value: raw_instruction.get(1).unwrap().parse::<i32>().unwrap(),
        };

        match instruction_set.instruction {
            Instruction::Forward => cords.horizontal += instruction_set.value,
            Instruction::Down => cords.depth += instruction_set.value,
            Instruction::Up => cords.depth -= instruction_set.value,
        }
    }

    return Ok(cords.horizontal * cords.depth);
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_sample_input_p1() {
        // arrange
        let input = String::from("forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2\n");

        // act
        let answer = super::dive_solve(&input);

        // assert
        assert_eq!(answer.is_ok(), true);
        assert_eq!(answer.unwrap(), 150);
    }
}
