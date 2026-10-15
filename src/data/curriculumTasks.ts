import { MathTask } from '../types/math';

export const CURRICULUM_TASKS: MathTask[] = [
  // ================== BASIC LEVEL ==================
  {
    id: 'basic-1',
    difficulty: 'basic',
    title: 'Linear Balance with Positive Integers',
    equation: '2x + 4 = 12',
    variable: 'x',
    correctAnswer: 4,
    correctAnswerDisplay: '4',
    question: 'Solve for x: 2x + 4 = 12',
    context: 'Two identical boxes plus 4 loose marbles weigh 12 ounces in total. How much does one box weigh?',
    equationType: 'standard_linear',
    hints: [
      'Step 1: Undo the addition by subtracting 4 from both sides.',
      'After subtracting 4: 2x = 8. Now look at the number multiplying x.',
      'Step 2: Undo the multiplication by dividing both sides by 2.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 4 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '2x = 8',
        explanation: 'To isolate the variable term 2x, subtract 4 from both sides: 2x + 4 - 4 = 12 - 4, giving 2x = 8.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 2',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = 4',
        explanation: 'Divide both sides by the coefficient 2: 2x / 2 = 8 / 2, resulting in x = 4.'
      }
    ],
    verification: {
      substitutedEquation: '2(4) + 4 = 12',
      lhsEvaluation: '8 + 4 = 12',
      rhsValue: '12',
      conclusion: 'Since 12 = 12, x = 4 is correct!'
    },
    scaffoldingTips: 'Focus on inverse operations: first eliminate the constant, then divide by the coefficient.',
    source: 'curriculum-bank'
  },
  {
    id: 'basic-2',
    difficulty: 'basic',
    title: 'Solving for Unknown Count',
    equation: '3x + 9 = 24',
    variable: 'x',
    correctAnswer: 5,
    correctAnswerDisplay: '5',
    question: 'Solve for x: 3x + 9 = 24',
    context: 'Three identical notebooks plus a $9 binder cost $24. How much does each notebook cost?',
    equationType: 'standard_linear',
    hints: [
      'First isolate 3x: subtract 9 from both sides of the equation.',
      '24 - 9 = 15, so 3x = 15.',
      'Now divide 15 by 3 to find x.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 9 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '3x = 15',
        explanation: 'Subtract 9 from both sides: 3x + 9 - 9 = 24 - 9, which simplifies to 3x = 15.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 3',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = 5',
        explanation: 'Divide both sides by 3: 3x / 3 = 15 / 3, yielding x = 5.'
      }
    ],
    verification: {
      substitutedEquation: '3(5) + 9 = 24',
      lhsEvaluation: '15 + 9 = 24',
      rhsValue: '24',
      conclusion: 'Both sides evaluate to 24. Perfect match!'
    },
    scaffoldingTips: 'Remember: whatever you do to one side of the equal sign, you must do to the other.',
    source: 'curriculum-bank'
  },
  {
    id: 'basic-3',
    difficulty: 'basic',
    title: 'Undoing Subtraction First',
    equation: '5x - 7 = 18',
    variable: 'x',
    correctAnswer: 5,
    correctAnswerDisplay: '5',
    question: 'Solve for x: 5x - 7 = 18',
    context: 'Five packs of trading cards minus 7 bonus points equals 18 total points. How many points are in each pack?',
    equationType: 'standard_linear',
    hints: [
      'The constant is -7. Use the opposite operation: add 7 to both sides.',
      'Adding 7 gives: 5x = 18 + 7 = 25.',
      'Divide both sides by 5 to find x.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Add 7 to both sides',
        propertyApplied: 'Addition Property of Equality',
        intermediateEquation: '5x = 25',
        explanation: 'Add 7 to both sides: 5x - 7 + 7 = 18 + 7, which gives 5x = 25.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 5',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = 5',
        explanation: 'Divide both sides by 5: 5x / 5 = 25 / 5, so x = 5.'
      }
    ],
    verification: {
      substitutedEquation: '5(5) - 7 = 18',
      lhsEvaluation: '25 - 7 = 18',
      rhsValue: '18',
      conclusion: '18 = 18 confirms x = 5.'
    },
    scaffoldingTips: 'Notice how the minus sign before 7 is cancelled by adding 7.',
    source: 'curriculum-bank'
  },
  {
    id: 'basic-4',
    difficulty: 'basic',
    title: 'Even Multipliers',
    equation: '4x + 6 = 30',
    variable: 'x',
    correctAnswer: 6,
    correctAnswerDisplay: '6',
    question: 'Solve for x: 4x + 6 = 30',
    context: 'Four friends bought identical movie tickets and spent $6 on popcorn, spending $30 total.',
    equationType: 'standard_linear',
    hints: [
      'Start by eliminating the constant: subtract 6 from both sides.',
      '30 - 6 = 24, leaving 4x = 24.',
      'Divide both sides by 4 to get x.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 6 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '4x = 24',
        explanation: 'Subtract 6: 4x + 6 - 6 = 30 - 6, so 4x = 24.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 4',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = 6',
        explanation: 'Divide by 4: 4x / 4 = 24 / 4, yielding x = 6.'
      }
    ],
    verification: {
      substitutedEquation: '4(6) + 6 = 30',
      lhsEvaluation: '24 + 6 = 30',
      rhsValue: '30',
      conclusion: 'Verified: 30 = 30.'
    },
    scaffoldingTips: 'Always double-check your arithmetic when subtracting constants.',
    source: 'curriculum-bank'
  },

  // ================== STANDARD LEVEL ==================
  {
    id: 'std-1',
    difficulty: 'standard',
    title: 'Negative Coefficient and Integer Rules',
    equation: '-3x + 8 = 26',
    variable: 'x',
    correctAnswer: -6,
    correctAnswerDisplay: '-6',
    question: 'Solve for x: -3x + 8 = 26',
    context: 'A submarine starts at +8 feet and drops at 3 feet per minute (-3x) until reaching a depth reading differential of 26.',
    equationType: 'standard_linear',
    hints: [
      'First isolate -3x: subtract 8 from both sides (26 - 8 = 18).',
      'You will have -3x = 18. Be careful when dividing by a negative number!',
      'Divide both sides by -3. Remember: a positive divided by a negative is negative.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 8 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '-3x = 18',
        explanation: 'Subtract 8 from both sides: -3x + 8 - 8 = 26 - 8, which results in -3x = 18.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by -3',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = -6',
        explanation: 'Divide both sides by -3: -3x / (-3) = 18 / (-3). 18 / (-3) = -6.'
      }
    ],
    verification: {
      substitutedEquation: '-3(-6) + 8 = 26',
      lhsEvaluation: '18 + 8 = 26',
      rhsValue: '26',
      conclusion: 'Since (-3)(-6) = +18, 18 + 8 = 26. Verified!'
    },
    scaffoldingTips: 'Watch your negative signs carefully: dividing a positive by a negative gives a negative result.',
    source: 'curriculum-bank'
  },
  {
    id: 'std-2',
    difficulty: 'standard',
    title: 'Negative Constant on Both Sides',
    equation: '4x - 15 = -3',
    variable: 'x',
    correctAnswer: 3,
    correctAnswerDisplay: '3',
    question: 'Solve for x: 4x - 15 = -3',
    context: 'The temperature increased by 4 degrees each hour (4x) from an initial reading offset of -15 to reach -3 degrees.',
    equationType: 'standard_linear',
    hints: [
      'Add 15 to both sides to cancel out -15.',
      'Remember integer addition: -3 + 15 = +12.',
      'Now divide both sides by 4.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Add 15 to both sides',
        propertyApplied: 'Addition Property of Equality',
        intermediateEquation: '4x = 12',
        explanation: 'Add 15 to both sides: 4x - 15 + 15 = -3 + 15. On the right side, -3 + 15 = 12, leaving 4x = 12.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 4',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = 3',
        explanation: 'Divide both sides by 4: 4x / 4 = 12 / 4, so x = 3.'
      }
    ],
    verification: {
      substitutedEquation: '4(3) - 15 = -3',
      lhsEvaluation: '12 - 15 = -3',
      rhsValue: '-3',
      conclusion: '12 - 15 = -3. Verified.'
    },
    scaffoldingTips: 'Think of -3 + 15 on a number line: start at -3 and move right 15 units to 12.',
    source: 'curriculum-bank'
  },
  {
    id: 'std-3',
    difficulty: 'standard',
    title: 'Equation with Distributive Property',
    equation: '2(x + 5) = 24',
    variable: 'x',
    correctAnswer: 7,
    correctAnswerDisplay: '7',
    question: 'Solve for x: 2(x + 5) = 24',
    context: 'Two gift baskets each contain a toy priced at $x and a $5 chocolate bar. The total order is $24.',
    equationType: 'distributive',
    hints: [
      'You can either distribute 2 to get 2x + 10 = 24, OR divide both sides by 2 first.',
      'Distributing: 2 * x + 2 * 5 = 2x + 10. Now solve 2x + 10 = 24.',
      'Subtract 10 from both sides (2x = 14), then divide by 2.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Apply Distributive Property (or Divide by 2)',
        propertyApplied: 'Distributive Property of Multiplication over Addition',
        intermediateEquation: '2x + 10 = 24',
        explanation: 'Distribute 2 into the parentheses: 2(x) + 2(5) = 2x + 10 = 24.'
      },
      {
        stepNumber: 2,
        operationName: 'Subtract 10 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '2x = 14',
        explanation: 'Subtract 10 from both sides: 2x = 24 - 10 = 14.'
      },
      {
        stepNumber: 3,
        operationName: 'Divide both sides by 2',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = 7',
        explanation: 'Divide both sides by 2: x = 14 / 2 = 7.'
      }
    ],
    verification: {
      substitutedEquation: '2(7 + 5) = 24',
      lhsEvaluation: '2(12) = 24',
      rhsValue: '24',
      conclusion: '2(12) = 24. Both sides are equal!'
    },
    scaffoldingTips: 'Notice: dividing by 2 first would give (x + 5) = 12, then x = 7. Both paths are algebraically valid!',
    source: 'curriculum-bank'
  },
  {
    id: 'std-4',
    difficulty: 'standard',
    title: 'Double Negative Constants',
    equation: '-5x - 4 = 21',
    variable: 'x',
    correctAnswer: -5,
    correctAnswerDisplay: '-5',
    question: 'Solve for x: -5x - 4 = 21',
    context: 'An investor evaluates an automated strategy where loss factor -5x offset by fixed overhead fee -4 yielded 21 relative points.',
    equationType: 'standard_linear',
    hints: [
      'First add 4 to both sides: 21 + 4 = 25.',
      'Now you have -5x = 25.',
      'Divide both sides by -5: 25 / (-5) = ?'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Add 4 to both sides',
        propertyApplied: 'Addition Property of Equality',
        intermediateEquation: '-5x = 25',
        explanation: 'Add 4 to both sides: -5x - 4 + 4 = 21 + 4, which gives -5x = 25.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by -5',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = -5',
        explanation: 'Divide both sides by -5: x = 25 / (-5) = -5.'
      }
    ],
    verification: {
      substitutedEquation: '-5(-5) - 4 = 21',
      lhsEvaluation: '25 - 4 = 21',
      rhsValue: '21',
      conclusion: '(-5)(-5) = +25, and 25 - 4 = 21. Confirmed!'
    },
    scaffoldingTips: 'Negative times negative is positive. That is why -5 * (-5) = 25.',
    source: 'curriculum-bank'
  },

  // ================== ADVANCED LEVEL ==================
  {
    id: 'adv-1',
    difficulty: 'advanced',
    title: 'Real-World Cell Plan Subscription Model',
    equation: '0.15m + 35 = 56',
    variable: 'm',
    correctAnswer: 140,
    correctAnswerDisplay: '140',
    question: 'A mobile phone plan costs a flat base fee of $35 per month plus $0.15 per additional data megabyte (m). If Maya’s total monthly bill was $56, how many extra megabytes did she use?',
    context: 'Real-world utility billing: Total Cost = Variable Usage Cost + Fixed Base Fee. Setting up: 0.15m + 35 = 56.',
    equationType: 'word_problem',
    hints: [
      'Identify the components: $35 is the fixed fee, $0.15 is the rate per megabyte m, and $56 is the total.',
      'Set up 0.15m + 35 = 56. First, isolate the data charge by subtracting $35 from $56.',
      '56 - 35 = 21. Now divide 21 by 0.15. (Tip: 21 / 0.15 = 2100 / 15).'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 35 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '0.15m = 21',
        explanation: 'Subtract the fixed $35 monthly charge from both sides: 0.15m = 56 - 35 = 21.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 0.15',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'm = 140',
        explanation: 'Divide 21 by 0.15: 21 / 0.15 = 2100 / 15 = 140. Maya used 140 extra megabytes.'
      }
    ],
    verification: {
      substitutedEquation: '0.15(140) + 35 = 56',
      lhsEvaluation: '21 + 35 = 56',
      rhsValue: '56',
      conclusion: '21 dollars for data + 35 dollars base = $56. Exactly matches the bill.'
    },
    scaffoldingTips: 'In word problems, translate "flat fee" to the constant term and "rate per unit" to the variable coefficient.',
    source: 'curriculum-bank'
  },
  {
    id: 'adv-2',
    difficulty: 'advanced',
    title: 'Distributive Property with Negative Factor',
    equation: '-3(2x - 5) = 27',
    variable: 'x',
    correctAnswer: -2,
    correctAnswerDisplay: '-2',
    question: 'Solve for x: -3(2x - 5) = 27',
    context: 'Engineering tolerance adjustment where negative feedback factor -3 scales an internal deviation formula.',
    equationType: 'distributive',
    hints: [
      'Option A: Distribute -3 across both terms inside. Remember: -3 * (-5) = +15! So -6x + 15 = 27.',
      'Option B: Divide both sides by -3 first: 2x - 5 = 27 / (-3) = -9.',
      'If using Option B: 2x - 5 = -9 => 2x = -4 => x = -2.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Distribute -3 into parentheses',
        propertyApplied: 'Distributive Property',
        intermediateEquation: '-6x + 15 = 27',
        explanation: 'Distribute -3: (-3)(2x) + (-3)(-5) = -6x + 15 = 27.'
      },
      {
        stepNumber: 2,
        operationName: 'Subtract 15 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '-6x = 12',
        explanation: 'Subtract 15: -6x = 27 - 15 = 12.'
      },
      {
        stepNumber: 3,
        operationName: 'Divide both sides by -6',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = -2',
        explanation: 'Divide both sides by -6: x = 12 / (-6) = -2.'
      }
    ],
    verification: {
      substitutedEquation: '-3(2(-2) - 5) = 27',
      lhsEvaluation: '-3(-4 - 5) = -3(-9) = 27',
      rhsValue: '27',
      conclusion: '-3 * (-9) = 27. Correct!'
    },
    scaffoldingTips: 'Be especially cautious of the double negative: -3 times -5 becomes positive 15.',
    source: 'curriculum-bank'
  },
  {
    id: 'adv-3',
    difficulty: 'advanced',
    title: 'Fractional Coefficient Multi-step',
    equation: '(2/3)x - 4 = 8',
    variable: 'x',
    correctAnswer: 18,
    correctAnswerDisplay: '18',
    question: 'Solve for x: (2/3)x - 4 = 8',
    context: 'Two-thirds of a theater’s total capacity x, minus 4 reserved staff seats, equals 8 occupied seats in a preview showing.',
    equationType: 'fractional',
    hints: [
      'First add 4 to both sides: (2/3)x = 12.',
      'To eliminate the fraction 2/3, multiply both sides by its reciprocal: 3/2.',
      '12 * (3/2) = (12 * 3) / 2 = 36 / 2 = 18.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Add 4 to both sides',
        propertyApplied: 'Addition Property of Equality',
        intermediateEquation: '(2/3)x = 12',
        explanation: 'Add 4 to both sides: (2/3)x = 8 + 4 = 12.'
      },
      {
        stepNumber: 2,
        operationName: 'Multiply by reciprocal (3/2)',
        propertyApplied: 'Multiplication Property of Equality',
        intermediateEquation: 'x = 18',
        explanation: 'Multiply both sides by reciprocal 3/2: x = 12 * (3/2) = 36 / 2 = 18.'
      }
    ],
    verification: {
      substitutedEquation: '(2/3)(18) - 4 = 8',
      lhsEvaluation: '12 - 4 = 8',
      rhsValue: '8',
      conclusion: 'Two-thirds of 18 is 12, and 12 - 4 = 8. Solved!'
    },
    scaffoldingTips: 'Multiplying by the reciprocal (flip the fraction) clears fractional coefficients in one clean step.',
    source: 'curriculum-bank'
  },
  {
    id: 'adv-4',
    difficulty: 'advanced',
    title: 'School Fundraiser Budget Planning',
    equation: '4.50t + 85 = 310',
    variable: 't',
    correctAnswer: 50,
    correctAnswerDisplay: '50',
    question: 'A student council spent $85 on decorations and sells event tickets for $4.50 each. If their total net revenue after all ticket sales was $310, how many tickets (t) were sold?',
    context: 'Total Revenue Model: Ticket Revenue ($4.50 * t) + Prior Seed Money ($85) = Total Treasury ($310).',
    equationType: 'word_problem',
    hints: [
      'Equation setup: 4.50t + 85 = 310.',
      'Isolate the ticket revenue: subtract 85 from 310 (310 - 85 = 225).',
      'Now divide 225 by 4.50: 225 / 4.50 = 50.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 85 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '4.50t = 225',
        explanation: 'Subtract the fixed initial seed funds ($85): 4.50t = 310 - 85 = 225.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by 4.50',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 't = 50',
        explanation: 'Divide by the ticket price 4.50: t = 225 / 4.50 = 50 tickets.'
      }
    ],
    verification: {
      substitutedEquation: '4.50(50) + 85 = 310',
      lhsEvaluation: '225 + 85 = 310',
      rhsValue: '310',
      conclusion: '50 tickets at $4.50 = $225. $225 + $85 = $310. Exact match!'
    },
    scaffoldingTips: 'Check that your final answer makes sense in the real-world context (ticket count must be positive).',
    source: 'curriculum-bank'
  }
];
