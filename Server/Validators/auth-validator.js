const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email address" })
        .min(3, { message: "Email must be of atleast 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be of atleast 7 characters" })
        .max(256, { message: "Password must not be more than 256 characters" }),
});

const singupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be of atleast 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),
    DOB: z
        .string({ required_error: "Date of Birth is required" })
        .trim()
        .min(new Date("1930-01-01"), { message: "Please enter a valid Date of Birth" })
        .max(new Date(), { message: "Please enter a valid Date of Birth" }),
    country: z
        .string({ required_error: "Country is required" })
        .trim()
        .min(3, { message: "Please enter a valid Country" })
        .max(25, { message: "Please enter a valid Country" }),
});

module.exports = { singupSchema, loginSchema };