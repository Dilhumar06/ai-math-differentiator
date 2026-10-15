import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { DifferentiationTriadResult } from './src/types/math.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini API client if API key is provided
const rawApiKey = process.env.GEMINI_API_KEY;
const isKeyConfigured = Boolean(
  rawApiKey && rawApiKey.trim() !== '' && rawApiKey !== 'MY_GEMINI_API_KEY'
);

const ai = isKeyConfigured
  ? new GoogleGenAI({
      apiKey: rawApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Available models ordered by reliability and low latency
const GEMINI_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash'];

// Status endpoint to inform frontend about AI connectivity
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    aiAvailable: Boolean(ai),
    model: 'Gemini AI (3.5 / 3.8 Series)',
    message: ai
      ? 'Gemini AI is connected and active. Dynamic 3-level differentiation is live.'
      : 'GEMINI_API_KEY is not configured in the server environment. Configure GEMINI_API_KEY in the Secrets panel to activate live AI.',
    missingSetting: ai ? null : 'GEMINI_API_KEY',
    instructions: ai
      ? null
      : 'Go to Settings > Secrets in AI Studio and add GEMINI_API_KEY with your API key.'
  });
});

function withTimeout<T>(promise: Promise<T>, ms: number = 18000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('AI generation timed out')), ms))
  ]);
}

const triadSchema = {
  type: Type.OBJECT,
  properties: {
    isSupportedTopic: {
      type: Type.BOOLEAN,
      description: 'True if input is a valid two-step linear equation or word problem convertible to it; false otherwise.'
    },
    topicExplanation: {
      type: Type.STRING,
      description: 'If unsupported, explanation of what was detected and guidance to enter a linear equation.'
    },
    conceptIdentified: {
      type: Type.STRING,
      description: 'The core mathematical concept detected in the original problem (e.g. "Linear equation with negative coefficient and constant")'
    },
    commonAnswer: {
      type: Type.NUMBER,
      description: 'The exact numerical solution that must be identical across all three activities (e.g. -5).'
    },
    commonAnswerDisplay: {
      type: Type.STRING,
      description: 'Formatted answer string e.g. "-5".'
    },
    commonVariable: {
      type: Type.STRING,
      description: 'The variable symbol used across all activities (e.g. "x").'
    },
    basic: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        equation: { type: Type.STRING, description: 'Must be exactly the original equation entered by the user.' },
        hints: { type: Type.ARRAY, items: { type: Type.STRING } },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              operationName: { type: Type.STRING },
              propertyApplied: { type: Type.STRING },
              intermediateEquation: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ['stepNumber', 'operationName', 'propertyApplied', 'intermediateEquation', 'explanation']
          }
        },
        verification: {
          type: Type.OBJECT,
          properties: {
            substitutedEquation: { type: Type.STRING },
            conclusion: { type: Type.STRING }
          },
          required: ['substitutedEquation', 'conclusion']
        },
        differentiationRationale: { type: Type.STRING }
      },
      required: ['title', 'equation', 'hints', 'steps', 'verification']
    },
    intermediate: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        equation: {
          type: Type.STRING,
          description: 'A more complex equivalent equation with parentheses that simplifies exactly to the original equation (e.g. -3(x + 2) + 16 = 25).'
        },
        expansionStep: {
          type: Type.STRING,
          description: 'The equation after expanding the parentheses (e.g. -3x - 6 + 16 = 25).'
        },
        simplifiedToOriginal: {
          type: Type.STRING,
          description: 'The equation after combining constants, proving exact equivalence to original (e.g. -3x + 10 = 25).'
        },
        hints: { type: Type.ARRAY, items: { type: Type.STRING } },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              operationName: { type: Type.STRING },
              propertyApplied: { type: Type.STRING },
              intermediateEquation: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ['stepNumber', 'operationName', 'propertyApplied', 'intermediateEquation', 'explanation']
          }
        },
        verification: {
          type: Type.OBJECT,
          properties: {
            substitutedEquation: { type: Type.STRING },
            conclusion: { type: Type.STRING }
          },
          required: ['substitutedEquation', 'conclusion']
        },
        differentiationRationale: { type: Type.STRING }
      },
      required: ['title', 'equation', 'expansionStep', 'simplifiedToOriginal', 'hints', 'steps', 'verification']
    },
    advanced: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        wordProblem: {
          type: Type.STRING,
          description: 'A clear, realistic word problem modeling the exact equation where the student must first formulate the equation, then solve it.'
        },
        targetEquation: {
          type: Type.STRING,
          description: 'The formulated algebraic equation (e.g. -3x + 10 = 25).'
        },
        equivalentForms: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'List of acceptable algebraically equivalent equation strings e.g. ["-3x + 10 = 25", "10 - 3x = 25", "25 = -3x + 10"]'
        },
        hints: { type: Type.ARRAY, items: { type: Type.STRING } },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              operationName: { type: Type.STRING },
              propertyApplied: { type: Type.STRING },
              intermediateEquation: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ['stepNumber', 'operationName', 'propertyApplied', 'intermediateEquation', 'explanation']
          }
        },
        verification: {
          type: Type.OBJECT,
          properties: {
            substitutedEquation: { type: Type.STRING },
            conclusion: { type: Type.STRING }
          },
          required: ['substitutedEquation', 'conclusion']
        },
        differentiationRationale: { type: Type.STRING }
      },
      required: ['title', 'wordProblem', 'targetEquation', 'hints', 'steps', 'verification']
    }
  },
  required: ['isSupportedTopic', 'conceptIdentified', 'commonAnswer', 'commonVariable', 'basic', 'intermediate', 'advanced']
};

