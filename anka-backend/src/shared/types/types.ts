import { z } from "zod";

export const CreateClientSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .toLowerCase()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/),
  active: z.boolean(),
});

export const EditClientSchema = z.object({       
  name: z.string().min(2).max(100).optional(),   
  email: z.string().email().optional(),             
  active: z.boolean().optional(),               
});

export interface CsvDataDTO {
  name: string;
  email: string;
  active: string;
  asset_name: string;
  investedValue: string;
  at: string;
}

export type CsvRowAllocationAssertion = {
  name: string;
  email: string;
  active: boolean;
  asset: {
    name: string;
  };

  invested_value: string;
  at: string;
};


export type NewClientProps = { name: string; email: string; active: boolean };

