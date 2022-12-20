export const _ = 0; // ignore

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const courseParts: Array<CoursePart> = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
];

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

courseParts.forEach((part) => {
  switch (part.name) {
    case "Fundamentals":
      // TypeScript knows that we can use name, exerciseCount and description
      break;
    case "Using props to pass data":
      // TypeScript knows that we can use name, exerciseCount and
      // groupProjectCount
      break;
    case "Deeper type usage":
      // TypeScript knows that we can use name, exerciseCount, description and
      // exerciseSubmissionLink
      break;
    default:
      return assertNever(part);
  }
});