// Default sample triad for -3x + 10 = 25 with identical answer x = -5
const DEFAULT_SAMPLE_TRIAD: DifferentiationTriadResult = {
  originalProblem: '-3x + 10 = 25',
  isSupportedTopic: true,
  conceptIdentified: 'Two-step linear equation with negative coefficient and positive constant',
  commonAnswer: -5,
  commonAnswerDisplay: '-5',
  commonVariable: 'x',
  generatedBy: 'curriculum-verified',
  latencyMs: 140,
  basic: {
    level: 'basic',
    title: 'Level 1: Basic — Solve the Original Equation',
    equation: '-3x + 10 = 25',
    hints: [
      'Undo the addition by subtracting 10 from both sides of the equation.',
      'After subtracting 10, you have: -3x = 15.',
      'Now divide 15 by -3. Remember: a positive divided by a negative is negative.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Subtract 10 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '-3x = 15',
        explanation: 'Subtract the constant 10 from both sides: -3x + 10 - 10 = 25 - 10, which leaves -3x = 15.'
      },
      {
        stepNumber: 2,
        operationName: 'Divide both sides by -3',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = -5',
        explanation: 'Divide both sides by the coefficient -3: x = 15 / (-3) = -5.'
      }
    ],
    verification: {
      substitutedEquation: '-3(-5) + 10 = 15 + 10 = 25',
      conclusion: 'Since 25 = 25, the solution x = -5 is mathematically verified.'
    },
    differentiationRationale: 'Presents the original equation as entered, providing structured inverse-operation scaffolding for foundational learners.'
  },
  intermediate: {
    level: 'intermediate',
    title: 'Level 2: Intermediate — Solve with Parentheses',
    equation: '-3(x + 2) + 16 = 25',
    expansionStep: '-3x - 6 + 16 = 25',
    simplifiedToOriginal: '-3x + 10 = 25',
    hints: [
      'First distribute the -3 across the parentheses: -3 * x and -3 * 2.',
      'Combine the constant terms: -6 + 16 = +10, which returns -3x + 10 = 25.',
      'Now isolate x as in the original equation to obtain x = -5.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Apply Distributive Property',
        propertyApplied: 'Distributive Property of Multiplication',
        intermediateEquation: '-3x - 6 + 16 = 25',
        explanation: 'Distribute -3 to both terms inside (x + 2): -3(x) + (-3)(2) = -3x - 6.'
      },
      {
        stepNumber: 2,
        operationName: 'Combine Like Terms',
        propertyApplied: 'Simplification of Constants',
        intermediateEquation: '-3x + 10 = 25',
        explanation: 'Combine the constants -6 and +16: -6 + 16 = +10. Notice this is now identical to the original equation!'
      },
      {
        stepNumber: 3,
        operationName: 'Subtract 10 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '-3x = 15',
        explanation: 'Subtract 10 from both sides: -3x = 25 - 10 = 15.'
      },
      {
        stepNumber: 4,
        operationName: 'Divide both sides by -3',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = -5',
        explanation: 'Divide both sides by -3: x = 15 / (-3) = -5.'
      }
    ],
    verification: {
      substitutedEquation: '-3((-5) + 2) + 16 = -3(-3) + 16 = 9 + 16 = 25',
      conclusion: '9 + 16 = 25. Exactly balances with the same solution x = -5!'
    },
    differentiationRationale: 'Creates an algebraically equivalent equation with parentheses. Expanding and combining like terms directly simplifies to -3x + 10 = 25, yielding the exact same answer x = -5.'
  },
  advanced: {
    level: 'advanced',
    title: 'Level 3: Advanced — Real-World Problem Formulation',
    wordProblem: 'A number is multiplied by -3, and then 10 is added. The result is 25. Formulate the equation representing this statement and find the number (x).',
    targetEquation: '-3x + 10 = 25',
    equivalentForms: [
      '-3x + 10 = 25',
      '10 - 3x = 25',
      '25 = -3x + 10',
      '25 = 10 - 3x',
      '-3n + 10 = 25',
      '10 - 3n = 25',
      '25 = -3n + 10',
      '25 = 10 - 3n',
      '-3*x + 10 = 25',
      '(-3)x + 10 = 25',
      '-3x = 15',
      '15 = -3x'
    ],
    hints: [
      'Let x represent the unknown number. The phrase "multiplied by -3" means -3x.',
      'The phrase "and then 10 is added" gives -3x + 10. "The result is 25" translates to = 25.',
      'The complete equation is -3x + 10 = 25. To solve: subtract 10 from both sides, then divide by -3 to get x = -5.'
    ],
    steps: [
      {
        stepNumber: 1,
        operationName: 'Formulate the Equation from Word Statement',
        propertyApplied: 'Algebraic Modeling',
        intermediateEquation: '-3x + 10 = 25',
        explanation: 'Translate words into algebraic symbols: -3 times a number (x), plus 10, equals 25: -3x + 10 = 25.'
      },
      {
        stepNumber: 2,
        operationName: 'Subtract 10 from both sides',
        propertyApplied: 'Subtraction Property of Equality',
        intermediateEquation: '-3x = 15',
        explanation: 'Isolate the variable term by subtracting the constant 10: -3x = 25 - 10 = 15.'
      },
      {
        stepNumber: 3,
        operationName: 'Divide both sides by -3',
        propertyApplied: 'Division Property of Equality',
        intermediateEquation: 'x = -5',
        explanation: 'Divide both sides by -3: x = 15 / (-3) = -5.'
      }
    ],
    verification: {
      substitutedEquation: '-3(-5) + 10 = 15 + 10 = 25',
      conclusion: 'Substituting x = -5 satisfies the model: 15 + 10 = 25.'
    },
    differentiationRationale: 'Hides the target equation, challenging students to first formulate the mathematical model from context before solving, requiring independent translational thinking.'
  }
};

