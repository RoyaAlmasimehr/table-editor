import type { Column, Row } from "../types/data.types";

export const columns: Column[] = [
  { id: "name", title: "Name" },
  { id: "age", title: "Age" },
  { id: "email", title: "Email" },
  { id: "city", title: "City" },
  { id: "job", title: "Job" },
  { id: "salary", title: "Salary" },
  { id: "status", title: "Status" },
];

export const data: Row[] = [
  {
    id: 1,
    name: "Ali",
    age: 25,
    email: "ali@test.com",
    city: "Tehran",
    job: "Developer",
    salary: 3000,
    status: "Active",
  },
  {
    id: 2,
    name: "Sara",
    age: 22,
    email: "sara@test.com",
    city: "Shiraz",
    job: "Designer",
    salary: 2500,
    status: "Active",
  },
  {
    id: 3,
    name: "Reza",
    age: 28,
    email: "reza@test.com",
    city: "Tabriz",
    job: "Manager",
    salary: 4000,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Mina",
    age: 24,
    email: "mina@test.com",
    city: "Tehran",
    job: "Developer",
    salary: 3500,
    status: "Active",
  },
];

import type { Position, Size } from "../types/table.types";

export const INITIAL_POSITION: Position = { x: 20, y: 20 };
export const INITIAL_SIZE: Size = { width: 500, height: 300 };