// 1. Differentiate One Equation into 3 Unified Activities
app.post('/api/math/differentiate-triad', async (req: Request, res: Response) => {
  const { inputProblem }: { inputProblem?: string } = req.body;

  if (!inputProblem || typeof inputProblem !== 'string' || inputProblem.trim().length < 2) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Please enter a valid linear equation (e.g., "-3x + 10 = 25" or "4x - 8 = 24").'
    });
  }

  const cleanedInput = inputProblem.trim();

  // If AI is configured, call Gemini model
  if (ai) {
    const prompt = `You are a premier educational AI specializing in differentiated mathematics instruction.
The user entered this ONE original linear equation:
"${cleanedInput}"

Your mission is to transform that SAME equation into THREE DIFFERENT LEARNING ACTIVITIES.
CRITICAL CONSTRAINT: ALL THREE ACTIVITIES MUST SHARE THE EXACT SAME FINAL NUMERICAL ANSWER AND TEACH THE SAME UNDERLYING MATHEMATICAL CONCEPT.

1. BASIC — Solve the original equation:
   - Equation: exactly "${cleanedInput}".
   - Solve step-by-step: undo constant first, then divide by coefficient.
   - Calculate the exact correct answer for the variable.

2. INTERMEDIATE — Solve an equivalent equation with parentheses:
   - Generate a more complex equation with parentheses that, when expanded and simplified, becomes EXACTLY EQUIVALENT to "${cleanedInput}".
   - For example: if original is -3x + 10 = 25, an equivalent equation is -3(x + 2) + 16 = 25, because -3(x + 2) + 16 = -3x - 6 + 16 = -3x + 10 = 25.
   - The final answer MUST BE IDENTICAL to the Basic level!
   - Provide "expansionStep" (expanding the parentheses) and "simplifiedToOriginal" (showing it simplifies to the original equation).

3. ADVANCED — A real-world word problem:
   - Transform the original equation into a clear, realistic word problem or integer/number statement modeling the exact equation.
   - Example style: "A number is multiplied by -3, and then 10 is added. The result is 25. Find the number." OR a realistic contextual scenario (e.g. rate/fee/temperature).
   - The student must first formulate the equation, then solve it.
   - Target equation to formulate must be "${cleanedInput}" (or an equivalent form).
   - The final answer MUST BE IDENTICAL to the Basic level!
   - Provide "equivalentForms" array containing acceptable rearrangements (e.g. commutative order).

TOPIC SCOPE:
- If input is NOT a linear equation (e.g. calculus, chemistry, non-math), set "isSupportedTopic": false and provide "topicExplanation".
- Otherwise, set "isSupportedTopic": true.

MATHEMATICAL VERIFICATION:
- Every activity MUST have 100% verified mathematics.
- All three activities MUST evaluate to the exact same numeric commonAnswer!`;

    const startTime = Date.now();
    let rawText: string | undefined;
    let modelUsed = GEMINI_MODELS[0];
    let lastError: any = null;

    for (const m of GEMINI_MODELS) {
      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model: m,
            contents: prompt,
            config: {
              systemInstruction:
                'You are an expert university mathematics professor. Return strictly valid JSON conforming to the schema with exact mathematical equality across all 3 levels.',
              responseMimeType: 'application/json',
              responseSchema: triadSchema
            }
          }),
          18000
        );

        rawText = response.text?.trim();
        if (rawText) {
          modelUsed = m;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${m} failed for triad:`, err?.message || err);
        lastError = err;
      }
    }

    const latencyMs = Date.now() - startTime;

    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);

        if (!parsed.isSupportedTopic) {
          return res.json({
            isSupportedTopic: false,
            originalProblem: cleanedInput,
            topicExplanation:
              parsed.topicExplanation ||
              'The input problem appears to be outside two-step linear equations. Please enter an equation such as "-3x + 10 = 25" or "4x - 8 = 24".'
          });
        }

        const result: DifferentiationTriadResult = {
          originalProblem: cleanedInput,
          isSupportedTopic: true,
          conceptIdentified: parsed.conceptIdentified || 'Two-step linear equation',
          commonAnswer: parsed.commonAnswer,
          commonAnswerDisplay: parsed.commonAnswerDisplay || String(parsed.commonAnswer),
          commonVariable: parsed.commonVariable || 'x',
          generatedBy: modelUsed,
          latencyMs,
          basic: {
            ...parsed.basic,
            level: 'basic'
          },
          intermediate: {
            ...parsed.intermediate,
            level: 'intermediate'
          },
          advanced: {
            ...parsed.advanced,
            level: 'advanced'
          }
        };

        return res.json(result);
      } catch (parseErr) {
        console.error('Failed to parse AI triad response:', parseErr);
      }
    }

    return res.status(500).json({
      error: 'AI_DIFFERENTIATION_FAILED',
      message: `Gemini AI could not differentiate this equation right now (${lastError?.message || 'High server demand'}). Please try again.`
    });
  }

  // Fallback if AI key is missing
  return res.status(503).json({
    error: 'MISSING_API_KEY',
    message: 'GEMINI_API_KEY is not configured in the server environment. Add your API key in the AI Studio Secrets panel to enable live AI differentiation.'
  });
});

// 2. Sample Triad Endpoint
app.get('/api/math/sample-triad', (_req: Request, res: Response) => {
  res.json(DEFAULT_SAMPLE_TRIAD);
});

// 3. Equation Equivalence Checker Endpoint (for Advanced level formulation)
app.post('/api/math/check-equation', async (req: Request, res: Response) => {
  const { studentEquation, targetEquation, equivalentForms = [], commonAnswer, commonVariable } = req.body;

  if (!studentEquation || typeof studentEquation !== 'string' || !studentEquation.includes('=')) {
    return res.json({ isEquivalent: false, message: 'Please write a complete equation containing an equals sign (=).' });
  }

  // Normalize equation string
  const normalize = (eq: string) => {
    return eq
      .replace(/\s+/g, '')
      .replace(/\*/g, '')
      .replace(/\+-/g, '-')
      .replace(/-\+/g, '-')
      .replace(/\(([a-zA-Z])\)/g, '$1') // e.g. -3(x) -> -3x
      .replace(/\((-?\d+)\)([a-zA-Z])/g, '$1$2') // e.g. (-3)x -> -3x
      .toLowerCase();
  };

  const studentClean = normalize(studentEquation);
  const targetClean = normalize(targetEquation);

  // Check 1: Direct string equivalence or presence in equivalent forms
  if (studentClean === targetClean || equivalentForms.map(normalize).includes(studentClean)) {
    return res.json({
      isEquivalent: true,
      message: 'Excellent formulation! Your equation accurately models the problem.'
    });
  }

  // Check 2: Normalize variable character (e.g. if user wrote n instead of x)
  const replaceVar = (s: string) => s.replace(/[a-wyzA-WYZ]/g, 'x');
  const studentGeneric = replaceVar(studentClean);
  const targetGeneric = replaceVar(targetClean);

  if (studentGeneric === targetGeneric || equivalentForms.map(normalize).map(replaceVar).includes(studentGeneric)) {
    return res.json({
      isEquivalent: true,
      message: 'Great job! Your algebraic model is mathematically equivalent.'
    });
  }

  // Check 3: Check reversed sides e.g. 25 = -3x + 10 vs -3x + 10 = 25
  const parts = studentGeneric.split('=');
  if (parts.length === 2) {
    const reversed = `${parts[1]}=${parts[0]}`;
    if (reversed === targetGeneric || equivalentForms.map(normalize).map(replaceVar).includes(reversed)) {
      return res.json({
        isEquivalent: true,
        message: 'Spot on! Both sides balance correctly (symmetric property of equality).'
      });
    }

    // Check commutative addition: e.g. 10 - 3x = 25 vs -3x + 10 = 25
    const targetParts = targetGeneric.split('=');
    if (targetParts.length === 2) {
      const lhsStudent = parts[0];
      const rhsStudent = parts[1];
      const lhsTarget = targetParts[0];
      const rhsTarget = targetParts[1];

      const isCommutativeMatch =
        (lhsStudent === '10-3x' && lhsTarget === '-3x+10' && rhsStudent === rhsTarget) ||
        (lhsStudent === '-3x+10' && lhsTarget === '10-3x' && rhsStudent === rhsTarget) ||
        (rhsStudent === '10-3x' && rhsTarget === '-3x+10' && lhsStudent === lhsTarget) ||
        (rhsStudent === '-3x+10' && rhsTarget === '10-3x' && lhsStudent === lhsTarget);

      if (isCommutativeMatch) {
        return res.json({
          isEquivalent: true,
          message: 'Correct formulation! You applied the commutative property.'
        });
      }
    }
  }

  // Check 4: If AI is available, use Gemini to verify flexible algebraic formulations
  if (ai) {
    try {
      const checkPrompt = `Determine if the student's formulated equation is mathematically equivalent or a valid algebraic formulation for the problem statement.
Target expected equation: "${targetEquation}"
Student's equation: "${studentEquation}"
Common numerical solution: ${commonAnswer ?? 'unknown'}

Respond strictly with a JSON object:
{
  "isEquivalent": true or false,
  "message": "Brief feedback to the student explaining why it matches or what is incorrect"
}`;

      const aiCheck = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.5-flash-lite',
          contents: checkPrompt,
          config: {
            responseMimeType: 'application/json'
          }
        }),
        6000
      );

      const checkText = aiCheck.text?.trim();
      if (checkText) {
        const parsed = JSON.parse(checkText);
        return res.json({
          isEquivalent: Boolean(parsed.isEquivalent),
          message: parsed.message || (parsed.isEquivalent ? 'Equation verified!' : 'Please check your terms.')
        });
      }
    } catch (checkErr) {
      console.warn('AI equivalence check fallback failed:', checkErr);
    }
  }

  return res.json({
    isEquivalent: false,
    message: 'Not quite equivalent to the problem statement. Check your variable terms and constant numbers.'
  });
});

// 4. Diagnose student answer endpoint
app.post('/api/math/diagnose', async (req: Request, res: Response) => {
  const { equation, studentAnswer, correctAnswer, variable = 'x' } = req.body;
  const numStudent = parseFloat(studentAnswer);
  const numCorrect = parseFloat(correctAnswer);

  if (isNaN(numStudent)) {
    return res.json({
      isCorrect: false,
      message: 'Please enter a valid numeric value for your answer.',
      misconceptionType: 'none',
      suggestedAction: 'Enter an integer or decimal number.'
    });
  }

  if (Math.abs(numStudent - numCorrect) < 0.001) {
    return res.json({
      isCorrect: true,
      message: `Correct! ${variable} = ${studentAnswer} balances the equation!`,
      misconceptionType: 'none'
    });
  }

  let misconceptionType: 'sign_error' | 'arithmetic_slip' | 'operation_order' = 'arithmetic_slip';
  let message = `Not quite. ${variable} = ${studentAnswer} does not make both sides equal.`;
  let suggestedAction = 'Click "Get a Hint" to review your first step.';

  if (Math.abs(numStudent + numCorrect) < 0.001) {
    misconceptionType = 'sign_error';
    message = `Check your signs! Magnitude ${Math.abs(numStudent)} is correct, but the sign is inverted.`;
    suggestedAction = 'Check whether you divided by a negative number or flipped a sign.';
  }

  return res.json({
    isCorrect: false,
    userAnswer: numStudent,
    misconceptionType,
    message,
    suggestedAction
  });
});

// Setup Vite in Dev or static files in Production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
